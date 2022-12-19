import{k as defineComponent,R as useUserStore,r as ref,S as onMounted,a0 as api,P as ElIcon,v as withDirectives,z as createElementBlock,s as createBaseVNode,U as createVNode,q as withCtx,E as toDisplayString,V as pushScopeId,W as popScopeId,D as createTextVNode,Y as useRouter,o as openBlock,F as Fragment,b6 as renderList,p as createBlock,G as createCommentVNode,a1 as ElMessage}from"./index.48f940ee.js";import{v as vLoading}from"./el-loading.ea6ae1cd.js";/* empty css                */import{_ as _export_sfc,a as _sfc_main$1}from"./index.178d681a.js";import{_ as __unplugin_components_9}from"./index.2c00059e.js";import{_ as __unplugin_components_5}from"./index.52c546c4.js";import{_ as __unplugin_components_4}from"./index.de709eff.js";import"./el-tooltip.53c291fe.js";import"./el-popper.6d6f2ca6.js";import"./focus-trap.8a3181f4.js";import"./el-input.41045a8b.js";import"./index.786a6241.js";import"./el-button.d3031f13.js";import"./index.0e0fe8d6.js";var index_vue_vue_type_style_index_0_scoped_true_lang="";const _withScopeId=e=>(pushScopeId("data-v-6b5a4c0c"),e=e(),popScopeId(),e),_hoisted_1=_withScopeId((()=>createBaseVNode("div",{class:"content-title"},"推荐问题",-1))),_hoisted_2={style:{display:"flex","align-items":"flex-start"}},_hoisted_3={class:"box"},_hoisted_4={class:"topbox"},_hoisted_5=_withScopeId((()=>createBaseVNode("div",{class:"title"},"问答小屋",-1))),_hoisted_6=_withScopeId((()=>createBaseVNode("div",{class:"line"},null,-1))),_hoisted_7=_withScopeId((()=>createBaseVNode("div",{class:"photo"},null,-1))),_hoisted_8={class:"tip-txt"},_hoisted_9=createTextVNode(" 解决"),_hoisted_10={class:"num"},_hoisted_11=createTextVNode("个问题 "),_hoisted_12={class:"bottombox"},_hoisted_13=_withScopeId((()=>createBaseVNode("span",null,"我要提问",-1))),_hoisted_14=_withScopeId((()=>createBaseVNode("span",null,"我来回答",-1))),__default__=defineComponent({name:"HomePage"}),_sfc_main=Object.assign(__default__,{setup(__props){const userStore=useUserStore(),data=ref({problemNum:"",userId:userStore.account||"",problems:[],loading:!1,showMoreLoading:!1,showMore:!0}),router=useRouter();function getList(){data.value.loading=!0,api.get("api/getquiz",{params:{sort:"popular",userId:data.value.userId}}).then((res=>{let i=0,length=res.data.quiz_list.length;res.data.quiz_list.forEach((item=>{api.get("api/search_answer",{params:{aid:item.max_like_reply_id,userId:data.value.userId}}).then((answer=>{++i,data.value.problems.push({title:item.title,qid:item.qid,aid:item.max_like_reply_id,username:answer.data.answer_list[0].username,agreeNum:answer.data.answer_list[0].like,hasAgree:answer.data.answer_list[0].is_like,hasStar:item.is_star,answerNum:item.ans_num,sendTime:answer.data.answer_list[0].time.replace("T"," ").split(".")[0],detailInfo:answer.data.answer_list[0].content.replace(eval("/\\\\/g"),"\\").replace(/(。|！|？)/g,"$1\n"),briefDetail:answer.data.answer_list[0].content.substring(0,100).replace(eval("/\\\\/g"),"\\").replace(/(。|！|？)/g,"$1\n")+"...."}),i===length&&(data.value.loading=!1)})).catch((()=>{++i,i===length&&(data.value.loading=!1)}))}))})).catch((()=>{data.value.loading=!1}))}function enterNewPage(e){router.push({name:"detailProblem",params:{id:e}})}function onAgree(e,a){userStore.isLogin?data.value.problems[a].hasAgree?api.get("api/removelike",{params:{aid:e}}).then((e=>{--data.value.problems[a].agreeNum,data.value.problems[a].hasAgree=!data.value.problems[a].hasAgree,ElMessage.success(e.message)})):api.get("api/like",{params:{aid:e}}).then((e=>{++data.value.problems[a].agreeNum,data.value.problems[a].hasAgree=!data.value.problems[a].hasAgree,ElMessage.success(e.message)})):ElMessage.error("当前未登录!!请先登录")}function onCollection(e,a){userStore.isLogin?data.value.problems[a].hasStar?api.get("api/removestar",{params:{qid:e}}).then((e=>{data.value.problems[a].hasStar=!data.value.problems[a].hasStar,ElMessage.success(e.message)})):api.get("api/star",{params:{qid:e}}).then((e=>{data.value.problems[a].hasStar=!data.value.problems[a].hasStar,ElMessage.success(e.message)})):ElMessage.error("当前未登录!!请先登录")}function goPutProblem(){router.push({name:"putQuestion",params:{userId:0}})}function goGetProblem(){router.push({name:"moduleInterface",params:{type:"answer-issues"}})}function showMore(val,callback){data.value.showMoreLoading=!0,api.get("api/getquiz",{params:{sort:"popular",offset:data.value.problems.length,limit:10,userId:data.value.userId}}).then((res=>{let i=0,length=res.data.quiz_list.length,cache=[];length>0?res.data.quiz_list.forEach((item=>{api.get("api/search_answer",{params:{aid:item.max_like_reply_id,userId:data.value.userId}}).then((answer=>{++i,cache.push({title:item.title,qid:item.qid,aid:item.max_like_reply_id,username:answer.data.answer_list[0].username,agreeNum:answer.data.answer_list[0].like,hasAgree:answer.data.answer_list[0].is_like,hasStar:item.is_star,answerNum:item.ans_num,sendTime:answer.data.answer_list[0].time.replace("T"," ").split(".")[0],detailInfo:answer.data.answer_list[0].content.replace(eval("/\\\\/g"),"\\").replace(/(。|！|？)/g,"$1\n"),briefDetail:answer.data.answer_list[0].content.substring(0,100).replace(eval("/\\\\/g"),"\\").replace(/(。|！|？)/g,"$1\n")+"...."}),i===length&&(data.value.problems=data.value.problems.concat(cache),data.value.showMoreLoading=!1)})).catch((()=>{++i,i===length&&(data.value.problems=data.value.problems.concat(cache),data.value.showMoreLoading=!1)}))})):(data.value.showMoreLoading=!1,data.value.showMore=!1)})).catch((()=>data.value.showMoreLoading=!1)),callback(!0)}return onMounted((()=>{data.value.problems=[],getList(),api.get("/api/total").then((e=>{data.value.problemNum=e.data.sum}))})),(e,a)=>{const t=__unplugin_components_4,s=__unplugin_components_5,o=__unplugin_components_9,i=_sfc_main$1,r=ElIcon,l=vLoading;return withDirectives((openBlock(),createElementBlock("div",null,[_hoisted_1,createBaseVNode("div",_hoisted_2,[createVNode(o,{style:{width:"60%","margin-top":"0","margin-left":"8%"}},{default:withCtx((()=>[(openBlock(!0),createElementBlock(Fragment,null,renderList(data.value.problems,((e,a)=>(openBlock(),createBlock(t,{key:a,"problem-id":e.qid,title:e.title,"brief-detail":e.briefDetail,"detail-info":e.detailInfo,"user-name":e.username,"agree-number":e.agreeNum,"has-agree":e.hasAgree,"has-star":e.hasStar,"send-time":e.sendTime,"answer-number":e.answerNum,onEnterNewPage:a=>enterNewPage(e.qid),onOnAgree:t=>onAgree(e.aid,a),onOnCollection:t=>onCollection(e.qid,a),onGoDetail:a=>enterNewPage(e.qid)},null,8,["problem-id","title","brief-detail","detail-info","user-name","agree-number","has-agree","has-star","send-time","answer-number","onEnterNewPage","onOnAgree","onOnCollection","onGoDetail"])))),128)),data.value.showMore?withDirectives((openBlock(),createBlock(s,{key:0,onUnCollaspe:showMore},null,512)),[[l,data.value.showMoreLoading]]):createCommentVNode("",!0)])),_:1}),createBaseVNode("div",_hoisted_3,[createBaseVNode("div",_hoisted_4,[_hoisted_5,_hoisted_6,_hoisted_7,createBaseVNode("div",_hoisted_8,[_hoisted_9,createBaseVNode("p",_hoisted_10,toDisplayString(data.value.problemNum),1),_hoisted_11])]),createBaseVNode("div",_hoisted_12,[createBaseVNode("div",{class:"flex-column",onClick:goPutProblem},[createVNode(r,{class:"icon"},{default:withCtx((()=>[createVNode(i,{name:"ep:info-filled"})])),_:1}),_hoisted_13]),createBaseVNode("div",{class:"flex-column",onClick:goGetProblem},[createVNode(r,{class:"icon"},{default:withCtx((()=>[createVNode(i,{name:"ep:edit"})])),_:1}),_hoisted_14])])])])])),[[l,data.value.loading]])}}});var index=_export_sfc(_sfc_main,[["__scopeId","data-v-6b5a4c0c"]]);export{index as default};
