import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";
import ts from "typescript";
const out = {};
for (const file of fs.readdirSync("content").filter((x) => x.endsWith(".md"))) {
  const id = path.basename(file, ".md");
  let source = fs.readFileSync("content/" + file, "utf8");
  if (id === "original-readme")
    source = source.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (all, label, href) => {
      if (/^https?:/.test(href)) return all;
      const local = "public/downloads/source/" + href;
      return fs.existsSync(local)
        ? `[${label}](downloads/source/${href})`
        : `${label} (source reference: \`${href}\`; see the technical evidence ZIP)`;
    });
  const headings = [];
  const used = new Set();
  const renderer = new marked.Renderer();
  renderer.heading = function ({ tokens, depth }) {
    const text = this.parser.parseInline(tokens);
    const plain = text.replace(/<[^>]+>/g, "");
    let slug = plain
      .toLowerCase()
      .replace(/&[^;]+;/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    while (used.has(slug)) slug += "-section";
    used.add(slug);
    if (depth === 2) headings.push({ id: slug, label: plain });
    return `<h${depth} id="${slug}">${text}</h${depth}>\n`;
  };
  let html = marked.parse(source, { gfm: true, renderer });
  html = html
    .replace(
      /<table>/g,
      '<div class="table-wrap" tabindex="0" role="region" aria-label="Documentation table"><table>',
    )
    .replace(/<\/table>/g, "</table></div>")
    .replace(
      /<a href="(https?:[^\"]+)"/g,
      '<a target="_blank" rel="noreferrer" href="$1"',
    );
  html = html.replace(
    /<img(?![^>]*\bloading=)/g,
    '<img loading="lazy" decoding="async"',
  );
  out[id] = { html, text: source.replace(/[#*`|]/g, " "), headings };
}
fs.mkdirSync("src/data", { recursive: true });
fs.writeFileSync(
  "src/data/original-readme.json",
  JSON.stringify(out["original-readme"]),
);
delete out["original-readme"];
fs.writeFileSync("src/data/content.json", JSON.stringify(out));
// Fetch chapter HTML only when visited. Load the full-text index when search opens.
fs.mkdirSync("src/data/chapters", { recursive: true });
for (const [id, doc] of Object.entries(out))
  fs.writeFileSync(
    `src/data/chapters/${id}.json`,
    JSON.stringify({ html: doc.html }),
  );
for (const file of fs.readdirSync("src/data/chapters"))
  if (!out[path.basename(file, ".json")])
    fs.unlinkSync(path.join("src/data/chapters", file));
const searchIndex = Object.fromEntries(
  Object.entries(out).map(([id, doc]) => [
    id,
    { text: doc.text, headings: doc.headings },
  ]),
);
// Include the two retained JSX evidence pages in full-text search.
const legacy = ts.createSourceFile(
  "legacy.tsx",
  fs.readFileSync("src/legacy.tsx", "utf8"),
  ts.ScriptTarget.Latest,
  true,
  ts.ScriptKind.TSX,
);
function indexLegacy(node) {
  if (
    ts.isVariableDeclaration(node) &&
    node.name.getText(legacy) === "legacyPages" &&
    ts.isObjectLiteralExpression(node.initializer)
  ) {
    for (const page of node.initializer.properties) {
      const id = page.name.text,
        words = [];
      function collect(n) {
        if (ts.isJsxText(n) || ts.isStringLiteral(n)) words.push(n.text);
        ts.forEachChild(n, collect);
      }
      collect(page);
      const key = id === "user-feedback" ? "feedback-status" : id;
      searchIndex[key] = {
        text:
          (searchIndex[key]?.text || "") +
          " " +
          words.join(" ").replace(/\s+/g, " "),
        headings: searchIndex[key]?.headings || [],
      };
    }
  }
  ts.forEachChild(node, indexLegacy);
}
indexLegacy(legacy);
fs.writeFileSync("src/data/content-index.json", JSON.stringify(searchIndex));
console.log(`Compiled ${Object.keys(out).length} chapters.`);
