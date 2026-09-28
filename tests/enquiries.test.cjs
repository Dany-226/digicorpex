const {test}=require('node:test');const assert=require('node:assert/strict');const fs=require('node:fs');const ts=require('typescript');
const m={exports:{}};new Function('exports','require','module',ts.transpileModule(fs.readFileSync('lib/enquiries.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText)(m.exports,require,m);
const {handleContact,handleDiagnostic}=m.exports;
const valid={nom:'Marie Dupont',email:'test@example.com',besoin:'Automatiser les demandes de devis',gdpr:true};
const req=body=>new Request('https://example.com/api/contact',{method:'POST',headers:{'Content-Type':'application/json','Idempotency-Key':'11111111-2222-3333-4444-555555555555'},body:JSON.stringify(body)});
test('reject malformed, missing, incorrectly typed, oversized and unconsented input',async()=>{
 for(const body of [null,[],{}, {...valid,nom:42},{...valid,email:'invalid'},{...valid,gdpr:'true'},{...valid,gdpr:false},{...valid,besoin:'short'},{...valid,outils:[]},{...valid,besoin:'x'.repeat(17000)}])assert.equal((await handleContact(req(body),{})).status,400);
 const malformed=new Request('https://example.com',{method:'POST',headers:{'Content-Type':'application/json'},body:'{'});assert.equal((await handleContact(malformed,{})).status,400);
});
test('contact escapes HTML, preserves reply-to/context and idempotency key',async()=>{
 const old=global.fetch;let sent;global.fetch=async(url,init)=>{sent={url,...init};return new Response('{}',{status:200})};
 try{assert.equal((await handleContact(req({...valid,nom:'<b>Marie</b>',besoin:'<script>alert(1)</script>',outils:'CRM & Excel'}),{RESEND_API_KEY:'test-key'})).status,200);const mail=JSON.parse(sent.body);assert.equal(mail.reply_to,valid.email);assert.ok(mail.html.includes('&lt;script&gt;'));assert.ok(mail.html.includes('CRM &amp; Excel'));assert.ok(!mail.html.includes('<script>'));assert.ok(sent.headers['Idempotency-Key']);}finally{global.fetch=old}
});
test('missing secret, provider failure and network failure never report success',async()=>{
 assert.equal((await handleContact(req(valid),{})).status,503);const old=global.fetch;
 try{global.fetch=async()=>new Response('',{status:429});assert.equal((await handleContact(req(valid),{RESEND_API_KEY:'test'})).status,502);global.fetch=async()=>{throw Error('offline')};assert.equal((await handleContact(req(valid),{RESEND_API_KEY:'test'})).status,502)}finally{global.fetch=old}
});
test('Preview test mode and honeypot do not send any email',async()=>{
 const old=global.fetch;global.fetch=async()=>{throw Error('must not send')};try{
 assert.deepEqual(await (await handleContact(req(valid),{MAIL_TEST_MODE:'true'})).json(),{ok:true,test:true});assert.equal((await handleContact(req({...valid,website:'spam'}),{})).status,200);
 }finally{global.fetch=old}
});
test('diagnostic uses separate email contract and a public PDF link',async()=>{
 assert.equal((await handleDiagnostic(req({email:valid.email}),{})).status,400);const old=global.fetch;let mail;global.fetch=async(_,init)=>{mail=JSON.parse(init.body);return new Response('{}')};try{
 assert.equal((await handleDiagnostic(req({email:valid.email,gdpr:true}),{RESEND_API_KEY:'test'})).status,200);assert.deepEqual(mail.to,[valid.email]);assert.ok(mail.html.includes('https://www.digicorpex.com/downloads/diagnostic-automatisation.pdf'));assert.ok(!mail.attachment);
 }finally{global.fetch=old}
});
test('a body over the stream limit is rejected without a Content-Length header',async()=>{
 const encoder=new TextEncoder();const stream=new ReadableStream({start(controller){controller.enqueue(encoder.encode('{"besoin":"'+'x'.repeat(17000)));controller.close()}});
 const request=new Request('https://example.com/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:stream,duplex:'half'});
 assert.equal((await handleContact(request,{})).status,400);
});
