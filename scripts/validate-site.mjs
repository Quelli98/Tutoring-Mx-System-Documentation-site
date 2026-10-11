import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { createHash } from "node:crypto";
import ts from "typescript";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

// Render the actual reference components without a browser or production account.
// This catches broken chapter/anchor links that a successful Vite build cannot.
const require = createRequire(import.meta.url);
const cache = new Map();
function loadSource(file) {
  file = path.resolve(file);
  if (cache.has(file)) return cache.get(file);
  let source = fs
    .readFileSync(file, "utf8")
    .replaceAll(
      "import.meta.env.BASE_URL",
      '"/Tutoring-Mx-System-Documentation-site/"',
    );
  const compiled = ts.transpileModule(source, {
    compilerOptions: {
      jsx: ts.JsxEmit.ReactJSX,
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      esModuleInterop: true,
    },
  }).outputText;
  const module = { exports: {} };
  cache.set(file, module.exports);
  const localRequire = (name) => {
    if (!name.startsWith(".")) return require(name);
    const target = path.resolve(path.dirname(file), name);
    if (target.endsWith(".json"))
      return JSON.parse(fs.readFileSync(target, "utf8"));
    return loadSource(
      [target, target + ".tsx", target + ".ts"].find(
        (p) => fs.existsSync(p) && fs.statSync(p).isFile(),
      ),
    );
  };
  new Function("require", "module", "exports", compiled)(
    localRequire,
    module,
    module.exports,
  );
  cache.set(file, module.exports);
  return module.exports;
}
function assert(value, message) {
  if (!value) throw new Error(message);
}
const { chapters, aliases, parseRoute } = loadSource("src/navigation.ts");
const docs = JSON.parse(fs.readFileSync("src/data/content.json", "utf8"));
const rubric = JSON.parse(fs.readFileSync("src/data/rubric.json", "utf8"));
const meta = JSON.parse(fs.readFileSync("src/data/source-meta.json", "utf8"));
const htmlByRoute = Object.fromEntries(
  Object.entries(chapters).map(([id, chapter]) => {
    assert(!chapter.key || docs[chapter.key], `Missing chapter: ${id}`);
    return [id, chapter.key ? docs[chapter.key].html : ""];
  }),
);
for (const [route, component] of [
  ["api", "ApiCatalogue"],
  ["database", "DatabaseCatalogue"],
  ["milestone4", "RubricMap"],
]) {
  htmlByRoute[route] += renderToStaticMarkup(
    React.createElement(loadSource(`src/${component}.tsx`).default),
  );
}
const { legacyPages } = loadSource("src/legacy.tsx");
for (const [id, chapter] of Object.entries(chapters))
  if (chapter.legacyId) {
    assert(legacyPages[chapter.legacyId], `Missing retained evidence: ${id}`);
    htmlByRoute[id] += renderToStaticMarkup(
      legacyPages[chapter.legacyId].content,
    );
  }
const extraIds = {
  home: [
    "welcome-title",
    "welcome-purpose",
    "welcome-explore",
    "welcome-journey",
    "welcome-proof",
    "welcome-service",
  ],
  diagrams: [
    "component",
    "deployment",
    "composite",
    "use-case",
    "activity",
    "state-machine",
    "sequence",
    "timing",
  ],
  references: ["downloads"],
  deployment: ["platform-evidence"],
  readme: ["full-readme"],
};
const idsByRoute = {};
for (const [id, html] of Object.entries(htmlByRoute)) {
  const values = [...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]);
  assert(new Set(values).size === values.length, `Duplicate HTML id in ${id}`);
  idsByRoute[id] = new Set([...values, ...(extraIds[id] || [])]);
  assert(
    !/<img\b(?![^>]*\balt=)[^>]*>/i.test(html),
    `Image without alt text: ${id}`,
  );
}
let localAssets = 0,
  internalLinks = 0;
const errors = [];
function checkLink(link, from) {
  link = link.replaceAll("&amp;", "&");
  if (/^(https?:|mailto:|data:)/.test(link)) return;
  if (link.startsWith("#")) {
    const { id, anchor } = parseRoute(link);
    if (!chapters[id]) errors.push(`${from}: unknown chapter ${link}`);
    else if (anchor && !idsByRoute[id].has(anchor))
      errors.push(`${from}: missing anchor ${link}`);
    internalLinks++;
  } else {
    link = link.replace(/^\/Tutoring-Mx-System-Documentation-site\//, "");
    const file = decodeURIComponent(link.split(/[?#]/)[0]);
    if (!fs.existsSync(path.join("public", file)))
      errors.push(`${from}: missing asset ${link}`);
    localAssets++;
  }
}
for (const [id, html] of Object.entries(htmlByRoute))
  for (const m of html.matchAll(/(?:href|src)="([^"]+)"/g)) checkLink(m[1], id);
// Check static navigation links from the shell too; skip-link is a focus action.
const app = fs.readFileSync("src/App.tsx", "utf8");
for (const m of app.matchAll(/href="(#[^"]+)"/g))
  if (m[1] !== "#main-content") checkLink(m[1], "App.tsx");
for (const [alias, target] of Object.entries(aliases))
  assert(chapters[target], `Alias ${alias} points to missing page ${target}`);
assert(
  parseRoute("#master-organiser").id === "student-scheduling",
  "Legacy Master Organiser link changed",
);
assert(
  parseRoute("#database/model-profile").anchor === "model-profile",
  "Model deep link changed",
);
assert(
  parseRoute("#%E0%A4%A").id === "%E0%A4%A",
  "Malformed hash crashes navigation",
);
assert(parseRoute("").id === "home", "Empty URL must open home");
assert(
  rubric.length === 20 && rubric.reduce((n, r) => n + r.weight, 0) === 100,
  "Final rubric weights changed",
);
for (const [category, weight] of [
  ["Database", 10],
  ["API", 25],
  ["App", 42],
  ["Misc", 23],
])
  assert(
    rubric
      .filter((r) => r.category === category)
      .reduce((n, r) => n + r.weight, 0) === weight,
    `Bad category weight: ${category}`,
  );
for (const r of rubric)
  assert(
    r.question && r.answer && r.evidenceLinks.length,
    `Incomplete criterion ${r.id}`,
  );
for (const [file, hash] of [
  ["schema.prisma", meta.schemaSHA256],
  ["api-routes.ts.txt", meta.routesSHA256],
])
  assert(
    createHash("sha256")
      .update(
        fs
          .readFileSync(`public/downloads/${file}`, "utf8")
          .replace(/\r\n/g, "\n"),
      )
      .digest("hex") === hash,
    `Source snapshot fingerprint changed: ${file}`,
  );
const issueIds = new Set(
  [...docs["bug-tracker"].html.matchAll(/issues\/(1\d\d)/g)].map((m) =>
    Number(m[1]),
  ),
);
assert(
  issueIds.size === 32 && [...issueIds].every((id) => id >= 106 && id <= 137),
  "Bug issue register is incomplete",
);
for (const [id, doc] of Object.entries(docs))
  assert(
    JSON.parse(fs.readFileSync(`src/data/chapters/${id}.json`)).html ===
      doc.html,
    `Stale lazy chapter ${id}`,
  );
assert(!errors.length, "Broken documentation links:\n" + errors.join("\n"));
console.log(
  `PASS: ${Object.keys(chapters).length} navigation pages, ${internalLinks} internal links, ${localAssets} asset references, 20 weighted criteria, 32 bug issues, source fingerprints and rendered API/schema/rubric/retained evidence.`,
);
