const fs=require('node:fs');const vm=require('node:vm');const assert=require('node:assert/strict');
class El{constructor(){this.listeners={};this.attrs={};this.classes=new Set();this.classList={add:x=>this.classes.add(x),remove:x=>this.classes.delete(x),contains:x=>this.classes.has(x),toggle:(x,v)=>v?this.classes.add(x):this.classes.delete(x)};this.textContent='';this.value='';this.disabled=false;}addEventListener(t,f){this.listeners[t]=f;}setAttribute(k,v){this.attrs[k]=v;}removeAttribute(k){delete this.attrs[k];}focus(){this.focused=true;}contains(x){return x===this;}replaceChildren(){this.textContent='Enviar mensagem';}append(){}querySelector(){return button;}reportValidity(){return this.valid!==false;}reset(){this.resets=(this.resets||0)+1;this.value='';}}
const header=new El(),menu=new El(),nav=new El(),form=new El(),button=new El(),status=new El(),year=new El();form.action='https://formspree.io/f/mrelvobj';
const els={'.site-header':header,'.menu-toggle':menu,'#navigation':nav,'#contact-form':form,'#form-status':status,'#year':year};
const doc=new El();doc.querySelector=k=>els[k];doc.createElement=()=>new El();doc.createTextNode=x=>x;
let resolveFetch,requests=0,reply={ok:true};
const context={document:doc,window:{matchMedia:()=>({addEventListener(){}}),setTimeout,clearTimeout},Date,FormData:class{},AbortController,fetch:()=>{requests++;return new Promise(r=>resolveFetch=r);}};
vm.runInNewContext(fs.readFileSync('assets/js/app.js','utf8'),context);
const submit=()=>form.listeners.submit({preventDefault(){}});
(async()=>{
 menu.listeners.click();assert.equal(menu.attrs['aria-expanded'],'true');doc.listeners.keydown({key:'Escape'});assert.equal(menu.attrs['aria-expanded'],'false');assert(menu.focused);
 form.valid=false;await submit();assert.equal(requests,0);form.valid=true;
 const pending=submit();assert(button.disabled);assert.equal(form.attrs['aria-busy'],'true');assert(!status.textContent.includes('Mensagem enviada'));
 await submit();assert.equal(requests,1);resolveFetch({ok:true});await pending;assert.equal(form.resets,1);assert(!button.disabled);assert.match(status.textContent,/Mensagem enviada/);
 form.value='Minha ideia preservada';const failed=submit();resolveFetch({ok:false});await failed;assert.equal(form.value,'Minha ideia preservada');assert.equal(form.resets,1);assert(status.classes.has('error'));assert(!button.disabled);
 console.log('PASS: menu/Escape, validação, bloqueio de envio duplicado, confirmação de sucesso e preservação de texto em erro. Nenhuma requisição real.');
})().catch(e=>{console.error(e);process.exitCode=1;});
