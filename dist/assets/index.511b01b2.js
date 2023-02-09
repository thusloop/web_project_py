import{m as e,bx as t,a6 as o,ab as n,A as a,ay as s,a$ as l,Z as r,bs as i,aZ as c,c9 as u,a_ as d,ax as p,I as m,aS as f,b as v,R as g,d as b,u as y,s as h,g as E,b1 as C,E as x,bB as M,l as T,bl as w,a0 as B,X as k,bA as S,Y as I,a1 as A,_ as R,aU as _,o as L,a as P,w as O,q as z,v as Y,p as D,n as H,ad as j,B as N,c as V,r as $,f as F,y as K,z as U,C as X,ae as G,V as q,ca as Z,cb as W,bu as J,az as Q,bo as ee}from"./index.10862972.js";import{E as te}from"./el-button.b516a904.js";import{E as oe}from"./el-input.2ed03bb1.js";import{o as ne}from"./aria.75ec5909.js";import{o as ae,a as se,E as le}from"./focus-trap.f06a5d9a.js";import{i as re}from"./validator.9b90cba6.js";import{u as ie}from"./index.bf82bf90.js";import{u as ce}from"./index.8b11fa54.js";import{t as ue}from"./event.4982e83d.js";import{a as de}from"./scroll.aaa4d4ca.js";var pe=(e=>(e[e.TEXT=1]="TEXT",e[e.CLASS=2]="CLASS",e[e.STYLE=4]="STYLE",e[e.PROPS=8]="PROPS",e[e.FULL_PROPS=16]="FULL_PROPS",e[e.HYDRATE_EVENTS=32]="HYDRATE_EVENTS",e[e.STABLE_FRAGMENT=64]="STABLE_FRAGMENT",e[e.KEYED_FRAGMENT=128]="KEYED_FRAGMENT",e[e.UNKEYED_FRAGMENT=256]="UNKEYED_FRAGMENT",e[e.NEED_PATCH=512]="NEED_PATCH",e[e.DYNAMIC_SLOTS=1024]="DYNAMIC_SLOTS",e[e.HOISTED=-1]="HOISTED",e[e.BAIL=-2]="BAIL",e))(pe||{});const me=(a,s,l)=>{let r={offsetX:0,offsetY:0};const i=e=>{const t=e.clientX,o=e.clientY,{offsetX:s,offsetY:l}=r,i=a.value.getBoundingClientRect(),c=i.left,u=i.top,d=i.width,p=i.height,m=document.documentElement.clientWidth,f=document.documentElement.clientHeight,v=-c+s,g=-u+l,b=m-c-d+s,y=f-u-p+l,h=e=>{const i=Math.min(Math.max(s+e.clientX-t,v),b),c=Math.min(Math.max(l+e.clientY-o,g),y);r={offsetX:i,offsetY:c},a.value.style.transform=`translate(${n(i)}, ${n(c)})`},E=()=>{document.removeEventListener("mousemove",h),document.removeEventListener("mouseup",E)};document.addEventListener("mousemove",h),document.addEventListener("mouseup",E)},c=()=>{s.value&&a.value&&s.value.removeEventListener("mousedown",i)};e((()=>{t((()=>{l.value?s.value&&a.value&&s.value.addEventListener("mousedown",i):c()}))})),o((()=>{c()}))},fe=e=>{if(a(e)||ue("[useLockscreen]","You need to pass a ref param to this function"),!s||l(document.body,"el-popup-parent--hidden"))return;let t=0,o=!1,n="0",p=0;const m=()=>{d(document.body,"el-popup-parent--hidden"),o&&(document.body.style.paddingRight=n)};r(e,(e=>{if(!e)return void m();o=!l(document.body,"el-popup-parent--hidden"),o&&(n=document.body.style.paddingRight,p=Number.parseInt(i(document.body,"paddingRight"),10)),t=de();const a=document.documentElement.clientHeight<document.body.scrollHeight,s=i(document.body,"overflowY");t>0&&(a||"scroll"===s)&&o&&(document.body.style.paddingRight=`${p+t}px`),c(document.body,"el-popup-parent--hidden")})),u((()=>m()))},ve=e=>{if(!e)return{onClick:p,onMousedown:p,onMouseup:p};let t=!1,o=!1;return{onClick:n=>{t&&o&&e(n),t=o=!1},onMousedown:e=>{t=e.target===e.currentTarget},onMouseup:e=>{o=e.target===e.currentTarget}}},ge=[],be=e=>{if(0===ge.length)return;const t=ge[ge.length-1]["_trap-focus-children"];if(t.length>0&&e.code===f.tab){if(1===t.length)return e.preventDefault(),void(document.activeElement!==t[0]&&t[0].focus());const o=e.shiftKey,n=e.target===t[0],a=e.target===t[t.length-1];n&&o&&(e.preventDefault(),t[t.length-1].focus()),a&&!o&&(e.preventDefault(),t[0].focus())}},ye={beforeMount(e){e["_trap-focus-children"]=ne(e),ge.push(e),ge.length<=1&&ae(document,"keydown",be)},updated(e){m((()=>{e["_trap-focus-children"]=ne(e)}))},unmounted(){ge.shift(),0===ge.length&&se(document,"keydown",be)}};const he=b({name:"ElOverlay",props:v({mask:{type:Boolean,default:!0},customMaskEvent:{type:Boolean,default:!1},overlayClass:{type:g([String,Array,Object])},zIndex:{type:g([String,Number])}}),emits:{click:e=>e instanceof MouseEvent},setup(e,{slots:t,emit:o}){const n=y("overlay"),{onClick:a,onMousedown:s,onMouseup:l}=ve(e.customMaskEvent?void 0:e=>{o("click",e)});return()=>e.mask?h("div",{class:[n.b(),e.overlayClass],style:{zIndex:e.zIndex},onClick:a,onMousedown:s,onMouseup:l},[E(t,"default")],pe.STYLE|pe.CLASS|pe.PROPS,["onClick","onMouseup","onMousedown"]):C("div",{class:e.overlayClass,style:{zIndex:e.zIndex,position:"fixed",top:"0px",right:"0px",bottom:"0px",left:"0px"}},[E(t,"default")])}}),Ee=b({name:"ElMessageBox",directives:{TrapFocus:ye},components:{ElButton:te,ElFocusTrap:le,ElInput:oe,ElOverlay:he,ElIcon:x,...M},inheritAttrs:!1,props:{buttonSize:{type:String,validator:re},modal:{type:Boolean,default:!0},lockScroll:{type:Boolean,default:!0},showClose:{type:Boolean,default:!0},closeOnClickModal:{type:Boolean,default:!0},closeOnPressEscape:{type:Boolean,default:!0},closeOnHashChange:{type:Boolean,default:!0},center:Boolean,draggable:Boolean,roundButton:{default:!1,type:Boolean},container:{type:String,default:"body"},boxType:{type:String,default:""}},emits:["vanish","action"],setup(t,{emit:n}){const{t:s}=ie(),l=y("message-box"),i=T(!1),{nextZIndex:c}=w(),u=B({autofocus:!0,beforeClose:null,callback:null,cancelButtonText:"",cancelButtonClass:"",confirmButtonText:"",confirmButtonClass:"",customClass:"",customStyle:{},dangerouslyUseHTMLString:!1,distinguishCancelAndClose:!1,icon:"",inputPattern:null,inputPlaceholder:"",inputType:"text",inputValue:null,inputValidator:null,inputErrorMessage:"",message:null,modalFade:!0,modalClass:"",showCancelButton:!1,showConfirmButton:!0,type:"",title:void 0,showInput:!1,action:"",confirmButtonLoading:!1,cancelButtonLoading:!1,confirmButtonDisabled:!1,editorErrorMessage:"",validateError:!1,zIndex:c()}),d=k((()=>{const e=u.type;return{[l.bm("icon",e)]:e&&S[e]}})),p=ce(),f=ce(),v=I(k((()=>t.buttonSize)),{prop:!0,form:!0,formItem:!0}),g=k((()=>u.icon||S[u.type]||"")),b=k((()=>!!u.message)),h=T(),E=T(),C=T(),x=T(),M=T(),R=k((()=>u.confirmButtonClass));r((()=>u.inputValue),(async e=>{await m(),"prompt"===t.boxType&&null!==e&&Y()}),{immediate:!0}),r((()=>i.value),(e=>{var o,n;e&&("prompt"!==t.boxType&&(u.autofocus?C.value=null!=(n=null==(o=M.value)?void 0:o.$el)?n:h.value:C.value=h.value),u.zIndex=c()),"prompt"===t.boxType&&(e?m().then((()=>{var e;x.value&&x.value.$el&&(u.autofocus?C.value=null!=(e=D())?e:h.value:C.value=h.value)})):(u.editorErrorMessage="",u.validateError=!1))}));const _=k((()=>t.draggable));function L(){i.value&&(i.value=!1,m((()=>{u.action&&n("action",u.action)})))}me(h,E,_),e((async()=>{await m(),t.closeOnHashChange&&ae(window,"hashchange",L)})),o((()=>{t.closeOnHashChange&&se(window,"hashchange",L)}));const P=()=>{t.closeOnClickModal&&z(u.distinguishCancelAndClose?"close":"cancel")},O=ve(P),z=e=>{var o;("prompt"!==t.boxType||"confirm"!==e||Y())&&(u.action=e,u.beforeClose?null==(o=u.beforeClose)||o.call(u,e,u,L):L())},Y=()=>{if("prompt"===t.boxType){const e=u.inputPattern;if(e&&!e.test(u.inputValue||""))return u.editorErrorMessage=u.inputErrorMessage||s("el.messagebox.error"),u.validateError=!0,!1;const t=u.inputValidator;if("function"==typeof t){const e=t(u.inputValue);if(!1===e)return u.editorErrorMessage=u.inputErrorMessage||s("el.messagebox.error"),u.validateError=!0,!1;if("string"==typeof e)return u.editorErrorMessage=e,u.validateError=!0,!1}}return u.editorErrorMessage="",u.validateError=!1,!0},D=()=>{const e=x.value.$refs;return e.input||e.textarea},H=()=>{z("close")};return t.lockScroll&&fe(i),((e,t)=>{let o;r((()=>e.value),(e=>{var n,s;e?(o=document.activeElement,a(t)&&(null==(s=(n=t.value).focus)||s.call(n))):o.focus()}))})(i),{...A(u),ns:l,overlayEvent:O,visible:i,hasMessage:b,typeClass:d,contentId:p,inputId:f,btnSize:v,iconComponent:g,confirmButtonClasses:R,rootRef:h,focusStartRef:C,headerRef:E,inputRef:x,confirmRef:M,doClose:L,handleClose:H,onCloseRequested:()=>{t.closeOnPressEscape&&H()},handleWrapperClick:P,handleInputEnter:e=>{if("textarea"!==u.inputType)return e.preventDefault(),z("confirm")},handleAction:z,t:s}}}),Ce=["aria-label","aria-describedby"],xe=["aria-label"],Me=["id"];var Te=R(Ee,[["render",function(e,t,o,n,a,s){const l=_("el-icon"),r=_("close"),i=_("el-input"),c=_("el-button"),u=_("el-focus-trap"),d=_("el-overlay");return L(),P(G,{name:"fade-in-linear",onAfterLeave:t[11]||(t[11]=t=>e.$emit("vanish")),persisted:""},{default:O((()=>[z(h(d,{"z-index":e.zIndex,"overlay-class":[e.ns.is("message-box"),e.modalClass],mask:e.modal},{default:O((()=>[D("div",{role:"dialog","aria-label":e.title,"aria-modal":"true","aria-describedby":e.showInput?void 0:e.contentId,class:H(`${e.ns.namespace.value}-overlay-message-box`),onClick:t[8]||(t[8]=(...t)=>e.overlayEvent.onClick&&e.overlayEvent.onClick(...t)),onMousedown:t[9]||(t[9]=(...t)=>e.overlayEvent.onMousedown&&e.overlayEvent.onMousedown(...t)),onMouseup:t[10]||(t[10]=(...t)=>e.overlayEvent.onMouseup&&e.overlayEvent.onMouseup(...t))},[h(u,{loop:"",trapped:e.visible,"focus-trap-el":e.rootRef,"focus-start-el":e.focusStartRef,onReleaseRequested:e.onCloseRequested},{default:O((()=>[D("div",{ref:"rootRef",class:H([e.ns.b(),e.customClass,e.ns.is("draggable",e.draggable),{[e.ns.m("center")]:e.center}]),style:j(e.customStyle),tabindex:"-1",onClick:t[7]||(t[7]=N((()=>{}),["stop"]))},[null!==e.title&&void 0!==e.title?(L(),V("div",{key:0,ref:"headerRef",class:H(e.ns.e("header"))},[D("div",{class:H(e.ns.e("title"))},[e.iconComponent&&e.center?(L(),P(l,{key:0,class:H([e.ns.e("status"),e.typeClass])},{default:O((()=>[(L(),P($(e.iconComponent)))])),_:1},8,["class"])):F("v-if",!0),D("span",null,K(e.title),1)],2),e.showClose?(L(),V("button",{key:0,type:"button",class:H(e.ns.e("headerbtn")),"aria-label":e.t("el.messagebox.close"),onClick:t[0]||(t[0]=t=>e.handleAction(e.distinguishCancelAndClose?"close":"cancel")),onKeydown:t[1]||(t[1]=U(N((t=>e.handleAction(e.distinguishCancelAndClose?"close":"cancel")),["prevent"]),["enter"]))},[h(l,{class:H(e.ns.e("close"))},{default:O((()=>[h(r)])),_:1},8,["class"])],42,xe)):F("v-if",!0)],2)):F("v-if",!0),D("div",{id:e.contentId,class:H(e.ns.e("content"))},[D("div",{class:H(e.ns.e("container"))},[e.iconComponent&&!e.center&&e.hasMessage?(L(),P(l,{key:0,class:H([e.ns.e("status"),e.typeClass])},{default:O((()=>[(L(),P($(e.iconComponent)))])),_:1},8,["class"])):F("v-if",!0),e.hasMessage?(L(),V("div",{key:1,class:H(e.ns.e("message"))},[E(e.$slots,"default",{},(()=>[e.dangerouslyUseHTMLString?(L(),P($(e.showInput?"label":"p"),{key:1,for:e.showInput?e.inputId:void 0,innerHTML:e.message},null,8,["for","innerHTML"])):(L(),P($(e.showInput?"label":"p"),{key:0,for:e.showInput?e.inputId:void 0},{default:O((()=>[X(K(e.dangerouslyUseHTMLString?"":e.message),1)])),_:1},8,["for"]))]))],2)):F("v-if",!0)],2),z(D("div",{class:H(e.ns.e("input"))},[h(i,{id:e.inputId,ref:"inputRef",modelValue:e.inputValue,"onUpdate:modelValue":t[2]||(t[2]=t=>e.inputValue=t),type:e.inputType,placeholder:e.inputPlaceholder,"aria-invalid":e.validateError,class:H({invalid:e.validateError}),onKeydown:U(e.handleInputEnter,["enter"])},null,8,["id","modelValue","type","placeholder","aria-invalid","class","onKeydown"]),D("div",{class:H(e.ns.e("errormsg")),style:j({visibility:e.editorErrorMessage?"visible":"hidden"})},K(e.editorErrorMessage),7)],2),[[Y,e.showInput]])],10,Me),D("div",{class:H(e.ns.e("btns"))},[e.showCancelButton?(L(),P(c,{key:0,loading:e.cancelButtonLoading,class:H([e.cancelButtonClass]),round:e.roundButton,size:e.btnSize,onClick:t[3]||(t[3]=t=>e.handleAction("cancel")),onKeydown:t[4]||(t[4]=U(N((t=>e.handleAction("cancel")),["prevent"]),["enter"]))},{default:O((()=>[X(K(e.cancelButtonText||e.t("el.messagebox.cancel")),1)])),_:1},8,["loading","class","round","size"])):F("v-if",!0),z(h(c,{ref:"confirmRef",type:"primary",loading:e.confirmButtonLoading,class:H([e.confirmButtonClasses]),round:e.roundButton,disabled:e.confirmButtonDisabled,size:e.btnSize,onClick:t[5]||(t[5]=t=>e.handleAction("confirm")),onKeydown:t[6]||(t[6]=U(N((t=>e.handleAction("confirm")),["prevent"]),["enter"]))},{default:O((()=>[X(K(e.confirmButtonText||e.t("el.messagebox.confirm")),1)])),_:1},8,["loading","class","round","disabled","size"]),[[Y,e.showConfirmButton]])],2)],6)])),_:3},8,["trapped","focus-trap-el","focus-start-el","onReleaseRequested"])],42,Ce)])),_:3},8,["z-index","overlay-class","mask"]),[[Y,e.visible]])])),_:3})}],["__file","/home/runner/work/element-plus/element-plus/packages/components/message-box/src/index.vue"]]);const we=new Map,Be=(e,t)=>{const o=document.createElement("div");e.onVanish=()=>{W(null,o),we.delete(a)},e.onAction=t=>{const o=we.get(a);let s;s=e.showInput?{value:a.inputValue,action:t}:t,e.callback?e.callback(s,n.proxy):"cancel"===t||"close"===t?e.distinguishCancelAndClose&&"cancel"!==t?o.reject("close"):o.reject("cancel"):o.resolve(s)};const n=((e,t,o=null)=>{const n=C(Te,e);return n.appContext=o,W(n,t),document.body.appendChild(t.firstElementChild),n.component})(e,o,t),a=n.proxy;for(const s in e)J(e,s)&&!J(a.$props,s)&&(a[s]=e[s]);return r((()=>a.message),((e,t)=>{Z(e)?n.slots.default=()=>[e]:Z(t)&&!Z(e)&&delete n.slots.default}),{immediate:!0}),a.visible=!0,a};function ke(e,t=null){if(!s)return Promise.reject();let o;return q(e)||Z(e)?e={message:e}:o=e.callback,new Promise(((n,a)=>{const s=Be(e,null!=t?t:ke._context);we.set(s,{options:e,callback:o,resolve:n,reject:a})}))}const Se={alert:{closeOnPressEscape:!1,closeOnClickModal:!1},confirm:{showCancelButton:!0},prompt:{showCancelButton:!0,showInput:!0}};["alert","confirm","prompt"].forEach((e=>{ke[e]=function(e){return(t,o,n,a)=>{let s;return Q(o)?(n=o,s=""):s=ee(o)?"":o,ke(Object.assign({title:s,message:t,type:"",...Se[e]},n,{boxType:e}),a)}}(e)})),ke.close=()=>{we.forEach(((e,t)=>{t.doClose()})),we.clear()},ke._context=null;const Ie=ke;Ie.install=e=>{Ie._context=e._context,e.config.globalProperties.$msgbox=Ie,e.config.globalProperties.$messageBox=Ie,e.config.globalProperties.$alert=Ie.alert,e.config.globalProperties.$confirm=Ie.confirm,e.config.globalProperties.$prompt=Ie.prompt};const Ae=Ie;export{he as E,fe as a,ve as b,Ae as c,me as u};
