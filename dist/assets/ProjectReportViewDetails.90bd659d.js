import{a as z,c as W,b as K,d as $}from"./form.181df029.js";import{C as _}from"./index.3bbb47f2.js";import{B as Q}from"./BreadCrumb.9367f10a.js";import{D as X}from"./select-box.029c2d7e.js";import{_ as Y}from"./button.996b9c36.js";import{_ as Z}from"./text-area.c45c04d3.js";import{D as tt,a as et,b as ot,f as it,c as st,d as nt,i as at,e as rt,g as lt,h as ct,l as pt,j as dt,x as ut,k as mt,n as ht,v as ft,u as xt,F as Dt,G as vt,J as gt,K as bt}from"./data-grid.24b081de.js";import{D as yt,a as _t,b as jt}from"./popup.1b1ca625.js";import{n as Rt}from"./notify.250f5449.js";import{R as f}from"./RepositoryFactory.1ead146f.js";import{_ as Bt,a as Ct}from"./index.7b655b97.js";import{r as s,o as Pt,a as wt,F as Ft,c as h,f as t,w as n}from"./vendor.7710df40.js";import"./utils.scroll.55667bed.js";import"./toast.a475c820.js";function It(o){return o!=null&&o!==""}const D="https://kameyo-api.azurewebsites.net",At=`${D}/api/ProjectReportActivity`,St=`${D}/api/ProjectReportDetail`,j=`${D}/api/ProjectReport`,R=f.get("projects"),Gt=f.get("customers"),Tt=f.get("projectReport"),B=f.get("projectReport"),C=f.get("authenticate"),Ot={name:"ActivitiesView",components:{BreadCrumb:Q,DxForm:z,DxSelectBox:X,DxGroupItem:W,DxSimpleItem:K,DxTextArea:Z,DxLabel:$,DxDataGrid:tt,DxColumn:et,DxScrolling:ot,DxRequiredRule:it,DxPager:st,DxPaging:nt,DxFilterRow:at,DxEditing:rt,DxPopup:yt,DxPopupGrid:lt,DxLookup:ct,DxSearchPanel:pt,DxGridForm:dt,DxCustomRule:ut,CustomStore:_,DxButton:Y,DxHeaderFilter:mt,DxExport:ht,DxGrouping:ft,DxGroupPanel:xt,DxPosition:_t,DxToolbarItem:jt,DxSummary:Dt,DxTotalItem:vt,DxColumnChooser:gt,DxColumnFixing:bt},data(){return{project:{},visibleButtonApprove:!1,visibleButtonInvoice:!1,visibleButtonPaid:!1,visibleButtonSendToCustomer:!1,visibleButtonReject:!1,projectForm:{name:"",customerName:"",invoicedDate:"",paidDate:"",customerApprovedDate:""},customer:{},projectReport:{},invoiceData:{invoiceComment:"",realInvoiceDate:new Date},taskActivities:new _({key:"id",load:o=>this.getTaskActivities(o,this.$route.params.id),insert:o=>{},update:(o,e)=>(e.id=o,e.observation==null&&(e.observation=void 0),console.log("valores",o,e),this.sendRequest(`${St}`,"PUT",{values:JSON.stringify(e)})),remove:o=>{}}),searchModeOption:"contains",searchExprOption:"name",searchTimeoutOption:200,minSearchLengthOption:0,showDataBeforeSearchOption:!1,showWhenLoad:!1,isProjectManager:!0,isCustomer:!0,popupVisible:!1,positionOf:"top",emailButtonOptions:{icon:"save",text:"Send",onClick:()=>{const o="Se ha registrado exitosamente";let e={id:this.$route.params.id,state:"F",by:this.userName,realInvoiceDate:this.invoiceData.realInvoiceDate,invoiceComment:this.invoiceData.invoiceComment??""};console.log(e);let a=this.sendRequest(`${j}`,"PUT",{values:JSON.stringify(e)}).then(()=>{console.log("onClick emailButtonOptions",a,e.id,this.invoiceData),this.getProjectReportById(e.id),this.popupVisible=!1,Rt({message:o,position:{my:"center center",at:"center center"}},"success",3e3)})}},closeButtonOptions:{text:"Close",onClick:()=>{this.popupVisible=!1}}}},methods:{sendRequest(o,e="GET",a={}){const r=Object.keys(a).map(i=>`${encodeURIComponent(i)}=${encodeURIComponent(a[i])}`).join("&");return e==="GET"?fetch(`${o}?${r}`,{method:e}).then(i=>i.json().then(l=>{if(i.ok)return l.data;throw l.Message})):fetch(o,{method:e,body:a.values,headers:{"Content-Type":"application/json;charset=UTF-8"}}).then(i=>i.ok?i.text().then(l=>l&&JSON.parse(l)):i.json().then(l=>{throw l.Message}))},getTaskActivities:async function(o,e){console.log("logid",e);let a={};return["skip","take","requireTotalCount","requireGroupCount","sort","filter","totalSummary","group","groupSummary"].forEach(r=>{r in o&&It(o[r])&&(a[r]=JSON.stringify(o[r]))}),console.log(a),this.sendRequest(`${At}/activityControl/${e}`,"GET",a).then(r=>(console.log("sendrequet",r),{data:r,totalCount:r.length}))},validateUser:async function(){const o=Ct();if(o.isAuthenticated){console.log("esta autenticado");const e=o.getAuthenticatedUser;this.userName=e.userName,C.ValidateUser(this.userName,"cliente").then(a=>{this.isCustomer=a.data.isValid}),C.ValidateUser(this.userName,"Administrador de Proyectos").then(a=>{this.isProjectManager=a.data.isValid})}},getProject:async function(o){const{data:e}=await R.Get("ID",o);console.log("dataprojet",e),this.project=e.data[0],this.projectForm.name=this.project.name,this.getCustomer(this.project.customerId)},handleApprove:async function(o,e){let a={id:this.$route.params.id,state:e,by:this.userName};if(e=="F"){this.popupVisible=!0;return}console.log(o,e);let r=this.sendRequest(`${j}`,"PUT",{values:JSON.stringify(a)}).then(()=>{console.log("handleApprove",r,a.id),this.getProjectReportById(a.id)});return r},getCustomer:async function(o){const{data:e}=await Gt.Get("ID",o);this.customer=e.data[0],this.projectForm.customerName=this.customer.name},getProjectReportById:async function(o){if(o!=null){const{data:e}=await Tt.Get("ID",o);console.log("datos",e),this.projectReport=e.data[0],console.log("projecto",this.projectReport,B),this.getProject(this.projectReport.projectId),console.log(this.projectReport),this.projectForm.invoicedDate=this.projectReport.invoicedDate,this.projectForm.customerApprovedDate=this.projectReport.customerApprovedDate,this.projectForm.paidDate=this.projectReport.paidDate,this.projectForm.status=B.GetStatus(this.projectReport.state).value,this.projectForm.projectReportDate=this.projectReport.projectReportDate,this.projectReport.state=="G"?(this.visibleButtonApprove=!1,this.visibleButtonInvoice=!1,this.visibleButtonPaid=!1,this.visibleButtonSendToCustomer=!0,this.visibleButtonReject=!1):this.projectReport.state=="C"?(this.visibleButtonApprove=!0,this.visibleButtonInvoice=!1,this.visibleButtonPaid=!1,this.visibleButtonSendToCustomer=!1,this.visibleButtonReject=!0):this.projectReport.state=="A"?(this.visibleButtonApprove=!1,this.visibleButtonInvoice=!0,this.visibleButtonPaid=!1,this.visibleButtonSendToCustomer=!1,this.visibleButtonReject=!1):this.projectReport.state=="R"?(this.visibleButtonApprove=!1,this.visibleButtonInvoice=!1,this.visibleButtonPaid=!1,this.visibleButtonSendToCustomer=!0,this.visibleButtonReject=!1):this.projectReport.state=="F"?(this.visibleButtonApprove=!1,this.visibleButtonInvoice=!1,this.visibleButtonPaid=!0,this.visibleButtonSendToCustomer=!1,this.visibleButtonReject=!1):this.projectReport.state=="P"&&(this.visibleButtonApprove=!1,this.visibleButtonInvoice=!1,this.visibleButtonPaid=!1,this.visibleButtonSendToCustomer=!1,this.visibleButtonReject=!1),e.totalCount=e.data.length,this.showWhenLoad=!0,this.loadIndicatorVisible=!1,console.log("moounted",["G"].includes(this.projectReport.state),this.projectReport)}},getProjectById:async function(o){const{data:e}=await R.Get("ID",o);this.project=e.data[0],e.totalCount=e.data.length,this.showWhenLoad=!0,this.loadIndicatorVisible=!1}},async mounted(){let o=this.$route.params.id;await this.validateUser(),console.log("moounted",["G"].includes(this.project.state),this.project),await this.getProjectReportById(o)}},kt={id:"main-content"},Mt={class:"container-fluid"},Et={class:"block-header"},Nt={class:"row clearfix"},Ut={class:"col-md-12 cont"};function Vt(o,e,a,r,i,l){const P=s("bread-crumb"),c=s("DxLabel"),p=s("DxSimpleItem"),x=s("DxGroupItem"),m=s("DxButton"),v=s("DxForm"),w=s("DxHeaderFilter"),F=s("DxColumnChooser"),I=s("DxColumnFixing"),A=s("DxGroupPanel"),S=s("DxGrouping"),G=s("DxExport"),T=s("DxSearchPanel"),O=s("DxFilterRow"),k=s("DxScrolling"),M=s("DxPaging"),E=s("DxPager"),N=s("DxPopupGrid"),g=s("DxItem"),U=s("DxGridForm"),V=s("DxEditing"),d=s("DxColumn"),b=s("DxTotalItem"),H=s("DxSummary"),L=s("DxDataGrid"),q=s("DxPosition"),y=s("DxToolbarItem"),J=s("DxPopup");return Pt(),wt(Ft,null,[h("div",kt,[h("div",Mt,[h("div",Et,[t(P)]),h("div",Nt,[h("div",Ut,[t(v,{"form-data":i.projectForm,items:["name"],"col-count":2},{default:n(()=>[t(x,{caption:"Informaci\xF3n del Proyecto","col-count":2},{default:n(()=>[t(p,{"editor-options":{readOnly:!0},"data-field":"customerName"},{default:n(()=>[t(c,{text:"Cliente"})]),_:1}),t(p,{"editor-options":{readOnly:!0},"data-field":"name"},{default:n(()=>[t(c,{text:"Proyecto"})]),_:1}),t(p,{"editor-options":{readOnly:!0},"data-field":"status"},{default:n(()=>[t(c,{text:"Estado"})]),_:1}),t(p,{"editor-options":{readOnly:!0},"data-field":"projectReportDate","editor-type":"dxDateBox","data-type":"datetime"},{default:n(()=>[t(c,{text:"Fecha de Reporte","editor-type":"dxDateBox"})]),_:1})]),_:1}),t(x,{caption:"Fechas del Proyecto","col-count":2},{default:n(()=>[t(p,{"editor-options":{readOnly:!0,displayFormat:"yyyy-MM-dd"},"data-field":"customerApprovedDate","editor-type":"dxDateBox"},{default:n(()=>[t(c,{text:"Aprobaci\xF3n del cliente"})]),_:1}),t(p,{"editor-options":{readOnly:!0,displayFormat:"yyyy-MM-dd"},"data-field":"invoicedDate","data-type":"datetime","editor-type":"dxDateBox"},{default:n(()=>[t(c,{text:"Facturaci\xF3n","editor-type":"dxDateBox"})]),_:1}),t(p,{"editor-options":{readOnly:!0,displayFormat:"yyyy-MM-dd"},"data-field":"paidDate","editor-type":"dxDateBox"},{default:n(()=>[t(c,{text:"Pago","editor-type":"dxDateBox"})]),_:1})]),_:1}),t(x,{"col-count":3},{default:n(()=>[t(m,{text:"Enviar a cliente",type:"success","styling-mode":"contained",onClick:e[0]||(e[0]=u=>l.handleApprove(o.e,"C")),visible:i.isProjectManager&&i.visibleButtonSendToCustomer},null,8,["visible"]),t(m,{width:120,text:"Aprobar",type:"success","styling-mode":"contained",onClick:e[1]||(e[1]=u=>l.handleApprove(o.e,"A")),visible:i.isCustomer&&i.visibleButtonApprove},null,8,["visible"]),t(m,{text:"Regresar con observaciones",type:"danger","styling-mode":"contained",onClick:e[2]||(e[2]=u=>l.handleApprove(o.e,"R")),visible:i.isCustomer&&i.visibleButtonReject},null,8,["visible"]),t(m,{width:120,text:"Facturar",type:"success","styling-mode":"contained",onClick:e[3]||(e[3]=u=>l.handleApprove(o.e,"F")),visible:i.isProjectManager&&i.visibleButtonInvoice},null,8,["visible"]),t(m,{width:120,text:"Pagar",type:"success","styling-mode":"contained",onClick:e[4]||(e[4]=u=>l.handleApprove(o.e,"P")),visible:i.isProjectManager&&i.visibleButtonPaid},null,8,["visible"])]),_:1})]),_:1},8,["form-data"]),t(L,{id:"dataGridProject","data-source":i.taskActivities,"show-borders":!0,"repaint-changes-only":!0,"remote-operations":!0,"key-expr":"id"},{default:n(()=>[t(w,{visible:!0}),t(F,{enabled:!0}),t(I,{enabled:!0}),t(A,{visible:!0}),t(S,{"auto-expand-all":!0}),t(G,{enabled:!0,"allow-export-selected-data":!0}),t(T,{visible:!0,width:240,placeholder:"Buscar..."}),t(O,{visible:!0}),t(k,{"row-rendering-mode":"virtual"}),t(M,{"page-size":10}),t(E,{visible:!0,"allowed-page-sizes":[10,20,50],"display-mode":o.displayMode,"show-page-size-selector":!0,"show-info":!1,"show-navigation-buttons":!0},null,8,["display-mode"]),t(V,{"refresh-mode":o.full,"allow-adding":!1,"allow-updating":["G","C"].includes(this.projectReport.state),"allow-deleting":!1,mode:"popup"},{default:n(()=>[t(N,{"show-title":!0,width:700,height:525,title:"Informaci\xF3n del Proyecto"}),t(U,null,{default:n(()=>[t(g,{"col-count":1,"col-span":2,"item-type":"group"},{default:n(()=>[t(g,{"data-field":"name"})]),_:1})]),_:1})]),_:1},8,["refresh-mode","allow-updating"]),t(d,{width:150,"data-field":"description",caption:"Descripcion","allow-editing":!1}),t(d,{width:150,"data-field":"consultant",caption:"Consultor","allow-editing":!1}),t(d,{"data-field":"startDate","data-type":"date",format:"yyyy-MM-dd HH:mm:ss",caption:"Inicio","allow-editing":!1}),t(d,{"data-field":"endDate","data-type":"date",format:"yyyy-MM-dd HH:mm:ss",caption:"Fin","allow-editing":!1}),t(d,{"data-field":"factor",caption:"Factor Pond.","allow-editing":!1}),t(d,{"data-field":"totaTimeHour",caption:"Tiempo en Horas","allow-editing":!1}),t(d,{"data-field":"totalTimeHourApproved",caption:"Horas Aprobadas","allow-editing":i.isProjectManager&&this.projectReport.state!="C"},null,8,["allow-editing"]),t(d,{"data-field":"observation",caption:"Observaci\xF3n","editor-type":"dxTextArea","allow-editing":i.isCustomer&&["C","R"].indexOf(this.projectReport.state)>-1},null,8,["allow-editing"]),t(d,{"data-field":"isBillable",caption:"Es Facturable?","allow-editing":i.isProjectManager&&["C","R"].indexOf(this.projectReport.state)>-1},null,8,["allow-editing"]),t(H,null,{default:n(()=>[t(b,{column:"totaTimeHour","summary-type":"sum"}),t(b,{column:"totalTimeHourApproved","summary-type":"sum"})]),_:1})]),_:1},8,["data-source"])])])])]),t(J,{visible:i.popupVisible,"onUpdate:visible":e[6]||(e[6]=u=>i.popupVisible=u),"drag-enabled":!1,"close-on-outside-click":!0,"show-close-button":!1,"show-title":!0,width:500,height:450,container:".dx-viewport",title:"Registro de Facturaci\xF3n"},{default:n(()=>[t(q,{at:"center",my:"center",of:i.positionOf,"onUpdate:of":e[5]||(e[5]=u=>i.positionOf=u)},null,8,["of"]),t(y,{widget:"dxButton",toolbar:"bottom",location:"before",options:i.emailButtonOptions},null,8,["options"]),t(y,{widget:"dxButton",toolbar:"bottom",location:"after",options:i.closeButtonOptions},null,8,["options"]),t(v,{"form-data":i.invoiceData},{default:n(()=>[t(p,{"editor-options":{},"data-field":"realInvoiceDate"},{default:n(()=>[t(c,{text:"Fecha de Factura"})]),_:1}),t(p,{"editor-options":{},"editor-type":"dxTextArea","data-field":"invoiceComment"},{default:n(()=>[t(c,{text:"Comentario"})]),_:1})]),_:1},8,["form-data"])]),_:1},8,["visible"])],64)}var oe=Bt(Ot,[["render",Vt]]);export{oe as default};
