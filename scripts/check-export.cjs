const fs=require('node:fs');const path=require('node:path');const assert=require('node:assert/strict');const matter=require('gray-matter');
const out='out';const pages=['index','agents','services','about','contact','blog','mentions-legales','confidentialite'];
for(const p of pages) assert.ok(fs.existsSync(`${out}/${p}.html`),p);
const sitemap=fs.readFileSync(`${out}/sitemap.xml`,'utf8');let count=0;
for(const f of fs.readdirSync('content/blog').filter(f=>f.endsWith('.mdx'))){
 const {data,content}=matter(fs.readFileSync('content/blog/'+f,'utf8'));const published=content.trim().length>=100;
 assert.equal(fs.existsSync(`${out}/blog/${data.slug}.html`),published,data.slug);assert.equal(sitemap.includes('/blog/'+data.slug+'<'),published,data.slug);
 if(published){count++;const html=fs.readFileSync(`${out}/blog/${data.slug}.html`,'utf8');assert.ok(html.includes(`https://www.digicorpex.com/blog/${data.slug}`));assert.ok(html.includes('BlogPosting'));assert.ok(html.includes('BreadcrumbList'));}
}
assert.ok(fs.readFileSync(`${out}/_redirects`,'utf8').includes('/services/automatisation /agents 301'));
const home=fs.readFileSync(`${out}/index.html`,'utf8');assert.equal((home.match(/<h1[ >]/g)||[]).length,1);assert.ok(home.includes('GÉRANT DE BAR'));assert.ok(!home.includes('cdn.simpleicons.org'));assert.ok(!home.includes('noindex'));assert.ok(fs.existsSync(`${out}/refonte/opengraph.jpg`));
for(const file of fs.readdirSync(`${out}/_next/static/css`)){
 const css=fs.readFileSync(`${out}/_next/static/css/${file}`,'utf8');for(const [,url]of css.matchAll(/url\(["']?(\/refonte\/[^"')]+)["']?\)/g))assert.ok(fs.existsSync(path.join(out,url)),url);
}
console.log(`Export verified: ${pages.length} main pages, ${count} published articles, draft exclusion, metadata, redirects and local CSS assets.`);
