import fs from 'node:fs';
import path from 'node:path';
import { marked } from 'marked';
const out={};
for(const file of fs.readdirSync('content').filter(x=>x.endsWith('.md'))){
 const id=path.basename(file,'.md');let source=fs.readFileSync('content/'+file,'utf8');
 if(id==='original-readme') source=source.replace(/\[([^\]]+)\]\(([^)]+)\)/g,(all,label,href)=>{
   if(/^https?:/.test(href))return all;
   const local='public/downloads/source/'+href;
   return fs.existsSync(local)?`[${label}](downloads/source/${href})`:`${label} (source reference: \`${href}\`; see the technical evidence ZIP)`;
 });
 const headings=[];const used=new Set();
 const renderer=new marked.Renderer();
 renderer.heading=function({tokens,depth}){const text=this.parser.parseInline(tokens);const plain=text.replace(/<[^>]+>/g,'');let slug=plain.toLowerCase().replace(/&[^;]+;/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');while(used.has(slug))slug+='-section';used.add(slug);if(depth===2)headings.push({id:slug,label:plain});return `<h${depth} id="${slug}">${text}</h${depth}>\n`;};
 let html=marked.parse(source,{gfm:true,renderer});
 html=html.replace(/<table>/g,'<div class="table-wrap" tabindex="0" role="region" aria-label="Documentation table"><table>').replace(/<\/table>/g,'</table></div>').replace(/<a href="(https?:[^\"]+)"/g,'<a target="_blank" rel="noreferrer" href="$1"');
 out[id]={html,text:source.replace(/[#*`|]/g,' '),headings};
}
fs.mkdirSync('src/data',{recursive:true});fs.writeFileSync('src/data/original-readme.json',JSON.stringify(out['original-readme']));delete out['original-readme'];fs.writeFileSync('src/data/content.json',JSON.stringify(out));
console.log(`Compiled ${Object.keys(out).length} chapters.`);
