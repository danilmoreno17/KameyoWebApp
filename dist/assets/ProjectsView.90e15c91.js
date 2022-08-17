import{D as M,a as L,b as N,c as W,d as B,e as q,f as A,g as J,h as O,i as z,k as Y,j as U,n as K,t as Q,u as X,v as Z,l as $,x as ee}from"./data-grid.24b081de.js";import{B as te}from"./BreadCrumb.9367f10a.js";import{D as ae}from"./form.181df029.js";import{C as oe}from"./index.3bbb47f2.js";import{c as ie}from"./CellLinkTemplate.75b044c2.js";import{e as ne,F as re}from"./FileSaver.min.34d9f25a.js";import{e as de}from"./excel_exporter.6e076f26.js";import{R as p}from"./RepositoryFactory.1ead146f.js";import{r as o,o as le,a as se,c as m,f as t,w as i}from"./vendor.7710df40.js";import{_ as ce}from"./index.7b655b97.js";const D=p.get("catalogs"),ue=p.get("subsidiaries"),h=p.get("customers"),y=p.get("contacts"),f=p.get("projects"),pe=await h.GetWithPagination({}),me=await y.GetWithPagination({});function fe(e){return e!=null&&e!==""}const xe={name:"ProjectsView",components:{DxDataGrid:M,DxColumn:L,DxScrolling:N,DxPager:W,DxPaging:B,DxEditing:q,DxRequiredRule:A,DxPopup:J,DxLookup:O,DxFilterRow:z,DxHeaderFilter:Y,DxForm:U,DxItem:ae,cellLink:ie,BreadCrumb:te,DxExport:K,DxSelection:Q,DxGroupPanel:X,DxGrouping:Z,DxSearchPanel:$,DxCustomRule:ee},data(){return{dataSource:new oe({key:"id",load:e=>{let a={};return["skip","take","requireTotalCount","requireGroupCount","sort","filter","totalSummary","group","groupSummary"].forEach(r=>{r in e&&fe(e[r])&&(a[r]=JSON.stringify(e[r]))}),this.getProjects(a)},insert:e=>this.createProject(e),update:(e,a)=>(a.id=e,this.updateProject(a)),remove:e=>this.deleteProject(e)}),projectType:{},projectCategory:{},projectState:{},customer:{},contact:{},subsidiary:{},setSubsidiaryValue(e,a){e.customerId=null,e.mainContactId=null,this.defaultSetCellValue(e,a)},setCustomerValue(e,a){e.mainContactId=null,this.defaultSetCellValue(e,a)},setFullDates(e,a,r){if(r.startDate!=null&&a!=null){const c=Math.abs(a-new Date(r.startDate)),d=Math.ceil(c/(1e3*60*60));e.durationHour=d}if(r.endDate!=null&&a!=null){const c=Math.abs(new Date(r.endDate)-a),d=Math.ceil(c/(1e3*60*60));e.durationHour=d}this.defaultSetCellValue(e,a)},setCostHourMenProject(e,a){var r=Math.abs(a);this.defaultSetCellValue(e,r)}}},methods:{getProjects:async function(e){const{data:a}=await f.GetWithFilter(e);return a.data},createProject:async function(e){const{data:a}=await f.Create(e);return a},updateProject:async function(e){const{data:a}=await f.Update(e);return a},deleteProject:async function(e){const{data:a}=await f.Delete(e);return a},getFilteredCustomers:e=>({store:pe.data.data,filter:e.data?["subsidiaryId","=",e.data.subsidiaryId]:null}),getFilteredContacts:e=>({store:me.data.data,filter:e.data?["customerId","=",e.data.customerId]:null}),getSubsidiaries:async function(){const{data:e}=await ue.GetWithPagination({});this.subsidiary=e.data},getCustomers:async function(){const{data:e}=await h.GetWithPagination({});this.customer=e.data},getContacts:async function(){const{data:e}=await y.GetWithPagination({});this.contact=e.data},getProjectTypes:async function(){const{data:e}=await D.Get("NAME","PROJECTTYPE");this.projectType=e.data},getProjectCategories:async function(){const{data:e}=await D.Get("NAME","PROJECTCATEGORY");this.projectCategory=e.data},getProjectStates:async function(){const{data:e}=await D.Get("NAME","PROJECTSTATE");this.projectState=e.data},getCostHourMenCustomer:function(e){return e.customerId!=null&&Object.keys(this.customer).length!=0?this.customer.filter(a=>a.id==e.customerId)[0].costHourMen:0},onExporting(e){const a=new ne.exports.Workbook,r=a.addWorksheet("Proyectos");de({component:e.component,worksheet:r,autoFilterEnabled:!0}).then(()=>{a.xlsx.writeBuffer().then(c=>{re.exports.saveAs(new Blob([c],{type:"application/octet-stream"}),"Proyectos.xlsx")})}),e.cancel=!0},startDateValidation:function(e){return e.data.startDate!=null&&e.data.endDate!=null?e.data.startDate<e.data.endDate:!0},endDateValidation:function(e){return e.data.startDate!=null&&e.data.endDate!=null?e.data.endDate>e.data.startDate:!0},closeDateValidation:function(e){return e.data.endDate!=null&&e.data.closeDate!=null?e.data.endDate<e.data.closeDate:!0}},async created(){await this.getSubsidiaries(),await this.getCustomers(),await this.getContacts(),await this.getProjectTypes(),await this.getProjectCategories(),await this.getProjectStates()}},De={id:"main-content"},_e={class:"container-fluid"},ge={class:"block-header"},he={class:"row clearfix"},ye={class:"col-md-12"};function Pe(e,a,r,c,d,s){const P=o("bread-crumb"),C=o("DxHeaderFilter"),w=o("DxGroupPanel"),b=o("DxGrouping"),j=o("DxExport"),v=o("DxSelection"),S=o("DxSearchPanel"),k=o("DxFilterRow"),F=o("DxScrolling"),I=o("DxPaging"),E=o("DxPager"),G=o("DxPopup"),n=o("DxItem"),R=o("DxForm"),H=o("DxEditing"),_=o("DxRequiredRule"),l=o("DxColumn"),u=o("DxLookup"),x=o("DxCustomRule"),V=o("cellLink"),T=o("DxDataGrid");return le(),se("div",De,[m("div",_e,[m("div",ge,[t(P)]),m("div",he,[m("div",ye,[t(T,{id:"dataGridProject","data-source":d.dataSource,"show-borders":!0,"repaint-changes-only":!0,"remote-operations":!0,"key-expr":"id",onExporting:s.onExporting},{"cell-link-template":i(({data:g})=>[t(V,{"cell-data":g,routePath:{name:"projectView",params:{id:g.data.id}}},null,8,["cell-data","routePath"])]),default:i(()=>[t(C,{visible:!0}),t(w,{visible:!0}),t(b,{"auto-expand-all":!0}),t(j,{enabled:!0,"allow-export-selected-data":!0}),t(v,{mode:"multiple"}),t(S,{visible:!0,width:240,placeholder:"Search..."}),t(k,{visible:!0}),t(F,{"row-rendering-mode":"virtual"}),t(I,{"page-size":10}),t(E,{visible:!0,"allowed-page-sizes":[10,20,50],"display-mode":e.displayMode,"show-page-size-selector":!0,"show-info":!1,"show-navigation-buttons":!0},null,8,["display-mode"]),t(H,{"refresh-mode":e.full,"allow-adding":!0,"allow-deleting":!0,mode:"popup"},{default:i(()=>[t(G,{"show-title":!0,width:700,height:525,title:"Informaci\xF3n del Proyecto"}),t(R,null,{default:i(()=>[t(n,{"col-count":2,"col-span":2,"item-type":"group"},{default:i(()=>[t(n,{"data-field":"name"}),t(n,{"data-field":"subsidiaryId"}),t(n,{"data-field":"customerId"}),t(n,{"data-field":"mainContactId"}),t(n,{"data-field":"description"}),t(n,{"data-field":"catalogProjectTypeId"}),t(n,{"data-field":"catalogProjectCategoryId"}),t(n,{"data-field":"catalogProjectStateId"}),t(n,{"data-field":"costHourMenCustomer"}),t(n,{"data-field":"costHourMenProject"})]),_:1}),t(n,{"col-count":2,"col-span":2,"item-type":"group",caption:"Tiempos del proyecto"},{default:i(()=>[t(n,{"data-field":"startDate"}),t(n,{"data-field":"endDate"}),t(n,{"data-field":"durationHour"}),t(n,{"data-field":"closeDate"})]),_:1})]),_:1})]),_:1},8,["refresh-mode"]),t(l,{width:150,"data-field":"name",caption:"Nombre","cell-template":"cell-link-template"},{default:i(()=>[t(_)]),_:1}),t(l,{width:150,"data-field":"subsidiaryId",caption:"Subsidiaria","set-cell-value":d.setSubsidiaryValue},{default:i(()=>[t(u,{"data-source":d.subsidiary,"value-expr":"id","display-expr":"name"},null,8,["data-source"])]),_:1},8,["set-cell-value"]),t(l,{width:150,"data-field":"customerId",caption:"Cliente","set-cell-value":d.setCustomerValue},{default:i(()=>[t(u,{"data-source":s.getFilteredCustomers,"value-expr":"id","display-expr":"name"},null,8,["data-source"])]),_:1},8,["set-cell-value"]),t(l,{width:150,"data-field":"mainContactId",caption:"Contacto Principal"},{default:i(()=>[t(u,{"data-source":s.getFilteredContacts,"value-expr":"id","display-expr":"names"},null,8,["data-source"])]),_:1}),t(l,{width:200,"data-field":"description",caption:"Descripci\xF3n"},{default:i(()=>[t(_)]),_:1}),t(l,{width:0,"data-field":"catalogProjectTypeId",caption:"Tipo de Proyecto"},{default:i(()=>[t(u,{"data-source":d.projectType,"value-expr":"id","display-expr":"value"},null,8,["data-source"])]),_:1}),t(l,{width:0,"data-field":"catalogProjectCategoryId",caption:"Categoria de Proyecto"},{default:i(()=>[t(u,{"data-source":d.projectCategory,"value-expr":"id","display-expr":"value"},null,8,["data-source"])]),_:1}),t(l,{width:0,"data-field":"catalogProjectStateId",caption:"Estado de Proyecto"},{default:i(()=>[t(u,{"data-source":d.projectState,"value-expr":"id","display-expr":"value"},null,8,["data-source"])]),_:1}),t(l,{width:150,"data-field":"startDate",caption:"Fecha de Inicio","data-type":"datetime","set-cell-value":d.setFullDates},{default:i(()=>[t(x,{"validation-callback":s.startDateValidation,message:"La fecha de inicio no puede ser mayor o igual a la fecha de fin."},null,8,["validation-callback"])]),_:1},8,["set-cell-value"]),t(l,{width:150,"data-field":"endDate",caption:"Fecha de Fin","data-type":"datetime","set-cell-value":d.setFullDates},{default:i(()=>[t(x,{"validation-callback":s.endDateValidation,message:"La fecha de fin no puede ser menor o igual a la fecha de inicio."},null,8,["validation-callback"])]),_:1},8,["set-cell-value"]),t(l,{width:100,"allow-editing":!1,"data-field":"durationHour",caption:"Duraci\xF3n","data-type":"number"}),t(l,{width:150,"data-field":"closeDate",caption:"Fecha de Cierre","data-type":"datetime"},{default:i(()=>[t(x,{"validation-callback":s.closeDateValidation,message:"La fecha de cierre no puede ser menor o igual a la fecha de fin."},null,8,["validation-callback"])]),_:1}),t(l,{width:0,"calculate-cell-value":s.getCostHourMenCustomer,"allow-editing":!1,"data-field":"costHourMenCustomer","data-type":"number",format:"currency",caption:"Costo Hora Cliente"},null,8,["calculate-cell-value"]),t(l,{width:0,"set-cell-value":d.setCostHourMenProject,"data-field":"costHourMenProject","data-type":"number",format:"currency",caption:"Costo Hora Proyecto"},null,8,["set-cell-value"])]),_:1},8,["data-source","onExporting"])])])])])}var Ge=ce(xe,[["render",Pe]]);export{Ge as default};