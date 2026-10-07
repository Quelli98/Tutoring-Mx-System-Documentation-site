import fs from 'node:fs';
const get=name=>JSON.parse(fs.readFileSync('src/data/'+name+'.json'));
const routes=get('endpoints'),schema=get('schema'),rubric=get('rubric'),meta=get('source-meta');
const openapi=JSON.parse(fs.readFileSync('public/downloads/openapi-inventory.json'));
function assert(ok,m){if(!ok)throw Error(m)}
assert(routes.length===120&&routes.length===meta.routes,'Expected 120 final Sprint 4 route registrations');
assert(new Set(routes.map(r=>r.method+' '+r.path)).size===120,'Duplicate route');
assert(Object.values(openapi.paths).reduce((sum,p)=>sum+Object.keys(p).length,0)===120,'OpenAPI operation mismatch');
assert(routes.filter(x=>x.access==='MASTER ORGANISER').length===3,'Master route guards missing');
assert(schema.models.length===30&&schema.enums.length===14&&schema.migrations.length===30,'Schema inventory mismatch');
assert(schema.models.some(m=>m.name==='OrganiserApplication'),'Current application model missing');
assert(schema.models.some(m=>m.name==='TutoringBooking')&&schema.models.some(m=>m.name==='StudentSickNote')&&schema.models.some(m=>m.name==='Scenario')&&schema.models.some(m=>m.name==='AuditEvent'),'Final Sprint 4 models missing');
assert(rubric.length===20&&rubric.reduce((n,r)=>n+r.weight,0)===100,'Rubric coverage mismatch');
for(const file of ['component','deployment','composite','use-case','activity','state-machine','sequence','timing','erd'])assert(fs.existsSync('public/diagrams/'+file+'.svg'),'Missing diagram: '+file);
const docs={...get('content'),'original-readme':get('original-readme')};const missing=[];
for(const [chapter,d]of Object.entries(docs))for(const m of d.html.matchAll(/(?:href|src)="([^"#]+)"/g)){const link=m[1];if(/^(https?:|mailto:|data:)/.test(link))continue;if(!fs.existsSync('public/'+link.split('#')[0]))missing.push({chapter,link})}
assert(!missing.length,'Broken document asset links: '+JSON.stringify(missing));
console.log('PASS: 120 unique operations, 3 Master guards, 30 models, 14 enums, 30 migrations, 20 rubric criteria, 9 SVG diagrams and all current chapter asset links.');
