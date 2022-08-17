import{a as V,b as N,c as O,d as H,D as M}from"./form.181df029.js";import{D as U,a as q,b as z,f as J,c as W,d as K,i as Y,e as Q,g as X,h as Z,j as $}from"./data-grid.24b081de.js";import{D as tt,a as et}from"./load-indicator.7a18b1f7.js";import{_ as at,D as ot}from"./toolbar.58f20e48.js";import{B as st}from"./BreadCrumb.9367f10a.js";import{R as m}from"./RepositoryFactory.1ead146f.js";import{C as it}from"./index.3bbb47f2.js";import{r as o,o as D,a as rt,c as x,f as t,w as s,b as f,e as h}from"./vendor.7710df40.js";import{_ as nt}from"./index.7b655b97.js";import"./toast.a475c820.js";const y=m.get("catalogs"),g=m.get("projectTasks"),dt=m.get("projectResources"),u=m.get("taskActivities"),ct={components:{DxForm:V,DxSimpleItem:N,DxGroupItem:O,DxLabel:H,DxItem:M,DxToolbar:at,DxItemToolbar:ot,DxToast:tt,DxLoadIndicator:et,DxDataGrid:U,DxColumn:q,DxScrolling:z,DxRequiredRule:J,DxPager:W,DxPaging:K,DxFilterRow:Y,DxEditing:Q,DxPopup:X,DxLookup:Z,DxGridForm:$,BreadCrumb:st},data(){return{projectTask:{},projectTaskType:{},projectTaskState:{},employees:{},taskActivities:new it({key:"id",load:()=>this.getTaskActivities(),insert:e=>this.createTaskActivity(e),update:(e,a)=>(a.id=e,this.updateTaskActivity(a)),remove:e=>this.deleteTaskActivity(e)}),saveButtonOptions:{text:"Grabar",onClick:async()=>{let e={id:this.projectTask.id,projectId:this.projectTask.projectId,name:this.projectTask.name,description:this.projectTask.description,catalogTasktTypeId:this.projectTask.catalogTasktTypeId,order:this.projectTask.order,startDate:this.projectTask.startDate,endDate:this.projectTask.endDate,closeDate:this.projectTask.closeDate,durationHour:this.projectTask.durationHour,progress:this.projectTask.progress,catalogTaskStateId:this.projectTask.catalogTaskStateId};this.updateProjectTask(e)}},showWhenLoad:!1,isVisible:!1,message:"",type:"info",loadIndicatorVisible:!1}},methods:{getProjectTaskById:async function(e){this.loadIndicatorVisible=!0;const{data:a}=await g.Get("ID",e);this.projectTask=a.data[0],this.showWhenLoad=!0,this.loadIndicatorVisible=!1},getTaskActivities:async function(){const{data:e}=await u.Get("PROJECTTASKID",this.projectTask.id);return e.totalCount=e.data.length,e},createTaskActivity:async function(e){e.projectTaskId=this.projectTask.id;const{data:a}=await u.Create(e);return a},updateTaskActivity:async function(e){const{data:a}=await u.Update(e);return a},deleteTaskActivity:async function(e){const{data:a}=await u.Delete(e);return a},getTaskTypes:async function(){const{data:e}=await y.Get("NAME","PROJECTTASKTYPE");this.projectTaskType=e.data},getTaskStates:async function(){const{data:e}=await y.Get("NAME","PROJECTTASKSTATE");this.projectTaskState=e.data},getEmployees:async function(){const{data:e}=await dt.Get("PROJECTID",this.projectTask.projectId);this.employees=e.data},updateProjectTask:async function(e){const{data:a}=await g.Update(e).then(function(c){return c}).catch(function(c){return c.response});this.type=a.succeeded?"success":"error",this.message=a.succeeded?"La Tarea fue actualizada exitosamente.":a.errors[0].message,this.isVisible=!0},setFullDates:function(e){const a=Math.abs(new Date(this.projectTask.endDate)-new Date(this.projectTask.startDate)),c=Math.ceil(a/(1e3*60*60));this.projectTask.durationHour=c}},async created(){var e=this.$route.params.id;await this.getProjectTaskById(e).then(()=>this.getTaskTypes()).then(()=>this.getTaskStates()).then(()=>this.getEmployees())}},pt={id:"main-content"},lt={class:"container-fluid"},ut={class:"block-header"},mt={class:"row clearfix"};function Dt(e,a,c,xt,i,_){const k=o("bread-crumb"),I=o("DxItemToolbar"),j=o("DxToolbar"),r=o("DxLabel"),n=o("DxSimpleItem"),T=o("DxGroupItem"),w=o("DxForm"),b=o("DxFilterRow"),v=o("DxScrolling"),P=o("DxPaging"),R=o("DxPager"),E=o("DxPopup"),d=o("DxItem"),F=o("DxGridForm"),S=o("DxEditing"),C=o("DxLookup"),A=o("DxRequiredRule"),p=o("DxColumn"),G=o("DxDataGrid"),L=o("DxToast"),B=o("DxLoadIndicator");return D(),rt("div",pt,[x("div",lt,[x("div",ut,[t(k)]),x("div",mt,[t(j,null,{default:s(()=>[t(I,{options:i.saveButtonOptions,location:"after","locate-in-menu":"auto",widget:"dxButton"},null,8,["options"])]),_:1}),i.showWhenLoad?(D(),f(w,{key:0,"form-data":i.projectTask,"col-count":2},{default:s(()=>[t(T,{caption:"Informaci\xF3n de la Tarea","col-count":2},{default:s(()=>[t(n,{"data-field":"projectName"},{default:s(()=>[t(r,{text:"Proyecto"})]),_:1}),t(n,{"data-field":"name"},{default:s(()=>[t(r,{text:"Nombre"})]),_:1}),t(n,{"data-field":"description",caption:"Descripci\xF3n"},{default:s(()=>[t(r,{text:"Descripci\xF3n"})]),_:1}),t(n,{"editor-options":{valueExpr:"id",searchEnabled:!0,displayExpr:"value",items:i.projectTaskType},"data-field":"catalogTaskTypeId","editor-type":"dxSelectBox"},{default:s(()=>[t(r,{text:"Tipo de Tarea"})]),_:1},8,["editor-options"]),t(n,{"editor-options":{valueExpr:"id",searchEnabled:!0,displayExpr:"value",items:i.projectTaskState},"data-field":"catalogTaskStateId","editor-type":"dxSelectBox"},{default:s(()=>[t(r,{text:"Estado de Tarea"})]),_:1},8,["editor-options"]),t(n,{"data-field":"order",caption:"Orden"},{default:s(()=>[t(r,{text:"Orden"})]),_:1})]),_:1}),t(T,{caption:"Tiempos de Tarea","col-count":2},{default:s(()=>[t(n,{"editor-options":{type:"datetime",onValueChanged:_.setFullDates},"data-field":"startDate","editor-type":"dxDateBox"},{default:s(()=>[t(r,{text:"Fecha de Inicio"})]),_:1},8,["editor-options"]),t(n,{"editor-options":{type:"datetime",onValueChanged:_.setFullDates},"data-field":"endDate","editor-type":"dxDateBox"},{default:s(()=>[t(r,{text:"Fecha de Fin"})]),_:1},8,["editor-options"]),t(n,{"editor-options":{disabled:!0},"data-field":"durationHour"},{default:s(()=>[t(r,{text:"Duraci\xF3n"})]),_:1}),t(n,{"data-field":"closeDate","editor-type":"dxDateBox"},{default:s(()=>[t(r,{text:"Fecha de Cierre"})]),_:1})]),_:1}),t(n,{"data-field":"progress"},{default:s(()=>[t(r,{text:"Progreso"})]),_:1})]),_:1},8,["form-data"])):h("",!0),i.showWhenLoad?(D(),f(G,{key:1,id:"dataGridTaskActivity","data-source":i.taskActivities,"show-borders":!0,"repaint-changes-only":!0,"remote-operations":!0,"key-expr":"id"},{default:s(()=>[t(b,{visible:!0}),t(v,{"row-rendering-mode":"virtual"}),t(P,{"page-size":10}),t(R,{visible:!0,"allowed-page-sizes":[10,20,50],"display-mode":e.displayMode,"show-page-size-selector":!0,"show-info":!1,"show-navigation-buttons":!0},null,8,["display-mode"]),t(S,{"refresh-mode":e.full,"allow-updating":!0,"allow-adding":!0,"allow-deleting":!0,mode:"popup"},{default:s(()=>[t(E,{"show-title":!0,width:700,height:525,title:"Informaci\xF3n de la Actividad"}),t(F,null,{default:s(()=>[t(d,{"col-count":1,"col-span":2,"item-type":"group"},{default:s(()=>[t(d,{"data-field":"employeeId"}),t(d,{"data-field":"description"})]),_:1}),t(d,{"col-count":2,"col-span":2,"item-type":"group",caption:"Tiempos de la actividad"},{default:s(()=>[t(d,{"data-field":"startDate"}),t(d,{"data-field":"endDate"}),t(d,{"data-field":"totalTimeHour"})]),_:1})]),_:1})]),_:1},8,["refresh-mode"]),t(p,{width:150,"data-field":"employeeId",caption:"Empleado"},{default:s(()=>[t(C,{"data-source":i.employees,"value-expr":"employeeId","display-expr":"employeName"},null,8,["data-source"]),t(A)]),_:1}),t(p,{width:0,"data-field":"projectTaskId",caption:"Tarea"}),t(p,{width:200,"data-field":"description",caption:"Descripci\xF3n"}),t(p,{width:150,"data-field":"startDate",caption:"Fecha de Inicio","data-type":"datetime"}),t(p,{width:150,"data-field":"endDate",caption:"Fecha de Fin","data-type":"datetime"}),t(p,{width:100,"data-field":"totalTimeHour",caption:"Duraci\xF3n","data-type":"number"})]),_:1},8,["data-source"])):h("",!0),t(L,{visible:i.isVisible,"onUpdate:visible":a[0]||(a[0]=l=>i.isVisible=l),message:i.message,"onUpdate:message":a[1]||(a[1]=l=>i.message=l),type:i.type,"onUpdate:type":a[2]||(a[2]=l=>i.type=l)},null,8,["visible","message","type"]),t(B,{id:"large-indicator",height:60,width:60,visible:i.loadIndicatorVisible},null,8,["visible"])])])])}var bt=nt(ct,[["render",Dt]]);export{bt as default};