var app=function(){"use strict";function e(){}function t(e){return e()}function n(){return Object.create(null)}function l(e){e.forEach(t)}function o(e){return"function"==typeof e}function r(e,t){return e!=e?t==t:e!==t||e&&"object"==typeof e||"function"==typeof e}function c(e,t){e.appendChild(t)}function a(e,t,n){e.insertBefore(t,n||null)}function u(e){e.parentNode.removeChild(e)}function i(e){return document.createElement(e)}function s(e){return document.createTextNode(e)}function f(){return s(" ")}function d(e,t,n,l){return e.addEventListener(t,n,l),()=>e.removeEventListener(t,n,l)}function h(e,t,n){null==n?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function g(e,t){e.value=null==t?"":t}function p(e,t,n){e.classList[n?"add":"remove"](t)}let v;function b(e){v=e}const m=[],$=[],x=[],_=[],y=Promise.resolve();let k=!1;function w(e){x.push(e)}let C=!1;const E=new Set;function D(){if(!C){C=!0;do{for(let e=0;e<m.length;e+=1){const t=m[e];b(t),A(t.$$)}for(b(null),m.length=0;$.length;)$.pop()();for(let e=0;e<x.length;e+=1){const t=x[e];E.has(t)||(E.add(t),t())}x.length=0}while(m.length);for(;_.length;)_.pop()();k=!1,C=!1,E.clear()}}function A(e){if(null!==e.fragment){e.update(),l(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(w)}}const T=new Set;function L(e,t){-1===e.$$.dirty[0]&&(m.push(e),k||(k=!0,y.then(D)),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function M(r,c,a,i,s,f,d=[-1]){const h=v;b(r);const g=c.props||{},p=r.$$={fragment:null,ctx:null,props:f,update:e,not_equal:s,bound:n(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(h?h.$$.context:[]),callbacks:n(),dirty:d,skip_bound:!1};let m=!1;if(p.ctx=a?a(r,g,((e,t,...n)=>{const l=n.length?n[0]:t;return p.ctx&&s(p.ctx[e],p.ctx[e]=l)&&(!p.skip_bound&&p.bound[e]&&p.bound[e](l),m&&L(r,e)),t})):[],p.update(),m=!0,l(p.before_update),p.fragment=!!i&&i(p.ctx),c.target){if(c.hydrate){const e=function(e){return Array.from(e.childNodes)}(c.target);p.fragment&&p.fragment.l(e),e.forEach(u)}else p.fragment&&p.fragment.c();c.intro&&(($=r.$$.fragment)&&$.i&&(T.delete($),$.i(x))),function(e,n,r){const{fragment:c,on_mount:a,on_destroy:u,after_update:i}=e.$$;c&&c.m(n,r),w((()=>{const n=a.map(t).filter(o);u?u.push(...n):l(n),e.$$.on_mount=[]})),i.forEach(w)}(r,c.target,c.anchor),D()}var $,x;b(h)}function O(e,t,n){const l=e.slice();return l[14]=t[n],l}function S(e){let t;return{c(){t=i("h2"),t.textContent="まずはあなたの枕と接続しよう！"},m(e,n){a(e,t,n)},d(e){e&&u(t)}}}function j(e){let t,n,o,r,s,p,v,b,m,$,x=e[3],_=[];for(let t=0;t<x.length;t+=1)_[t]=B(O(e,x,t));return{c(){t=i("h2"),t.textContent="アラームを設定しよう！",n=f(),o=i("form"),r=i("input"),s=f(),p=i("div");for(let e=0;e<_.length;e+=1)_[e].c();v=f(),b=i("div"),b.innerHTML='<button class="submit-button svelte-1fbx9ar" type="submit">設定する</button>',h(r,"type","time"),h(p,"class","weekday-fields svelte-1fbx9ar"),h(b,"class","button-wrapper svelte-1fbx9ar"),h(o,"class","svelte-1fbx9ar")},m(l,u){a(l,t,u),a(l,n,u),a(l,o,u),c(o,r),g(r,e[0]),c(o,s),c(o,p);for(let e=0;e<_.length;e+=1)_[e].m(p,null);var i;c(o,v),c(o,b),m||($=[d(r,"input",e[6]),d(o,"submit",(i=e[5],function(e){return e.preventDefault(),i.call(this,e)}))],m=!0)},p(e,t){if(1&t&&g(r,e[0]),10&t){let n;for(x=e[3],n=0;n<x.length;n+=1){const l=O(e,x,n);_[n]?_[n].p(l,t):(_[n]=B(l),_[n].c(),_[n].m(p,null))}for(;n<_.length;n+=1)_[n].d(1);_.length=x.length}},d(e){e&&u(t),e&&u(n),e&&u(o),function(e,t){for(let n=0;n<e.length;n+=1)e[n]&&e[n].d(t)}(_,e),m=!1,l($)}}}function B(e){let t,n,l,o,r,g,v,b,m=e[14].label+"";return{c(){t=i("label"),n=i("input"),l=f(),o=i("div"),r=s(m),g=f(),h(n,"type","checkbox"),n.__value=e[14].value,n.value=n.__value,n.hidden=!0,e[8][0].push(n),h(o,"class","weekday svelte-1fbx9ar"),p(o,"selected",e[1].includes(e[14].value))},m(u,i){a(u,t,i),c(t,n),n.checked=~e[1].indexOf(n.__value),c(t,l),c(t,o),c(o,r),c(t,g),v||(b=d(n,"change",e[7]),v=!0)},p(e,t){2&t&&(n.checked=~e[1].indexOf(n.__value)),10&t&&p(o,"selected",e[1].includes(e[14].value))},d(l){l&&u(t),e[8][0].splice(e[8][0].indexOf(n),1),v=!1,b()}}}function N(t){let n,l,o,r,g,p,v,b,m,$,x=t[2]?"別の枕と接続する":"枕と接続する",_=!t[2]&&S(),y=t[2]&&j(t);return{c(){n=i("main"),l=i("h1"),l.textContent="MakuraFit Adventure",o=f(),_&&_.c(),r=f(),g=i("div"),p=i("button"),v=s(x),b=f(),y&&y.c(),h(l,"class","svelte-1fbx9ar"),h(p,"class","connect-button svelte-1fbx9ar"),h(p,"type","button"),h(g,"class","button-wrapper svelte-1fbx9ar"),h(n,"class","svelte-1fbx9ar")},m(e,u){a(e,n,u),c(n,l),c(n,o),_&&_.m(n,null),c(n,r),c(n,g),c(g,p),c(p,v),c(n,b),y&&y.m(n,null),m||($=d(p,"click",t[4]),m=!0)},p(e,[t]){e[2]?_&&(_.d(1),_=null):_||(_=S(),_.c(),_.m(n,r)),4&t&&x!==(x=e[2]?"別の枕と接続する":"枕と接続する")&&function(e,t){t=""+t,e.wholeText!==t&&(e.data=t)}(v,x),e[2]?y?y.p(e,t):(y=j(e),y.c(),y.m(n,null)):y&&(y.d(1),y=null)},i:e,o:e,d(e){e&&u(n),_&&_.d(),y&&y.d(),m=!1,$()}}}const P="6e400001-b5a3-f393-e0a9-e50e24dcca9e";function q(e,t,n){let l=null,o=[];const r=[{value:1,label:"日"},{value:2,label:"月"},{value:3,label:"火"},{value:4,label:"水"},{value:5,label:"木"},{value:6,label:"金"},{value:7,label:"土"}];let c=!1,a=null,u=null,i=null;const s=e=>{console.log("send:",e),i?.writeValue((new TextEncoder).encode(e+"\n"))},f=[[]];return[l,o,c,r,()=>{if(navigator.bluetooth&&navigator.bluetooth.requestDevice)return c?(a.disconnect(),void n(2,c=!1)):void navigator.bluetooth.requestDevice({filters:[{services:[P]},{namePrefix:"BBC micro:bit"}]}).then((e=>(a=e.gatt,a.connect()))).then((e=>e.getPrimaryService(P))).then((e=>Promise.all([e.getCharacteristic("6e400002-b5a3-f393-e0a9-e50e24dcca9e"),e.getCharacteristic("6e400003-b5a3-f393-e0a9-e50e24dcca9e")]))).then((e=>{u=e[0],u.startNotifications(),u.addEventListener("characteristicvaluechanged",(e=>(e=>console.log(e))((new TextDecoder).decode(e.target.value)))),i=e[1],n(2,c=!0);const t=new Date;s(`D:${t.getMonth()},${t.getUTCDate()},${t.getDay()},${t.getHours()},${t.getMinutes()},${t.getUTCSeconds()}`)})).catch((function(e){alert(e)}));alert("WebBluetooth に未対応のブラウザです。")},()=>{console.log(l,o);let e="";if(l||(e+="時刻を設定してください！\n"),o.length||(e+="曜日を設定してください！\n"),e.length)return void alert(e);const t=r.map((e=>o.includes(e.value)?1:0));s(`ALERM:${l.replace(":",",")},${t.join("")}`),alert("アラームを設定しました！")},function(){l=this.value,n(0,l)},function(){o=function(e,t,n){const l=new Set;for(let t=0;t<e.length;t+=1)e[t].checked&&l.add(e[t].__value);return n||l.delete(t),Array.from(l)}(f[0],this.__value,this.checked),n(1,o)},f]}return new class extends class{$destroy(){!function(e,t){const n=e.$$;null!==n.fragment&&(l(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}(this,1),this.$destroy=e}$on(e,t){const n=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return n.push(t),()=>{const e=n.indexOf(t);-1!==e&&n.splice(e,1)}}$set(e){var t;this.$$set&&(t=e,0!==Object.keys(t).length)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}{constructor(e){super(),M(this,e,q,N,r,{})}}({target:document.body})}();
//# sourceMappingURL=bundle.js.map
