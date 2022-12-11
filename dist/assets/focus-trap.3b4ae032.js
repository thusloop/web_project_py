import{S as e,az as t,ad as n,aS as s,k as o,r,J as a,w as u,y as c,_ as d,n as i,b as f,C as l}from"./index.4cf3a710.js";import{i as p}from"./el-input.09a5a42a.js";const v=(e,t,n,s=!1)=>{e&&t&&n&&(null==e||e.addEventListener(t,n,s))},m=(e,t,n,s=!1)=>{e&&t&&n&&(null==e||e.removeEventListener(t,n,s))},E=(e,t,n)=>{const s=function(...o){n&&n.apply(this,o),m(e,t,s)};v(e,t,s)},y=(e,t,{checkForDefaultPrevented:n=!0}={})=>s=>{const o=null==e?void 0:e(s);if(!1===n||!o)return null==t?void 0:t(s)},h=e=>t=>"mouse"===t.pointerType?e(t):void 0;let L=[];const T=e=>{const t=[],n=document.createTreeWalker(e,NodeFilter.SHOW_ELEMENT,{acceptNode:e=>{const t="INPUT"===e.tagName&&"hidden"===e.type;return e.disabled||e.hidden||t?NodeFilter.FILTER_SKIP:e.tabIndex>=0||e===document.activeElement?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}});for(;n.nextNode();)t.push(n.currentNode);return t},b=(e,t)=>{for(const n of e)if(!w(n,t))return n},w=(e,t)=>{if("hidden"===getComputedStyle(e).visibility)return!0;for(;e;){if(t&&e===t)return!1;if("none"===getComputedStyle(e).display)return!0;e=e.parentElement}return!1},S=(e,t)=>{if(e&&e.focus){const n=document.activeElement;e.focus({preventScroll:!0}),e!==n&&(e=>e instanceof HTMLInputElement&&"select"in e)(e)&&t&&e.select()}};function g(e,t){const n=[...e],s=e.indexOf(t);return-1!==s&&n.splice(s,1),n}const k=(()=>{let e=[];return{push:t=>{const n=e[0];n&&t!==n&&n.pause(),e=g(e,t),e.unshift(t)},remove:t=>{var n,s;e=g(e,t),null==(s=null==(n=e[0])?void 0:n.resume)||s.call(n)}}})(),F={cancelable:!0,bubbles:!1},K=Symbol("elFocusTrap");var N=d(o({name:"ElFocusTrap",inheritAttrs:!1,props:{loop:Boolean,trapped:Boolean,focusTrapEl:Object,focusStartEl:{type:[Object,String],default:"first"}},emits:["focusAfterTrapped","focusAfterReleased","focusin","focusout","focusout-prevented","release-requested"],setup(o,{emit:d}){const l=r();let v,m;(o=>{const r=e=>{const t=e;t.key===s.esc&&L.forEach((e=>e(t)))};e((()=>{0===L.length&&document.addEventListener("keydown",r),t&&L.push(o)})),n((()=>{L=L.filter((e=>e!==o)),0===L.length&&t&&document.removeEventListener("keydown",r)}))})((e=>{o.trapped&&!E.paused&&d("release-requested",e)}));const E={paused:!1,pause(){this.paused=!0},resume(){this.paused=!1}},y=e=>{if(!o.loop&&!o.trapped)return;if(E.paused)return;const{key:t,altKey:n,ctrlKey:r,metaKey:a,currentTarget:u,shiftKey:c}=e,{loop:i}=o,f=t===s.tab&&!n&&!r&&!a,l=document.activeElement;if(f&&l){const t=u,[n,s]=(e=>{const t=T(e);return[b(t,e),b(t.reverse(),e)]})(t);n&&s?c||l!==s?c&&[n,t].includes(l)&&(e.preventDefault(),i&&S(s,!0),d("focusout-prevented")):(e.preventDefault(),i&&S(n,!0),d("focusout-prevented")):l===t&&(e.preventDefault(),d("focusout-prevented"))}};a(K,{focusTrapRef:l,onKeydown:y}),u((()=>o.focusTrapEl),(e=>{e&&(l.value=e)}),{immediate:!0}),u([l],(([e],[t])=>{e&&(e.addEventListener("keydown",y),e.addEventListener("focusin",g),e.addEventListener("focusout",N)),t&&(t.removeEventListener("keydown",y),t.removeEventListener("focusin",g),t.removeEventListener("focusout",N))}));const h=e=>{d("focusAfterTrapped",e)},w=e=>d("focusAfterReleased",e),g=e=>{const t=c(l);if(!t)return;const n=e.target,s=n&&t.contains(n);s&&d("focusin",e),E.paused||o.trapped&&(s?m=n:S(m,!0))},N=e=>{const t=c(l);if(!E.paused&&t)if(o.trapped){const n=e.relatedTarget;p(n)||t.contains(n)||setTimeout((()=>{!E.paused&&o.trapped&&S(m,!0)}),0)}else{const n=e.target;n&&t.contains(n)||d("focusout",e)}};async function I(){await i();const e=c(l);if(e){k.push(E);const t=document.activeElement;v=t;if(!e.contains(t)){const n=new Event("focus-trap.focus-after-trapped",F);e.addEventListener("focus-trap.focus-after-trapped",h),e.dispatchEvent(n),n.defaultPrevented||i((()=>{let n=o.focusStartEl;f(n)||(S(n),document.activeElement!==n&&(n="first")),"first"===n&&((e,t=!1)=>{const n=document.activeElement;for(const s of e)if(S(s,t),document.activeElement!==n)return})(T(e),!0),document.activeElement!==t&&"container"!==n||S(e)}))}}}function P(){const e=c(l);if(e){e.removeEventListener("focus-trap.focus-after-trapped",h);const t=new Event("focus-trap.focus-after-released",F);e.addEventListener("focus-trap.focus-after-released",w),e.dispatchEvent(t),t.defaultPrevented||S(null!=v?v:document.body,!0),e.removeEventListener("focus-trap.focus-after-released",h),k.remove(E)}}return e((()=>{o.trapped&&I(),u((()=>o.trapped),(e=>{e?I():P()}))})),n((()=>{o.trapped&&P()})),{onKeydown:y}}}),[["render",function(e,t,n,s,o,r){return l(e.$slots,"default",{handleKeydown:e.onKeydown})}],["__file","/home/runner/work/element-plus/element-plus/packages/components/focus-trap/src/focus-trap.vue"]]);export{N as E,K as F,m as a,E as b,y as c,v as o,h as w};
