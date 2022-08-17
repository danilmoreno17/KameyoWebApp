import"./vendor.7710df40.js";var te={exports:{}},Ae=function(t,r){return function(){for(var i=new Array(arguments.length),o=0;o<i.length;o++)i[o]=arguments[o];return t.apply(r,i)}},He=Ae,b=Object.prototype.toString;function fe(e){return Array.isArray(e)}function pe(e){return typeof e>"u"}function Me(e){return e!==null&&!pe(e)&&e.constructor!==null&&!pe(e.constructor)&&typeof e.constructor.isBuffer=="function"&&e.constructor.isBuffer(e)}function Ge(e){return b.call(e)==="[object ArrayBuffer]"}function Je(e){return b.call(e)==="[object FormData]"}function ze(e){var t;return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?t=ArrayBuffer.isView(e):t=e&&e.buffer&&Ge(e.buffer),t}function Xe(e){return typeof e=="string"}function Ke(e){return typeof e=="number"}function Fe(e){return e!==null&&typeof e=="object"}function Z(e){if(b.call(e)!=="[object Object]")return!1;var t=Object.getPrototypeOf(e);return t===null||t===Object.prototype}function Ye(e){return b.call(e)==="[object Date]"}function Qe(e){return b.call(e)==="[object File]"}function Ze(e){return b.call(e)==="[object Blob]"}function De(e){return b.call(e)==="[object Function]"}function et(e){return Fe(e)&&De(e.pipe)}function tt(e){return b.call(e)==="[object URLSearchParams]"}function rt(e){return e.trim?e.trim():e.replace(/^\s+|\s+$/g,"")}function nt(){return typeof navigator<"u"&&(navigator.product==="ReactNative"||navigator.product==="NativeScript"||navigator.product==="NS")?!1:typeof window<"u"&&typeof document<"u"}function $e(e,t){if(!(e===null||typeof e>"u"))if(typeof e!="object"&&(e=[e]),fe(e))for(var r=0,a=e.length;r<a;r++)t.call(null,e[r],r,e);else for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&t.call(null,e[i],i,e)}function de(){var e={};function t(i,o){Z(e[o])&&Z(i)?e[o]=de(e[o],i):Z(i)?e[o]=de({},i):fe(i)?e[o]=i.slice():e[o]=i}for(var r=0,a=arguments.length;r<a;r++)$e(arguments[r],t);return e}function it(e,t,r){return $e(t,function(i,o){r&&typeof i=="function"?e[o]=He(i,r):e[o]=i}),e}function at(e){return e.charCodeAt(0)===65279&&(e=e.slice(1)),e}var $={isArray:fe,isArrayBuffer:Ge,isBuffer:Me,isFormData:Je,isArrayBufferView:ze,isString:Xe,isNumber:Ke,isObject:Fe,isPlainObject:Z,isUndefined:pe,isDate:Ye,isFile:Qe,isBlob:Ze,isFunction:De,isStream:et,isURLSearchParams:tt,isStandardBrowserEnv:nt,forEach:$e,merge:de,extend:it,trim:rt,stripBOM:at},w=$;function be(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}var Ie=function(t,r,a){if(!r)return t;var i;if(a)i=a(r);else if(w.isURLSearchParams(r))i=r.toString();else{var o=[];w.forEach(r,function(l,m){l===null||typeof l>"u"||(w.isArray(l)?m=m+"[]":l=[l],w.forEach(l,function(p){w.isDate(p)?p=p.toISOString():w.isObject(p)&&(p=JSON.stringify(p)),o.push(be(m)+"="+be(p))}))}),i=o.join("&")}if(i){var u=t.indexOf("#");u!==-1&&(t=t.slice(0,u)),t+=(t.indexOf("?")===-1?"?":"&")+i}return t},ot=$;function re(){this.handlers=[]}re.prototype.use=function(t,r,a){return this.handlers.push({fulfilled:t,rejected:r,synchronous:a?a.synchronous:!1,runWhen:a?a.runWhen:null}),this.handlers.length-1};re.prototype.eject=function(t){this.handlers[t]&&(this.handlers[t]=null)};re.prototype.forEach=function(t){ot.forEach(this.handlers,function(a){a!==null&&t(a)})};var st=re,ut=$,ct=function(t,r){ut.forEach(t,function(i,o){o!==r&&o.toUpperCase()===r.toUpperCase()&&(t[r]=i,delete t[o])})},xe=function(t,r,a,i,o){return t.config=r,a&&(t.code=a),t.request=i,t.response=o,t.isAxiosError=!0,t.toJSON=function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code,status:this.response&&this.response.status?this.response.status:null}},t},_e={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},lt=xe,Te=function(t,r,a,i,o){var u=new Error(t);return lt(u,r,a,i,o)},pt=Te,dt=function(t,r,a){var i=a.config.validateStatus;!a.status||!i||i(a.status)?t(a):r(pt("Request failed with status code "+a.status,a.config,null,a.request,a))},M=$,ft=M.isStandardBrowserEnv()?function(){return{write:function(r,a,i,o,u,c){var l=[];l.push(r+"="+encodeURIComponent(a)),M.isNumber(i)&&l.push("expires="+new Date(i).toGMTString()),M.isString(o)&&l.push("path="+o),M.isString(u)&&l.push("domain="+u),c===!0&&l.push("secure"),document.cookie=l.join("; ")},read:function(r){var a=document.cookie.match(new RegExp("(^|;\\s*)("+r+")=([^;]*)"));return a?decodeURIComponent(a[3]):null},remove:function(r){this.write(r,"",Date.now()-864e5)}}}():function(){return{write:function(){},read:function(){return null},remove:function(){}}}(),$t=function(t){return/^([a-z][a-z\d+\-.]*:)?\/\//i.test(t)},ht=function(t,r){return r?t.replace(/\/+$/,"")+"/"+r.replace(/^\/+/,""):t},mt=$t,vt=ht,gt=function(t,r){return t&&!mt(r)?vt(t,r):r},se=$,Rt=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"],bt=function(t){var r={},a,i,o;return t&&se.forEach(t.split(`
`),function(c){if(o=c.indexOf(":"),a=se.trim(c.substr(0,o)).toLowerCase(),i=se.trim(c.substr(o+1)),a){if(r[a]&&Rt.indexOf(a)>=0)return;a==="set-cookie"?r[a]=(r[a]?r[a]:[]).concat([i]):r[a]=r[a]?r[a]+", "+i:i}}),r},ye=$,yt=ye.isStandardBrowserEnv()?function(){var t=/(msie|trident)/i.test(navigator.userAgent),r=document.createElement("a"),a;function i(o){var u=o;return t&&(r.setAttribute("href",u),u=r.href),r.setAttribute("href",u),{href:r.href,protocol:r.protocol?r.protocol.replace(/:$/,""):"",host:r.host,search:r.search?r.search.replace(/^\?/,""):"",hash:r.hash?r.hash.replace(/^#/,""):"",hostname:r.hostname,port:r.port,pathname:r.pathname.charAt(0)==="/"?r.pathname:"/"+r.pathname}}return a=i(window.location.href),function(u){var c=ye.isString(u)?i(u):u;return c.protocol===a.protocol&&c.host===a.host}}():function(){return function(){return!0}}();function he(e){this.message=e}he.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")};he.prototype.__CANCEL__=!0;var ne=he,J=$,Ct=dt,Ut=ft,jt=Ie,wt=gt,Et=bt,Ot=yt,ue=Te,Pt=_e,St=ne,Ce=function(t){return new Promise(function(a,i){var o=t.data,u=t.headers,c=t.responseType,l;function m(){t.cancelToken&&t.cancelToken.unsubscribe(l),t.signal&&t.signal.removeEventListener("abort",l)}J.isFormData(o)&&delete u["Content-Type"];var s=new XMLHttpRequest;if(t.auth){var p=t.auth.username||"",g=t.auth.password?unescape(encodeURIComponent(t.auth.password)):"";u.Authorization="Basic "+btoa(p+":"+g)}var f=wt(t.baseURL,t.url);s.open(t.method.toUpperCase(),jt(f,t.params,t.paramsSerializer),!0),s.timeout=t.timeout;function ge(){if(!!s){var v="getAllResponseHeaders"in s?Et(s.getAllResponseHeaders()):null,j=!c||c==="text"||c==="json"?s.responseText:s.response,y={data:j,status:s.status,statusText:s.statusText,headers:v,config:t,request:s};Ct(function(oe){a(oe),m()},function(oe){i(oe),m()},y),s=null}}if("onloadend"in s?s.onloadend=ge:s.onreadystatechange=function(){!s||s.readyState!==4||s.status===0&&!(s.responseURL&&s.responseURL.indexOf("file:")===0)||setTimeout(ge)},s.onabort=function(){!s||(i(ue("Request aborted",t,"ECONNABORTED",s)),s=null)},s.onerror=function(){i(ue("Network Error",t,null,s)),s=null},s.ontimeout=function(){var j=t.timeout?"timeout of "+t.timeout+"ms exceeded":"timeout exceeded",y=t.transitional||Pt;t.timeoutErrorMessage&&(j=t.timeoutErrorMessage),i(ue(j,t,y.clarifyTimeoutError?"ETIMEDOUT":"ECONNABORTED",s)),s=null},J.isStandardBrowserEnv()){var Re=(t.withCredentials||Ot(f))&&t.xsrfCookieName?Ut.read(t.xsrfCookieName):void 0;Re&&(u[t.xsrfHeaderName]=Re)}"setRequestHeader"in s&&J.forEach(u,function(j,y){typeof o>"u"&&y.toLowerCase()==="content-type"?delete u[y]:s.setRequestHeader(y,j)}),J.isUndefined(t.withCredentials)||(s.withCredentials=!!t.withCredentials),c&&c!=="json"&&(s.responseType=t.responseType),typeof t.onDownloadProgress=="function"&&s.addEventListener("progress",t.onDownloadProgress),typeof t.onUploadProgress=="function"&&s.upload&&s.upload.addEventListener("progress",t.onUploadProgress),(t.cancelToken||t.signal)&&(l=function(v){!s||(i(!v||v&&v.type?new St("canceled"):v),s.abort(),s=null)},t.cancelToken&&t.cancelToken.subscribe(l),t.signal&&(t.signal.aborted?l():t.signal.addEventListener("abort",l))),o||(o=null),s.send(o)})},d=$,Ue=ct,At=xe,Gt=_e,Ft={"Content-Type":"application/x-www-form-urlencoded"};function je(e,t){!d.isUndefined(e)&&d.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t)}function Dt(){var e;return(typeof XMLHttpRequest<"u"||typeof process<"u"&&Object.prototype.toString.call(process)==="[object process]")&&(e=Ce),e}function It(e,t,r){if(d.isString(e))try{return(t||JSON.parse)(e),d.trim(e)}catch(a){if(a.name!=="SyntaxError")throw a}return(r||JSON.stringify)(e)}var ie={transitional:Gt,adapter:Dt(),transformRequest:[function(t,r){return Ue(r,"Accept"),Ue(r,"Content-Type"),d.isFormData(t)||d.isArrayBuffer(t)||d.isBuffer(t)||d.isStream(t)||d.isFile(t)||d.isBlob(t)?t:d.isArrayBufferView(t)?t.buffer:d.isURLSearchParams(t)?(je(r,"application/x-www-form-urlencoded;charset=utf-8"),t.toString()):d.isObject(t)||r&&r["Content-Type"]==="application/json"?(je(r,"application/json"),It(t)):t}],transformResponse:[function(t){var r=this.transitional||ie.transitional,a=r&&r.silentJSONParsing,i=r&&r.forcedJSONParsing,o=!a&&this.responseType==="json";if(o||i&&d.isString(t)&&t.length)try{return JSON.parse(t)}catch(u){if(o)throw u.name==="SyntaxError"?At(u,this,"E_JSON_PARSE"):u}return t}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,validateStatus:function(t){return t>=200&&t<300},headers:{common:{Accept:"application/json, text/plain, */*"}}};d.forEach(["delete","get","head"],function(t){ie.headers[t]={}});d.forEach(["post","put","patch"],function(t){ie.headers[t]=d.merge(Ft)});var me=ie,xt=$,_t=me,Tt=function(t,r,a){var i=this||_t;return xt.forEach(a,function(u){t=u.call(i,t,r)}),t},Ne=function(t){return!!(t&&t.__CANCEL__)},we=$,ce=Tt,Nt=Ne,Wt=me,kt=ne;function le(e){if(e.cancelToken&&e.cancelToken.throwIfRequested(),e.signal&&e.signal.aborted)throw new kt("canceled")}var Bt=function(t){le(t),t.headers=t.headers||{},t.data=ce.call(t,t.data,t.headers,t.transformRequest),t.headers=we.merge(t.headers.common||{},t.headers[t.method]||{},t.headers),we.forEach(["delete","get","head","post","put","patch","common"],function(i){delete t.headers[i]});var r=t.adapter||Wt.adapter;return r(t).then(function(i){return le(t),i.data=ce.call(t,i.data,i.headers,t.transformResponse),i},function(i){return Nt(i)||(le(t),i&&i.response&&(i.response.data=ce.call(t,i.response.data,i.response.headers,t.transformResponse))),Promise.reject(i)})},h=$,We=function(t,r){r=r||{};var a={};function i(s,p){return h.isPlainObject(s)&&h.isPlainObject(p)?h.merge(s,p):h.isPlainObject(p)?h.merge({},p):h.isArray(p)?p.slice():p}function o(s){if(h.isUndefined(r[s])){if(!h.isUndefined(t[s]))return i(void 0,t[s])}else return i(t[s],r[s])}function u(s){if(!h.isUndefined(r[s]))return i(void 0,r[s])}function c(s){if(h.isUndefined(r[s])){if(!h.isUndefined(t[s]))return i(void 0,t[s])}else return i(void 0,r[s])}function l(s){if(s in r)return i(t[s],r[s]);if(s in t)return i(void 0,t[s])}var m={url:u,method:u,data:u,baseURL:c,transformRequest:c,transformResponse:c,paramsSerializer:c,timeout:c,timeoutMessage:c,withCredentials:c,adapter:c,responseType:c,xsrfCookieName:c,xsrfHeaderName:c,onUploadProgress:c,onDownloadProgress:c,decompress:c,maxContentLength:c,maxBodyLength:c,transport:c,httpAgent:c,httpsAgent:c,cancelToken:c,socketPath:c,responseEncoding:c,validateStatus:l};return h.forEach(Object.keys(t).concat(Object.keys(r)),function(p){var g=m[p]||o,f=g(p);h.isUndefined(f)&&g!==l||(a[p]=f)}),a},ke={version:"0.26.1"},Lt=ke.version,ve={};["object","boolean","number","function","string","symbol"].forEach(function(e,t){ve[e]=function(a){return typeof a===e||"a"+(t<1?"n ":" ")+e}});var Ee={};ve.transitional=function(t,r,a){function i(o,u){return"[Axios v"+Lt+"] Transitional option '"+o+"'"+u+(a?". "+a:"")}return function(o,u,c){if(t===!1)throw new Error(i(u," has been removed"+(r?" in "+r:"")));return r&&!Ee[u]&&(Ee[u]=!0,console.warn(i(u," has been deprecated since v"+r+" and will be removed in the near future"))),t?t(o,u,c):!0}};function Vt(e,t,r){if(typeof e!="object")throw new TypeError("options must be an object");for(var a=Object.keys(e),i=a.length;i-- >0;){var o=a[i],u=t[o];if(u){var c=e[o],l=c===void 0||u(c,o,e);if(l!==!0)throw new TypeError("option "+o+" must be "+l);continue}if(r!==!0)throw Error("Unknown option "+o)}}var qt={assertOptions:Vt,validators:ve},Be=$,Ht=Ie,Oe=st,Pe=Bt,ae=We,Le=qt,E=Le.validators;function H(e){this.defaults=e,this.interceptors={request:new Oe,response:new Oe}}H.prototype.request=function(t,r){typeof t=="string"?(r=r||{},r.url=t):r=t||{},r=ae(this.defaults,r),r.method?r.method=r.method.toLowerCase():this.defaults.method?r.method=this.defaults.method.toLowerCase():r.method="get";var a=r.transitional;a!==void 0&&Le.assertOptions(a,{silentJSONParsing:E.transitional(E.boolean),forcedJSONParsing:E.transitional(E.boolean),clarifyTimeoutError:E.transitional(E.boolean)},!1);var i=[],o=!0;this.interceptors.request.forEach(function(f){typeof f.runWhen=="function"&&f.runWhen(r)===!1||(o=o&&f.synchronous,i.unshift(f.fulfilled,f.rejected))});var u=[];this.interceptors.response.forEach(function(f){u.push(f.fulfilled,f.rejected)});var c;if(!o){var l=[Pe,void 0];for(Array.prototype.unshift.apply(l,i),l=l.concat(u),c=Promise.resolve(r);l.length;)c=c.then(l.shift(),l.shift());return c}for(var m=r;i.length;){var s=i.shift(),p=i.shift();try{m=s(m)}catch(g){p(g);break}}try{c=Pe(m)}catch(g){return Promise.reject(g)}for(;u.length;)c=c.then(u.shift(),u.shift());return c};H.prototype.getUri=function(t){return t=ae(this.defaults,t),Ht(t.url,t.params,t.paramsSerializer).replace(/^\?/,"")};Be.forEach(["delete","get","head","options"],function(t){H.prototype[t]=function(r,a){return this.request(ae(a||{},{method:t,url:r,data:(a||{}).data}))}});Be.forEach(["post","put","patch"],function(t){H.prototype[t]=function(r,a,i){return this.request(ae(i||{},{method:t,url:r,data:a}))}});var Mt=H,Jt=ne;function q(e){if(typeof e!="function")throw new TypeError("executor must be a function.");var t;this.promise=new Promise(function(i){t=i});var r=this;this.promise.then(function(a){if(!!r._listeners){var i,o=r._listeners.length;for(i=0;i<o;i++)r._listeners[i](a);r._listeners=null}}),this.promise.then=function(a){var i,o=new Promise(function(u){r.subscribe(u),i=u}).then(a);return o.cancel=function(){r.unsubscribe(i)},o},e(function(i){r.reason||(r.reason=new Jt(i),t(r.reason))})}q.prototype.throwIfRequested=function(){if(this.reason)throw this.reason};q.prototype.subscribe=function(t){if(this.reason){t(this.reason);return}this._listeners?this._listeners.push(t):this._listeners=[t]};q.prototype.unsubscribe=function(t){if(!!this._listeners){var r=this._listeners.indexOf(t);r!==-1&&this._listeners.splice(r,1)}};q.source=function(){var t,r=new q(function(i){t=i});return{token:r,cancel:t}};var zt=q,Xt=function(t){return function(a){return t.apply(null,a)}},Kt=$,Yt=function(t){return Kt.isObject(t)&&t.isAxiosError===!0},Se=$,Qt=Ae,ee=Mt,Zt=We,er=me;function Ve(e){var t=new ee(e),r=Qt(ee.prototype.request,t);return Se.extend(r,ee.prototype,t),Se.extend(r,t),r.create=function(i){return Ve(Zt(e,i))},r}var R=Ve(er);R.Axios=ee;R.Cancel=ne;R.CancelToken=zt;R.isCancel=Ne;R.VERSION=ke.version;R.all=function(t){return Promise.all(t)};R.spread=Xt;R.isAxiosError=Yt;te.exports=R;var Fr=te.exports.default=R,Dr=te.exports,tr=te.exports;const rr="https://kameyo-api.azurewebsites.net",nr=`${rr}`;var n=tr.create({baseURL:nr});const O="/api/users";var ir={GetWithPagination(e){return n.get(`${O}/paginated`,e)},Get(e){return n.get(`${O}`,e)},GetAll(e){return n.get(`${O}/all`,e)},Create(e){return n.post(`${O}`,e)},Update(e){return n.put(`${O}/id`,e)},Delete(e){return n.post(`${O}/${e}`)}};const P="/api/catalogs";var ar={GetWithFilter(e){const t=Object.keys(e).map(r=>`${encodeURIComponent(r)}=${encodeURIComponent(e[r])}`).join("&");return n.get(`${P}/filter?${t}`)},Get(e,t){return n.get(`${P}?Field=${e}&Value=${t}`)},GetPaginated(e){return n.get(`${P}`,e)},Create(e){return n.post(`${P}`,e)},Update(e){return n.put(`${P}`,e)},Delete(e){return n.delete(`${P}/${e}`)}};const S="/api/subsidiaries";var or={GetWithFilter(e){const t=Object.keys(e).map(r=>`${encodeURIComponent(r)}=${encodeURIComponent(e[r])}`).join("&");return n.get(`${S}/filter?${t}`)},GetWithPagination(e){return n.get(`${S}/paginated`,e)},Get(e){return n.get(`${S}`,e)},Create(e){return n.post(`${S}`,e)},Update(e){return n.put(`${S}`,e)},Delete(e){return n.delete(`${S}/${e}`)}};const A="/api/company";var sr={GetWithFilter(e){const t=Object.keys(e).map(r=>`${encodeURIComponent(r)}=${encodeURIComponent(e[r])}`).join("&");return n.get(`${A}/filter?${t}`)},GetWithPagination(e){const t=Object.keys(e).map(r=>`${encodeURIComponent(r)}=${encodeURIComponent(e[r])}`).join("&");return n.get(`${A}/paginated?${t}`)},Get(e,t){return n.get(`${A}?Field=${e}&Value=${t}`)},Create(e){return n.post(`${A}`,e)},Update(e){return n.put(`${A}`,e)},Delete(e){return n.delete(`${A}/${e}`)}};const G="/api/project";var ur={GetWithFilter(e){const t=Object.keys(e).map(r=>`${encodeURIComponent(r)}=${encodeURIComponent(e[r])}`).join("&");return n.get(`${G}/filter?${t}`)},GetWithPagination(e){return n.get(`${G}/paginated`,e)},Get(e,t){return n.get(`${G}?Field=${e}&Value=${t}`)},Create(e){return n.post(`${G}`,e)},Update(e){return n.put(`${G}`,e)},Delete(e){return n.delete(`${G}/${e}`)}};const F="/api/customer";var cr={GetWithFilter(e){const t=Object.keys(e).map(r=>`${encodeURIComponent(r)}=${encodeURIComponent(e[r])}`).join("&");return n.get(`${F}/filter?${t}`)},GetWithPagination(e){return n.get(`${F}/paginated`,e)},Get(e,t){return n.get(`${F}?Field=${e}&Value=${t}`)},Create(e){return n.post(`${F}`,e)},Update(e){return n.put(`${F}`,e)},Delete(e){return n.delete(`${F}/${e}`)}};const D="/api/contact";var lr={GetWithFilter(e){const t=Object.keys(e).map(r=>`${encodeURIComponent(r)}=${encodeURIComponent(e[r])}`).join("&");return n.get(`${D}/filter?${t}`)},GetWithPagination(e){return n.get(`${D}/paginated`,e)},Get(e,t){return n.get(`${D}?Field=${e}&Value=${t}`)},Create(e){return n.post(`${D}`,e)},Update(e){return n.put(`${D}`,e)},Delete(e){return n.delete(`${D}/${e}`)}};const I="/api/projectmanagers";var pr={GetWithFilter(e){const t=Object.keys(e).map(r=>`${encodeURIComponent(r)}=${encodeURIComponent(e[r])}`).join("&");return n.get(`${I}/filter?${t}`)},GetWithPagination(e){return n.get(`${I}/paginated`,e)},Get(e,t){return n.get(`${I}?Field=${e}&Value=${t}`)},Create(e){return n.post(`${I}`,e)},Update(e){return n.put(`${I}`,e)},Delete(e){return n.delete(`${I}/${e}`)}};const x="/api/projecthourbanks";var dr={GetWithFilter(e){const t=Object.keys(e).map(r=>`${encodeURIComponent(r)}=${encodeURIComponent(e[r])}`).join("&");return n.get(`${x}/filter?${t}`)},GetWithPagination(e){return n.get(`${x}/paginated`,e)},Get(e,t){return n.get(`${x}?Field=${e}&Value=${t}`)},Create(e){return n.post(`${x}`,e)},Update(e){return n.put(`${x}`,e)},Delete(e){return n.delete(`${x}/${e}`)}};const _="/api/hourbanks";var fr={GetWithFilter(e){const t=Object.keys(e).map(r=>`${encodeURIComponent(r)}=${encodeURIComponent(e[r])}`).join("&");return n.get(`${_}/filter?${t}`)},GetWithPagination(e){return n.get(`${_}/paginated`,e)},Get(e,t){return n.get(`${_}?Field=${e}&Value=${t}`)},Create(e){return n.post(`${_}`,e)},Update(e){return n.put(`${_}`,e)},Delete(e){return n.delete(`${_}/${e}`)}};const T="/api/projectresources";var $r={GetWithFilter(e){const t=Object.keys(e).map(r=>`${encodeURIComponent(r)}=${encodeURIComponent(e[r])}`).join("&");return n.get(`${T}/filter?${t}`)},GetWithPagination(e){return n.get(`${T}/paginated`,e)},Get(e,t){return n.get(`${T}?Field=${e}&Value=${t}`)},Create(e){return n.post(`${T}`,e)},Update(e){return n.put(`${T}`,e)},Delete(e){return n.delete(`${T}/${e}`)}};const N="/api/taskactivities";var hr={GetWithFilter(e){const t=Object.keys(e).map(r=>`${encodeURIComponent(r)}=${encodeURIComponent(e[r])}`).join("&");return n.get(`${N}/filter?${t}`)},GetWithPagination(e){return n.get(`${N}/paginated`,e)},Get(e,t){return n.get(`${N}?Field=${e}&Value=${t}`)},Create(e){return n.post(`${N}`,e)},Update(e){return n.put(`${N}`,e)},Delete(e){return n.delete(`${N}/${e}`)}};const W="/api/projecttasks";var mr={GetWithFilter(e){const t=Object.keys(e).map(r=>`${encodeURIComponent(r)}=${encodeURIComponent(e[r])}`).join("&");return n.get(`${W}/filter?${t}`)},GetWithPagination(e){return n.get(`${W}/paginated`,e)},Get(e,t){return n.get(`${W}?Field=${e}&Value=${t}`)},Create(e){return n.post(`${W}`,e)},Update(e){return n.put(`${W}`,e)},Delete(e){return n.delete(`${W}/${e}`)}};const k="/api/employee";var vr={GetWithFilter(e){const t=Object.keys(e).map(r=>`${encodeURIComponent(r)}=${encodeURIComponent(e[r])}`).join("&");return n.get(`${k}/filter?${t}`)},GetWithPagination(e){return n.get(`${k}/paginated`,e)},Get(e,t){return n.get(`${k}?Field=${e}&Value=${t}`)},Create(e){return n.post(`${k}`,e)},Update(e){return n.put(`${k}`,e)},Delete(e){return n.delete(`${k}/${e}`)}};const z="/api/employeeawards";var gr={Get(e,t){return n.get(`${z}?Field=${e}&Value=${t}`)},Create(e){return n.post(`${z}`,e)},Update(e){return n.put(`${z}`,e)},Delete(e){return n.delete(`${z}/${e}`)}};const X="/api/employeecertifications";var Rr={Get(e,t){return n.get(`${X}?Field=${e}&Value=${t}`)},Create(e){return n.post(`${X}`,e)},Update(e){return n.put(`${X}`,e)},Delete(e){return n.delete(`${X}/${e}`)}};const K="/api/employeeexperiences";var br={Get(e,t){return n.get(`${K}?Field=${e}&Value=${t}`)},Create(e){return n.post(`${K}`,e)},Update(e){return n.put(`${K}`,e)},Delete(e){return n.delete(`${K}/${e}`)}};const Y="/api/employeeskillabilities";var yr={Get(e,t){return n.get(`${Y}?Field=${e}&Value=${t}`)},Create(e){return n.post(`${Y}`,e)},Update(e){return n.put(`${Y}`,e)},Delete(e){return n.delete(`${Y}/${e}`)}};const Q="/api/employeestudies";var Cr={Get(e,t){return n.get(`${Q}?Field=${e}&Value=${t}`)},Create(e){return n.post(`${Q}`,e)},Update(e){return n.put(`${Q}`,e)},Delete(e){return n.delete(`${Q}/${e}`)}};const B="/api/ProjectReport";var Ur={GetWithFilter(e){const t=Object.keys(e).map(r=>`${encodeURIComponent(r)}=${encodeURIComponent(e[r])}`).join("&");return n.get(`${B}/filter?${t}`)},GetWithPagination(e){return n.get(`${B}/paginated`,e)},Get(e,t){return n.get(`${B}?Field=${e}&Value=${t}`)},Create(e){return n.post(`${B}`,e)},Update(e){return n.put(`${B}`,e)},Delete(e){return n.delete(`${B}/${e}`)},GetStatus(e){let r=[{id:"G",value:"Generado"},{id:"C",value:"Enviar a Cliente"},{id:"A",value:"Aprobado"},{id:"R",value:"Regresar con Observaci\xF3n"},{id:"F",value:"Facturado"},{id:"P",value:"Pagado"}].find(a=>a.id===e);return r??{id:"O",value:"Otro"}}};const L="/api/ProjectReportActivity";var jr={GetWithFilter(e){const t=Object.keys(e).map(r=>`${encodeURIComponent(r)}=${encodeURIComponent(e[r])}`).join("&");return n.get(`${L}/filter?${t}`)},GetWithPagination(e){return n.get(`${L}/paginated`,e)},Get(e,t){return n.get(`${L}?Field=${e}&Value=${t}`)},Create(e){return n.post(`${L}`,e)},Update(e){return n.put(`${L}`,e)},Delete(e){return n.delete(`${L}/${e}`)}};const V="/api/ProjectReportDetail";var wr={GetWithFilter(e){const t=Object.keys(e).map(r=>`${encodeURIComponent(r)}=${encodeURIComponent(e[r])}`).join("&");return n.get(`${V}/filter?${t}`)},GetWithPagination(e){return n.get(`${V}/paginated`,e)},Get(e,t){return n.get(`${V}?Field=${e}&Value=${t}`)},Create(e){return n.post(`${V}`,e)},Update(e){return n.put(`${V}`,e)},Delete(e){return n.delete(`${V}/${e}`)}};const C="/api/FinancialParticipation";var Er={GetWithFilter(e){const t=Object.keys(e).map(r=>`${encodeURIComponent(r)}=${encodeURIComponent(e[r])}`).join("&");return n.get(`${C}/filter?${t}`)},GetWithFilterTaskActivities(e,t,r,a,i){const o=Object.keys(i).map(u=>`${encodeURIComponent(u)}=${encodeURIComponent(i[u])}`).join("&");return n.get(`${C}/taskActivitiesDetails/filter/${e}/?${o}`)},GetWithPagination(e){return n.get(`${C}/paginated`,e)},Get(e,t){return n.get(`${C}?Field=${e}&Value=${t}`)},Create(e){return n.post(`${C}`,e)},Update(e){return n.put(`${C}`,e)},Delete(e){return n.delete(`${C}/${e}`)},GetType(e){let r=[{id:"A",value:"Movimiento"},{id:"D",value:"Directa"},{id:"I",value:"Indirecta"},{id:"P",value:"Directa por Participaci\xF3n"}].find(a=>a.id===e);return r??{id:"O",value:"Otro"}},GetStatus(e){let r=[{id:"G",value:"Generado"},{id:"A",value:"Aprobado"},{id:"R",value:"Rechazado"},{id:"P",value:"Pagado"}].find(a=>a.id===e);return r??{id:"O",value:"Otro"}}};const U="/api/ProductivityParticipationTable";var Or={GetWithFilterSubidiary(e,t){const r=Object.keys(e).map(a=>`${encodeURIComponent(a)}=${encodeURIComponent(e[a])}`).join("&");return n.get(`${U}/filter/${t}?${r}`)},GetWithFilterTaskActivities(e,t,r,a){const i=Object.keys(a).map(o=>`${encodeURIComponent(o)}=${encodeURIComponent(a[o])}`).join("&");return n.get(`${U}/taskActivitiesDetails/filter/${e}/${t}/${r}/?${i}`)},GetWithPagination(e){return n.get(`${U}/paginated`,e)},Get(e,t){return n.get(`${U}?Field=${e}&Value=${t}`)},Create(e){return n.post(`${U}`,e)},Update(e){return n.put(`${U}`,e)},Delete(e){return n.delete(`${U}/${e}`)}};const Pr="/api/authentication";var Sr={ValidateUser(e,t){return console.log(e,t),n.get(`${Pr}?mail=${e}&role=${t}`)}};const Ar={users:ir,catalogs:ar,subsidiaries:or,companies:sr,projects:ur,customers:cr,contacts:lr,projectManagers:pr,projectHourBanks:dr,hourBanks:fr,projectResources:$r,taskActivities:hr,projectTasks:mr,employees:vr,employeeAwards:gr,employeeCertifications:Rr,employeeExperiences:br,employeeSkillAbilities:yr,employeeStudies:Cr,projectReport:Ur,projectReportActivities:jr,projectReportDetail:wr,financialParticipation:Er,productivityTable:Or,authenticate:Sr},Ir={get:e=>Ar[e]};export{Ir as R};
