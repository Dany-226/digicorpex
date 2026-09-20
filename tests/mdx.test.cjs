const {test}=require('node:test');const assert=require('node:assert/strict');const fs=require('node:fs');const ts=require('typescript');
const m={exports:{}};new Function('exports','require','module',ts.transpileModule(fs.readFileSync('lib/mdx.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,esModuleInterop:true}}).outputText)(m.exports,require,m);
const {getAllArticles,getArticleBySlug}=m.exports;
test('published articles preserve their slugs and can be loaded',()=>{
 const slugs=getAllArticles().map(a=>a.slug).sort();assert.deepEqual(slugs,['agent-ia-devis-demenagement-cas-client','agent-ia-planning-bar-restaurant-cas-client','cahier-des-charges','diagnostiqueur-immobilier-devis','seo-conversationnel','traiteur-devis-reservations','wiki-ia-memoire-entreprise']);
 for(const slug of slugs){const result=getArticleBySlug(slug);assert.equal(result.meta.slug,slug);assert.ok(result.content.length>=100)}
});
test('draft, missing and path traversal slugs are never rendered',()=>{
 for(const slug of ['google-maps-local','contenu-ia-seo','missing','../package','../../README','/etc/passwd'])assert.equal(getArticleBySlug(slug),null,slug);
});
