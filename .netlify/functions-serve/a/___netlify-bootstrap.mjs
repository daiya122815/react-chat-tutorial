import{createRequire}from"module";const require=createRequire(import.meta.url);
import{fileURLToPath as sr}from"url";import{Buffer as zt}from"node:buffer";import Jt from"node:process";import{pipeline as Kt,Readable as Xt}from"node:stream";import{promisify as Yt}from"node:util";var oe="x-nf-client-connection-ip",ie="x-nf-geo",ae="x-nf-account-id",H="x-nf-deploy-id",ce="x-nf-deploy-context",ue="x-nf-deploy-published",fe="x-nf-site-id",le="x-nf-request-flags",Y="x-nf-invocation-metadata",he="x-nf-request-id",tt=255,pe=e=>{let t=new Headers;return Object.entries(e).forEach(([r,n])=>{if(n!==void 0)try{t.set(r.toLowerCase(),n)}catch(o){if([...n].every(i=>i.codePointAt(0)<=tt))throw o;console.warn(`Discarded request header '${r}' because it contains non-ASCII characters`)}}),t},me=e=>{let t={};for(let[r,n]of e.entries())r in t?t[r].push(n):t[r]=[n];return t};var j=e=>({id:e.headers.get(ae)??""});var M=e=>({context:e.get(ce)??"",id:e.get(H)??"",published:e.get(ue)==="1"});import{Buffer as rt}from"buffer";var G=Symbol("Request flags"),_=Symbol("Request route"),nt=typeof Request>"u"?class{}:Request,de,B=class extends(de=nt,G,_,de){},ge=(e,t)=>{if(!(e==null||e===""))return t?rt.from(e,"base64"):e};var $=class{#e;#t;constructor(t){this.#e=new Set,this.#t=t}get(t){let r=this.#t[t];return r!==void 0&&this.#e.add(t),r}get evaluations(){return this.#e}},xe=e=>e[G]??new $({}),Se=(e,t)=>{e[G]=t};import{Buffer as st}from"node:buffer";var ye=e=>{if(e===null)return{};try{let{postal_code:t,...r}=JSON.parse(st.from(e,"base64").toString("utf-8"));return Object.fromEntries(Object.entries({...r,postalCode:t}).filter(([,o])=>o!==void 0))}catch{return{}}};var Re=e=>e??"";var F=class{constructor(e,t,r,n,o,c){this.type=3,this.name="",this.prefix="",this.value="",this.suffix="",this.modifier=3,this.type=e,this.name=t,this.prefix=r,this.value=n,this.suffix=o,this.modifier=c}hasCustomName(){return this.name!==""&&typeof this.name!="number"}},ot=/[$_\p{ID_Start}]/u,it=/[$_\u200C\u200D\p{ID_Continue}]/u,Z=".*";function at(e,t){return(t?/^[\x00-\xFF]*$/:/^[\x00-\x7F]*$/).test(e)}function Ce(e,t=!1){let r=[],n=0;for(;n<e.length;){let o=e[n],c=function(i){if(!t)throw new TypeError(i);r.push({type:"INVALID_CHAR",index:n,value:e[n++]})};if(o==="*"){r.push({type:"ASTERISK",index:n,value:e[n++]});continue}if(o==="+"||o==="?"){r.push({type:"OTHER_MODIFIER",index:n,value:e[n++]});continue}if(o==="\\"){r.push({type:"ESCAPED_CHAR",index:n++,value:e[n++]});continue}if(o==="{"){r.push({type:"OPEN",index:n,value:e[n++]});continue}if(o==="}"){r.push({type:"CLOSE",index:n,value:e[n++]});continue}if(o===":"){let i="",s=n+1;for(;s<e.length;){let u=e.substr(s,1);if(s===n+1&&ot.test(u)||s!==n+1&&it.test(u)){i+=e[s++];continue}break}if(!i){c(`Missing parameter name at ${n}`);continue}r.push({type:"NAME",index:n,value:i}),n=s;continue}if(o==="("){let i=1,s="",u=n+1,a=!1;if(e[u]==="?"){c(`Pattern cannot start with "?" at ${u}`);continue}for(;u<e.length;){if(!at(e[u],!1)){c(`Invalid character '${e[u]}' at ${u}.`),a=!0;break}if(e[u]==="\\"){s+=e[u++]+e[u++];continue}if(e[u]===")"){if(i--,i===0){u++;break}}else if(e[u]==="("&&(i++,e[u+1]!=="?")){c(`Capturing groups are not allowed at ${u}`),a=!0;break}s+=e[u++]}if(a)continue;if(i){c(`Unbalanced pattern at ${n}`);continue}if(!s){c(`Missing pattern at ${n}`);continue}r.push({type:"REGEX",index:n,value:s}),n=u;continue}r.push({type:"CHAR",index:n,value:e[n++]})}return r.push({type:"END",index:n,value:""}),r}function ke(e,t={}){let r=Ce(e);t.delimiter??(t.delimiter="/#?"),t.prefixes??(t.prefixes="./");let n=`[^${S(t.delimiter)}]+?`,o=[],c=0,i=0,s="",u=new Set,a=f=>{if(i<r.length&&r[i].type===f)return r[i++].value},l=()=>a("OTHER_MODIFIER")??a("ASTERISK"),m=f=>{let p=a(f);if(p!==void 0)return p;let{type:d,index:w}=r[i];throw new TypeError(`Unexpected ${d} at ${w}, expected ${f}`)},y=()=>{let f="",p;for(;p=a("CHAR")??a("ESCAPED_CHAR");)f+=p;return f},U=f=>f,g=t.encodePart||U,k="",T=f=>{k+=f},N=()=>{k.length&&(o.push(new F(3,"","",g(k),"",3)),k="")},R=(f,p,d,w,A)=>{let h=3;switch(A){case"?":h=1;break;case"*":h=0;break;case"+":h=2;break}if(!p&&!d&&h===3){T(f);return}if(N(),!p&&!d){if(!f)return;o.push(new F(3,"","",g(f),"",h));return}let x;d?d==="*"?x=Z:x=d:x=n;let P=2;x===n?(P=1,x=""):x===Z&&(P=0,x="");let I;if(p?I=p:d&&(I=c++),u.has(I))throw new TypeError(`Duplicate name '${I}'.`);u.add(I),o.push(new F(P,I,g(f),x,g(w),h))};for(;i<r.length;){let f=a("CHAR"),p=a("NAME"),d=a("REGEX");if(!p&&!d&&(d=a("ASTERISK")),p||d){let h=f??"";t.prefixes.indexOf(h)===-1&&(T(h),h=""),N();let x=l();R(h,p,d,"",x);continue}let w=f??a("ESCAPED_CHAR");if(w){T(w);continue}if(a("OPEN")){let h=y(),x=a("NAME"),P=a("REGEX");!x&&!P&&(P=a("ASTERISK"));let I=y();m("CLOSE");let et=l();R(h,x,P,I,et);continue}N(),m("END")}return o}function S(e){return e.replace(/([.+*?^${}()[\]|/\\])/g,"\\$1")}function we(e){return e&&e.ignoreCase?"ui":"u"}function ct(e,t,r){return Ie(ke(e,r),t,r)}function L(e){switch(e){case 0:return"*";case 1:return"?";case 2:return"+";case 3:return""}}function Ie(e,t,r={}){r.delimiter??(r.delimiter="/#?"),r.prefixes??(r.prefixes="./"),r.sensitive??(r.sensitive=!1),r.strict??(r.strict=!1),r.end??(r.end=!0),r.start??(r.start=!0),r.endsWith="";let n=r.start?"^":"";for(let s of e){if(s.type===3){s.modifier===3?n+=S(s.value):n+=`(?:${S(s.value)})${L(s.modifier)}`;continue}t&&t.push(s.name);let u=`[^${S(r.delimiter)}]+?`,a=s.value;if(s.type===1?a=u:s.type===0&&(a=Z),!s.prefix.length&&!s.suffix.length){s.modifier===3||s.modifier===1?n+=`(${a})${L(s.modifier)}`:n+=`((?:${a})${L(s.modifier)})`;continue}if(s.modifier===3||s.modifier===1){n+=`(?:${S(s.prefix)}(${a})${S(s.suffix)})`,n+=L(s.modifier);continue}n+=`(?:${S(s.prefix)}`,n+=`((?:${a})(?:`,n+=S(s.suffix),n+=S(s.prefix),n+=`(?:${a}))*)${S(s.suffix)})`,s.modifier===0&&(n+="?")}let o=`[${S(r.endsWith)}]|$`,c=`[${S(r.delimiter)}]`;if(r.end)return r.strict||(n+=`${c}?`),r.endsWith.length?n+=`(?=${o})`:n+="$",new RegExp(n,we(r));r.strict||(n+=`(?:${c}(?=${o}))?`);let i=!1;if(e.length){let s=e[e.length-1];s.type===3&&s.modifier===3&&(i=r.delimiter.indexOf(s)>-1)}return i||(n+=`(?=${c}|${o})`),new RegExp(n,we(r))}var E={delimiter:"",prefixes:"",sensitive:!0,strict:!0},ut={delimiter:".",prefixes:"",sensitive:!0,strict:!0},ft={delimiter:"/",prefixes:"/",sensitive:!0,strict:!0};function lt(e,t){return e.length?e[0]==="/"?!0:!t||e.length<2?!1:(e[0]=="\\"||e[0]=="{")&&e[1]=="/":!1}function ve(e,t){return e.startsWith(t)?e.substring(t.length,e.length):e}function ht(e,t){return e.endsWith(t)?e.substr(0,e.length-t.length):e}function Ee(e){return!e||e.length<2?!1:e[0]==="["||(e[0]==="\\"||e[0]==="{")&&e[1]==="["}var Pe=["ftp","file","http","https","ws","wss"];function _e(e){if(!e)return!0;for(let t of Pe)if(e.test(t))return!0;return!1}function pt(e,t){if(e=ve(e,"#"),t||e==="")return e;let r=new URL("https://example.com");return r.hash=e,r.hash?r.hash.substring(1,r.hash.length):""}function mt(e,t){if(e=ve(e,"?"),t||e==="")return e;let r=new URL("https://example.com");return r.search=e,r.search?r.search.substring(1,r.search.length):""}function dt(e,t){return t||e===""?e:Ee(e)?Ne(e):Te(e)}function gt(e,t){if(t||e==="")return e;let r=new URL("https://example.com");return r.password=e,r.password}function xt(e,t){if(t||e==="")return e;let r=new URL("https://example.com");return r.username=e,r.username}function St(e,t,r){if(r||e==="")return e;if(t&&!Pe.includes(t))return new URL(`${t}:${e}`).pathname;let n=e[0]=="/";return e=new URL(n?e:"/-"+e,"https://example.com").pathname,n||(e=e.substring(2,e.length)),e}function yt(e,t,r){return Le(t)===e&&(e=""),r||e===""?e:Ae(e)}function Rt(e,t){return e=ht(e,":"),t||e===""?e:ee(e)}function Le(e){switch(e){case"ws":case"http":return"80";case"wws":case"https":return"443";case"ftp":return"21";default:return""}}function ee(e){if(e==="")return e;if(/^[-+.A-Za-z0-9]*$/.test(e))return e.toLowerCase();throw new TypeError(`Invalid protocol '${e}'.`)}function wt(e){if(e==="")return e;let t=new URL("https://example.com");return t.username=e,t.username}function bt(e){if(e==="")return e;let t=new URL("https://example.com");return t.password=e,t.password}function Te(e){if(e==="")return e;if(/[\t\n\r #%/:<>?@[\]^\\|]/g.test(e))throw new TypeError(`Invalid hostname '${e}'`);let t=new URL("https://example.com");return t.hostname=e,t.hostname}function Ne(e){if(e==="")return e;if(/[^0-9a-fA-F[\]:]/g.test(e))throw new TypeError(`Invalid IPv6 hostname '${e}'`);return e.toLowerCase()}function Ae(e){if(e===""||/^[0-9]*$/.test(e)&&parseInt(e)<=65535)return e;throw new TypeError(`Invalid port '${e}'.`)}function Ct(e){if(e==="")return e;let t=new URL("https://example.com");return t.pathname=e[0]!=="/"?"/-"+e:e,e[0]!=="/"?t.pathname.substring(2,t.pathname.length):t.pathname}function kt(e){return e===""?e:new URL(`data:${e}`).pathname}function It(e){if(e==="")return e;let t=new URL("https://example.com");return t.search=e,t.search.substring(1,t.search.length)}function vt(e){if(e==="")return e;let t=new URL("https://example.com");return t.hash=e,t.hash.substring(1,t.hash.length)}var Et=class{constructor(e){this.tokenList=[],this.internalResult={},this.tokenIndex=0,this.tokenIncrement=1,this.componentStart=0,this.state=0,this.groupDepth=0,this.hostnameIPv6BracketDepth=0,this.shouldTreatAsStandardURL=!1,this.input=e}get result(){return this.internalResult}parse(){for(this.tokenList=Ce(this.input,!0);this.tokenIndex<this.tokenList.length;this.tokenIndex+=this.tokenIncrement){if(this.tokenIncrement=1,this.tokenList[this.tokenIndex].type==="END"){if(this.state===0){this.rewind(),this.isHashPrefix()?this.changeState(9,1):this.isSearchPrefix()?(this.changeState(8,1),this.internalResult.hash=""):(this.changeState(7,0),this.internalResult.search="",this.internalResult.hash="");continue}else if(this.state===2){this.rewindAndSetState(5);continue}this.changeState(10,0);break}if(this.groupDepth>0)if(this.isGroupClose())this.groupDepth-=1;else continue;if(this.isGroupOpen()){this.groupDepth+=1;continue}switch(this.state){case 0:this.isProtocolSuffix()&&(this.internalResult.username="",this.internalResult.password="",this.internalResult.hostname="",this.internalResult.port="",this.internalResult.pathname="",this.internalResult.search="",this.internalResult.hash="",this.rewindAndSetState(1));break;case 1:if(this.isProtocolSuffix()){this.computeShouldTreatAsStandardURL();let e=7,t=1;this.shouldTreatAsStandardURL&&(this.internalResult.pathname="/"),this.nextIsAuthoritySlashes()?(e=2,t=3):this.shouldTreatAsStandardURL&&(e=2),this.changeState(e,t)}break;case 2:this.isIdentityTerminator()?this.rewindAndSetState(3):(this.isPathnameStart()||this.isSearchPrefix()||this.isHashPrefix())&&this.rewindAndSetState(5);break;case 3:this.isPasswordPrefix()?this.changeState(4,1):this.isIdentityTerminator()&&this.changeState(5,1);break;case 4:this.isIdentityTerminator()&&this.changeState(5,1);break;case 5:this.isIPv6Open()?this.hostnameIPv6BracketDepth+=1:this.isIPv6Close()&&(this.hostnameIPv6BracketDepth-=1),this.isPortPrefix()&&!this.hostnameIPv6BracketDepth?this.changeState(6,1):this.isPathnameStart()?this.changeState(7,0):this.isSearchPrefix()?this.changeState(8,1):this.isHashPrefix()&&this.changeState(9,1);break;case 6:this.isPathnameStart()?this.changeState(7,0):this.isSearchPrefix()?this.changeState(8,1):this.isHashPrefix()&&this.changeState(9,1);break;case 7:this.isSearchPrefix()?this.changeState(8,1):this.isHashPrefix()&&this.changeState(9,1);break;case 8:this.isHashPrefix()&&this.changeState(9,1);break;case 9:break;case 10:break}}}changeState(e,t){switch(this.state){case 0:break;case 1:this.internalResult.protocol=this.makeComponentString();break;case 2:break;case 3:this.internalResult.username=this.makeComponentString();break;case 4:this.internalResult.password=this.makeComponentString();break;case 5:this.internalResult.hostname=this.makeComponentString();break;case 6:this.internalResult.port=this.makeComponentString();break;case 7:this.internalResult.pathname=this.makeComponentString();break;case 8:this.internalResult.search=this.makeComponentString();break;case 9:this.internalResult.hash=this.makeComponentString();break;case 10:break}this.changeStateWithoutSettingComponent(e,t)}changeStateWithoutSettingComponent(e,t){this.state=e,this.componentStart=this.tokenIndex+t,this.tokenIndex+=t,this.tokenIncrement=0}rewind(){this.tokenIndex=this.componentStart,this.tokenIncrement=0}rewindAndSetState(e){this.rewind(),this.state=e}safeToken(e){return e<0&&(e=this.tokenList.length-e),e<this.tokenList.length?this.tokenList[e]:this.tokenList[this.tokenList.length-1]}isNonSpecialPatternChar(e,t){let r=this.safeToken(e);return r.value===t&&(r.type==="CHAR"||r.type==="ESCAPED_CHAR"||r.type==="INVALID_CHAR")}isProtocolSuffix(){return this.isNonSpecialPatternChar(this.tokenIndex,":")}nextIsAuthoritySlashes(){return this.isNonSpecialPatternChar(this.tokenIndex+1,"/")&&this.isNonSpecialPatternChar(this.tokenIndex+2,"/")}isIdentityTerminator(){return this.isNonSpecialPatternChar(this.tokenIndex,"@")}isPasswordPrefix(){return this.isNonSpecialPatternChar(this.tokenIndex,":")}isPortPrefix(){return this.isNonSpecialPatternChar(this.tokenIndex,":")}isPathnameStart(){return this.isNonSpecialPatternChar(this.tokenIndex,"/")}isSearchPrefix(){if(this.isNonSpecialPatternChar(this.tokenIndex,"?"))return!0;if(this.tokenList[this.tokenIndex].value!=="?")return!1;let e=this.safeToken(this.tokenIndex-1);return e.type!=="NAME"&&e.type!=="REGEX"&&e.type!=="CLOSE"&&e.type!=="ASTERISK"}isHashPrefix(){return this.isNonSpecialPatternChar(this.tokenIndex,"#")}isGroupOpen(){return this.tokenList[this.tokenIndex].type=="OPEN"}isGroupClose(){return this.tokenList[this.tokenIndex].type=="CLOSE"}isIPv6Open(){return this.isNonSpecialPatternChar(this.tokenIndex,"[")}isIPv6Close(){return this.isNonSpecialPatternChar(this.tokenIndex,"]")}makeComponentString(){let e=this.tokenList[this.tokenIndex],t=this.safeToken(this.componentStart).index;return this.input.substring(t,e.index)}computeShouldTreatAsStandardURL(){let e={};Object.assign(e,E),e.encodePart=ee;let t=ct(this.makeComponentString(),void 0,e);this.shouldTreatAsStandardURL=_e(t)}},Q=["protocol","username","password","hostname","port","pathname","search","hash"],v="*";function be(e,t){if(typeof e!="string")throw new TypeError("parameter 1 is not of type 'string'.");let r=new URL(e,t);return{protocol:r.protocol.substring(0,r.protocol.length-1),username:r.username,password:r.password,hostname:r.hostname,port:r.port,pathname:r.pathname,search:r.search!==""?r.search.substring(1,r.search.length):void 0,hash:r.hash!==""?r.hash.substring(1,r.hash.length):void 0}}function b(e,t){return t?D(e):e}function O(e,t,r){let n;if(typeof t.baseURL=="string")try{n=new URL(t.baseURL),e.protocol=b(n.protocol.substring(0,n.protocol.length-1),r),e.username=b(n.username,r),e.password=b(n.password,r),e.hostname=b(n.hostname,r),e.port=b(n.port,r),e.pathname=b(n.pathname,r),e.search=b(n.search.substring(1,n.search.length),r),e.hash=b(n.hash.substring(1,n.hash.length),r)}catch{throw new TypeError(`invalid baseURL '${t.baseURL}'.`)}if(typeof t.protocol=="string"&&(e.protocol=Rt(t.protocol,r)),typeof t.username=="string"&&(e.username=xt(t.username,r)),typeof t.password=="string"&&(e.password=gt(t.password,r)),typeof t.hostname=="string"&&(e.hostname=dt(t.hostname,r)),typeof t.port=="string"&&(e.port=yt(t.port,e.protocol,r)),typeof t.pathname=="string"){if(e.pathname=t.pathname,n&&!lt(e.pathname,r)){let o=n.pathname.lastIndexOf("/");o>=0&&(e.pathname=b(n.pathname.substring(0,o+1),r)+e.pathname)}e.pathname=St(e.pathname,e.protocol,r)}return typeof t.search=="string"&&(e.search=mt(t.search,r)),typeof t.hash=="string"&&(e.hash=pt(t.hash,r)),e}function D(e){return e.replace(/([+*?:{}()\\])/g,"\\$1")}function Pt(e){return e.replace(/([.+*?^${}()[\]|/\\])/g,"\\$1")}function _t(e,t){t.delimiter??(t.delimiter="/#?"),t.prefixes??(t.prefixes="./"),t.sensitive??(t.sensitive=!1),t.strict??(t.strict=!1),t.end??(t.end=!0),t.start??(t.start=!0),t.endsWith="";let r=".*",n=`[^${Pt(t.delimiter)}]+?`,o=/[$_\u200C\u200D\p{ID_Continue}]/u,c="";for(let i=0;i<e.length;++i){let s=e[i];if(s.type===3){if(s.modifier===3){c+=D(s.value);continue}c+=`{${D(s.value)}}${L(s.modifier)}`;continue}let u=s.hasCustomName(),a=!!s.suffix.length||!!s.prefix.length&&(s.prefix.length!==1||!t.prefixes.includes(s.prefix)),l=i>0?e[i-1]:null,m=i<e.length-1?e[i+1]:null;if(!a&&u&&s.type===1&&s.modifier===3&&m&&!m.prefix.length&&!m.suffix.length)if(m.type===3){let y=m.value.length>0?m.value[0]:"";a=o.test(y)}else a=!m.hasCustomName();if(!a&&!s.prefix.length&&l&&l.type===3){let y=l.value[l.value.length-1];a=t.prefixes.includes(y)}a&&(c+="{"),c+=D(s.prefix),u&&(c+=`:${s.name}`),s.type===2?c+=`(${s.value})`:s.type===1?u||(c+=`(${n})`):s.type===0&&(!u&&(!l||l.type===3||l.modifier!==3||a||s.prefix!=="")?c+="*":c+=`(${r})`),s.type===1&&u&&s.suffix.length&&o.test(s.suffix[0])&&(c+="\\"),c+=D(s.suffix),a&&(c+="}"),s.modifier!==3&&(c+=L(s.modifier))}return c}var W=class{constructor(e={},t,r){this.regexp={},this.names={},this.component_pattern={},this.parts={};try{let n;if(typeof t=="string"?n=t:r=t,typeof e=="string"){let s=new Et(e);if(s.parse(),e=s.result,n===void 0&&typeof e.protocol!="string")throw new TypeError("A base URL must be provided for a relative constructor string.");e.baseURL=n}else{if(!e||typeof e!="object")throw new TypeError("parameter 1 is not of type 'string' and cannot convert to dictionary.");if(n)throw new TypeError("parameter 1 is not of type 'string'.")}typeof r>"u"&&(r={ignoreCase:!1});let o={ignoreCase:r.ignoreCase===!0},c={pathname:v,protocol:v,username:v,password:v,hostname:v,port:v,search:v,hash:v};this.pattern=O(c,e,!0),Le(this.pattern.protocol)===this.pattern.port&&(this.pattern.port="");let i;for(i of Q){if(!(i in this.pattern))continue;let s={},u=this.pattern[i];switch(this.names[i]=[],i){case"protocol":Object.assign(s,E),s.encodePart=ee;break;case"username":Object.assign(s,E),s.encodePart=wt;break;case"password":Object.assign(s,E),s.encodePart=bt;break;case"hostname":Object.assign(s,ut),Ee(u)?s.encodePart=Ne:s.encodePart=Te;break;case"port":Object.assign(s,E),s.encodePart=Ae;break;case"pathname":_e(this.regexp.protocol)?(Object.assign(s,ft,o),s.encodePart=Ct):(Object.assign(s,E,o),s.encodePart=kt);break;case"search":Object.assign(s,E,o),s.encodePart=It;break;case"hash":Object.assign(s,E,o),s.encodePart=vt;break}try{this.parts[i]=ke(u,s),this.regexp[i]=Ie(this.parts[i],this.names[i],s),this.component_pattern[i]=_t(this.parts[i],s)}catch{throw new TypeError(`invalid ${i} pattern '${this.pattern[i]}'.`)}}}catch(n){throw new TypeError(`Failed to construct 'URLPattern': ${n.message}`)}}test(e={},t){let r={pathname:"",protocol:"",username:"",password:"",hostname:"",port:"",search:"",hash:""};if(typeof e!="string"&&t)throw new TypeError("parameter 1 is not of type 'string'.");if(typeof e>"u")return!1;try{typeof e=="object"?r=O(r,e,!1):r=O(r,be(e,t),!1)}catch{return!1}let n;for(n of Q)if(!this.regexp[n].exec(r[n]))return!1;return!0}exec(e={},t){let r={pathname:"",protocol:"",username:"",password:"",hostname:"",port:"",search:"",hash:""};if(typeof e!="string"&&t)throw new TypeError("parameter 1 is not of type 'string'.");if(typeof e>"u")return;try{typeof e=="object"?r=O(r,e,!1):r=O(r,be(e,t),!1)}catch{return null}let n={};t?n.inputs=[e,t]:n.inputs=[e];let o;for(o of Q){let c=this.regexp[o].exec(r[o]);if(!c)return null;let i={};for(let[s,u]of this.names[o].entries())if(typeof u=="string"||typeof u=="number"){let a=c[s+1];i[u]=a}n[o]={input:r[o]??"",groups:i}}return n}static compareComponent(e,t,r){let n=(s,u)=>{for(let a of["type","modifier","prefix","value","suffix"]){if(s[a]<u[a])return-1;if(s[a]===u[a])continue;return 1}return 0},o=new F(3,"","","","",3),c=new F(0,"","","","",3),i=(s,u)=>{let a=0;for(;a<Math.min(s.length,u.length);++a){let l=n(s[a],u[a]);if(l)return l}return s.length===u.length?0:n(s[a]??o,u[a]??o)};return!t.component_pattern[e]&&!r.component_pattern[e]?0:t.component_pattern[e]&&!r.component_pattern[e]?i(t.parts[e],[c]):!t.component_pattern[e]&&r.component_pattern[e]?i([c],r.parts[e]):i(t.parts[e],r.parts[e])}get protocol(){return this.component_pattern.protocol}get username(){return this.component_pattern.username}get password(){return this.component_pattern.password}get hostname(){return this.component_pattern.hostname}get port(){return this.component_pattern.port}get pathname(){return this.component_pattern.pathname}get search(){return this.component_pattern.search}get hash(){return this.component_pattern.hash}};globalThis.URLPattern||(globalThis.URLPattern=W);var $e=(e,t)=>{var i;if(e===void 0)return{};let r=t.endsWith("/")?t.slice(0,-1):t,o=(i=new W({pathname:e,baseURL:r}).exec(r))==null?void 0:i.pathname.groups;return o?Object.entries(o).reduce((s,[u,a])=>a===void 0?s:{...s,[u]:a},{}):{}};var V=e=>e.headers.get(he)||"";import{env as Lt}from"process";var Oe=()=>({region:Lt.AWS_REGION});import{env as te}from"process";var De=()=>({id:te.SITE_ID,name:te.SITE_NAME,url:te.URL});var Tt=e=>{let t=JSON.stringify(e);return new Response(t,{headers:{"content-type":"application/json"}})},Fe=(e,t,r)=>{let n={};try{n=$e(e[_],e.url)}catch{console.log(`Could not parse function route ${e[_]}.`)}let o={enqueuedPromises:[]};return{context:{account:j(e),cookies:t.getPublicInterface(),deploy:M(e.headers),flags:xe(e),geo:ye(e.headers.get(ie)),ip:Re(e.headers.get(oe)),json:Tt,log:console.log,next:()=>{throw new Error("`context.next` is not implemented for serverless functions")},params:n,requestId:V(e),rewrite:i=>{let s=Nt(i,e.url);return At(s)},server:Oe(),site:De(),url:new URL(e.url),waitUntil:r?i=>{o.enqueuedPromises.push(i)}:void 0},state:o}},Nt=(e,t)=>{if(e instanceof URL)return e;if(e.startsWith("/")){let r=new URL(t);return r.pathname=e,r}return new URL(e)},At=async e=>await fetch(e);import Ue from"node:assert";function qe(e){function t(a,l=2){return a.padStart(l,"0")}let r=t(e.getUTCDate().toString()),n=t(e.getUTCHours().toString()),o=t(e.getUTCMinutes().toString()),c=t(e.getUTCSeconds().toString()),i=e.getUTCFullYear(),s=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],u=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];return`${s[e.getUTCDay()]}, ${r} ${u[e.getUTCMonth()]} ${i} ${n}:${o}:${c} GMT`}var $t=/^(?=[\u0020-\u007E]*$)[^()@<>,;:\\"[\]?={}\s]+$/;function Ot(e){if(!e.name)return"";let t=[];if(Dt(e.name),qt(e.name,e.value),t.push(`${e.name}=${e.value}`),e.name.startsWith("__Secure")&&(e.secure=!0),e.name.startsWith("__Host")&&(e.path="/",e.secure=!0,delete e.domain),e.secure&&t.push("Secure"),e.httpOnly&&t.push("HttpOnly"),typeof e.maxAge=="number"&&Number.isInteger(e.maxAge)&&(Ue(e.maxAge>=0,"Max-Age must be an integer superior or equal to 0"),t.push(`Max-Age=${e.maxAge}`)),e.domain&&(Ut(e.domain),t.push(`Domain=${e.domain}`)),e.sameSite&&t.push(`SameSite=${e.sameSite}`),e.path&&(Ft(e.path),t.push(`Path=${e.path}`)),e.expires){let{expires:r}=e,n=qe(typeof r=="number"?new Date(r):r);t.push(`Expires=${n}`)}return e.unparsed&&t.push(e.unparsed.join("; ")),t.join("; ")}function Dt(e){if(e&&!$t.test(e))throw new TypeError(`Invalid cookie name: "${e}".`)}function Ft(e){if(e!=null)for(let t=0;t<e.length;t++){let r=e.charAt(t);if(r<" "||r>"~"||r==";")throw new Error(`${e}: Invalid cookie path char '${r}'`)}}function qt(e,t){if(!(t==null||e==null))for(let r=0;r<t.length;r++){let n=t.charAt(r);if(n<"!"||n=='"'||n==","||n==";"||n=="\\"||n=="\x7F")throw new Error(`RFC2616 cookie '${e}' cannot contain character '${n}'`);if(n>"\x80")throw new Error(`RFC2616 cookie '${e}' can only have US-ASCII chars as value${n.charCodeAt(0).toString(16)}`)}}function Ut(e){if(e==null)return;let t=e.charAt(0),r=e.charAt(e.length-1);if(t=="-"||r=="."||r=="-")throw new Error(`Invalid first/last char in cookie domain: ${e}`)}function He(e){let t=e.get("Cookie");if(t!=null){let r={},n=t.split(";");for(let o of n){let[c,...i]=o.split("=");Ue(c!=null);let s=c.trim();r[s]=i.join("=")}return r}return{}}function re(e,t){let r=Ot(t);r&&e.append("Set-Cookie",r)}function je(e,t,r){re(e,Object.assign({name:t,value:"",expires:new Date(0)},r))}var z=class{constructor(t){this.ops=[],this.request=t}apply(t){this.ops.forEach(r=>{switch(r.type){case"delete":je(t,r.options.name,{domain:r.options.domain,path:r.options.path});break;case"set":re(t,r.cookie);break;default:}})}delete(t){let r={path:"/"},n=typeof t=="string"?{name:t}:t;this.ops.push({options:{...r,...n},type:"delete"})}get(t){return He(this.request.headers)[t]}getPublicInterface(){return{delete:this.delete.bind(this),get:this.get.bind(this),set:this.set.bind(this)}}set(t,r){let n;if(typeof t=="string"){if(typeof r!="string")throw new TypeError("You must provide the cookie value as a string to 'cookies.set'");n={name:t,value:r}}else n=t;this.ops.push({cookie:n,type:"set"})}};import{Buffer as Me}from"node:buffer";import Be from"node:process";var Ht="NETLIFY_PURGE_API_TOKEN",jt="NETLIFY_BLOBS_CONTEXT",Ge=(e,t,r)=>{var c,i;let{blobs:n}=t,o=(i=(c=r==null?void 0:r.clientContext)==null?void 0:c.custom)==null?void 0:i.purge_api_token;if(typeof n=="string"&&n!=="")try{let s=Me.from(n,"base64").toString("utf8"),u=JSON.parse(s),a=e.get(fe),l=e.get(H);Be.env[jt]=Me.from(JSON.stringify({edgeURL:u.url,uncachedEdgeURL:u.url_uncached,token:u.token,siteID:a,deployID:l,primaryRegion:u.primary_region})).toString("base64")}catch(s){console.error("An internal error occurred while setting up Netlify Blobs:",s)}typeof o=="string"&&o!==""&&(Be.env[Ht]=o)};var J=class e extends Error{constructor(t){super(t),this.name="NetlifyUserError",Object.setPrototypeOf(this,e.prototype)}};import Bt from"node:http";import Gt from"node:https";import{AsyncLocalStorage as Mt}from"node:async_hooks";var C=new Mt;import{env as We}from"node:process";var K=()=>!!We.NETLIFY_DEV||!!We.NETLIFY_LOCAL;var Ve="__nfSystemLog",X=(e,t)=>{K()||console.log(Ve,{msg:e,fields:t})},ne=e=>{console.log(Ve,JSON.stringify(e))};var Wt=globalThis.fetch,ze=!1,Je=e=>{let t=C.getStore();if(t!=null&&t.cdnLoopHeader){if(e.headersSent){X("Headers already sent, cannot add CDN-Loop header");return}e.setHeader("CDN-Loop",t==null?void 0:t.cdnLoopHeader)}},Ke=()=>{if(!ze){ze=!0,globalThis.fetch=function(t,r){let n=new Request(t,r),o=C.getStore();return o!=null&&o.cdnLoopHeader&&n.headers.set("CDN-Loop",o.cdnLoopHeader),Wt(n)};for(let e of[Bt,Gt]){let t=e.request;e.get=function(...n){let o=t(...n);return Je(o),o.end(),o},e.request=function(...n){let o=t(...n);return Je(o),o}}}};var Xe=({awsRequestID:e,req:t,branch:r,functionName:n,logToken:o})=>{let c=new URL(t.url),i=V(t),s={aws_req_id:e,aid:j(t).id,branch:r??"",did:M(t.headers).id,fn:n??"",host:c.host,log_token:o,method:t.method,nf_req_id:i,ts:Date.now(),path:c.pathname};ne({fields:s,type:"bootstrap/request"})},se=({awsRequestID:e,result:t})=>{let r={aws_req_id:e};t instanceof Response?r.status=t.status:t instanceof Error?r.error_message=t.message:r.status=204,ne({fields:r,type:"bootstrap/response"})};var Ye=!1,Vt=e=>(...t)=>{let[r,n]=t;if(typeof r=="string"&&r.startsWith("/"))try{let o=C.getStore(),c=o==null?void 0:o.context.url;if(!c)throw new Error("Could not find request in context");let i=new URL(r,c);return e(i,n)}catch{X("An error occurred in the patched Response.redirect")}return e(...t)},Qe=()=>{Ye||(Ye=!0,"Response"in globalThis&&Response.redirect&&(Response.redirect=Vt(Response.redirect)))};var Qt=Yt(Kt),Zt=20,er=e=>awslambda.streamifyResponse(async(t,r,n)=>{let o=n.awsRequestId,{body:c,flags:i,headers:s,httpMethod:u,invocationMetadata:a,isBase64Encoded:l,logToken:m,rawUrl:y,route:U}=t,g=new $(i||{}),k=pe(s),T=ge(c,l),N=g.get("serverless_functions_abort_signal")===!0?AbortSignal.timeout(n.getRemainingTimeInMillis()-Zt):void 0,R=new B(y,{body:T,headers:k,method:u,signal:N}),f=!K()&&g.get("serverless_functions_log_metadata")===!0;g.get("serverless_functions_response_redirect_relative")===!0&&Qe(),f&&Xe({awsRequestID:o,branch:a==null?void 0:a.branch,functionName:a==null?void 0:a.function_name,logToken:m,req:R}),Ge(k,t,n),Se(R,g),U&&(R[_]=U),g.get("serverless_functions_request_interceptor_v2")===!0&&Ke(),g.get("serverless_functions_wait_event_loop")===!0&&(n.callbackWaitsForEmptyEventLoop=!1);let p=g.get("serverless_functions_context_waituntil")===!0,d=new z(R),{context:w,state:A}=Fe(R,d,p);try{let h=await C.run({cdnLoopHeader:k.get("cdn-loop"),context:w},()=>e.default(R,w));f&&se({awsRequestID:o,result:h}),await tr(h,r,d,g)}catch(h){throw f&&se({awsRequestID:o,result:h}),h}if(p&&A.enqueuedPromises.length!==0)try{await Promise.allSettled(A.enqueuedPromises)}catch(h){console.error(h)}}),tr=async(e,t,r,n)=>{let o={version:Jt.version},c=zt.from(JSON.stringify(o)).toString("base64");if(e instanceof Response){let i=new Headers(e.headers);r.apply(i);let{body:s,status:u}=e,a=n.evaluations;a.size!==0&&i.set(le,[...a].join(",")),i.set(Y,c);let l={multiValueHeaders:me(i),statusCode:u},m=awslambda.HttpResponseStream.from(t,l);if((n.get("serverless_functions_fix_empty_body")===!0||s===null)&&m.write(""),s===null){m.end();return}let y=Xt.fromWeb(s);await Qt(y,m);return}if(e===void 0){let i=awslambda.HttpResponseStream.from(t,{statusCode:204,headers:{[Y]:c}});i.write(""),i.end();return}throw new J("Function returned an unsupported value. Accepted types are 'Response' or 'undefined'")};import q from"process";var rr={delete:e=>{delete q.env[e]},get:e=>q.env[e],has:e=>!!q.env[e],set:(e,t)=>{q.env[e]=t},toObject:()=>Object.entries(q.env).reduce((e,[t,r])=>r===void 0?e:{...e,[t]:r},{})},Ze={get context(){let e=C.getStore();return(e==null?void 0:e.context)??null},env:rr};globalThis.Netlify=Ze;var nr=()=>Ze;var Jn=()=>sr(import.meta.url);export{er as getLambdaHandler,nr as getNetlifyGlobal,Jn as getPath};