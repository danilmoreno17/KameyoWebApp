import{a as k,b as O,c as j,d as N}from"./form.181df029.js";import{D as T,a as q,b as L,f as M,c as V,d as z,i as H,e as A,g as U,h as W,l as J,j as K,x as Q,k as X,n as Y,v as Z,u as $}from"./data-grid.24b081de.js";import{B as ee}from"./BreadCrumb.9367f10a.js";import{D as te}from"./select-box.029c2d7e.js";import{C as oe}from"./index.3bbb47f2.js";import{R as u}from"./RepositoryFactory.1ead146f.js";import{_ as ae}from"./button.996b9c36.js";import{c as i,r as o,o as ie,a as re,f as e,w as s}from"./vendor.7710df40.js";import{_ as ne}from"./index.7b655b97.js";const Fe=u.get("financialParticipation"),se=u.get("subsidiaries"),l=u.get("productivityTable");function le(t){return t!=null&&t!==""}const de={name:"DirectParticipation",components:{BreadCrumb:ee,DxForm:k,DxButton:ae,DxSimpleItem:O,DxGroupItem:j,DxLabel:N,DxDataGrid:T,DxColumn:q,DxScrolling:L,DxSelectBox:te,DxRequiredRule:M,DxPager:V,DxPaging:z,DxFilterRow:H,DxEditing:A,DxPopup:U,DxLookup:W,DxSearchPanel:J,DxGridForm:K,DxCustomRule:Q,DxHeaderFilter:X,DxExport:Y,DxGrouping:Z,DxGroupPanel:$},data(){return{tablaPorcentajes:{data:[],totalCount:0},dataSource:{},table:{table:2},subsidiaryId:0,subsidiaries:[],searchModeOption:"contains",searchExprOption:"name",searchTimeoutOption:200,minSearchLengthOption:0,showDataBeforeSearchOption:!1,displayMode:"full"}},methods:{subsidiaryChange:async function(t){console.log(this.subsidiaryId),this.loadDataSource()},getSubsidiaries:async function(){const{data:t}=await se.GetWithPagination({});this.subsidiaries=t.data},loadDataSource:async function(){this.dataSource=new oe({key:"id",load:t=>{if(this.subsidiaryId!=null){console.log("porcentajes",this.tablaPorcentajes.data);let r={};return["skip","take","requireTotalCount","requireGroupCount","sort","filter","totalSummary","group","groupSummary"].forEach(n=>{n in t&&le(t[n])&&(r[n]=JSON.stringify(t[n]))}),l.GetWithFilterSubidiary(r,this.subsidiaryId).then(n=>(console.log(n),this.tablaPorcentajes.data=n.data.data.data,this.tablaPorcentajes.data.sort((d,a)=>d.value>a.value?1:d.value<a.value?-1:0),this.tablaPorcentajes))}},insert:t=>(t.subsidiaryId=this.subsidiaryId,console.log("insert",t),l.Create(t)),update:(t,r)=>(r.id=t,l.Update(r)),remove:t=>l.Delete(values),byKey:t=>{}})}},async mounted(){console.log("hola"),await this.getSubsidiaries()},onExporting(t){}},ce={id:"main-content"},ue={class:"container-fluid"},pe={class:"block-header"},xe={class:"row cont"},me={class:"col-md-12"},_e={class:"dx-field"},De=i("div",{class:"dx-field-label"},"Subsidiaria",-1),he={class:"dx-field-value"},ge={class:"row clearfix"},fe={class:"col-md-12 cont"};function be(t,r,n,d,a,D){const h=o("bread-crumb"),g=o("DxSelectBox"),f=o("DxGroupItem"),b=o("DxForm"),y=o("DxHeaderFilter"),v=o("DxGroupPanel"),w=o("DxGrouping"),P=o("DxExport"),S=o("DxSearchPanel"),G=o("DxFilterRow"),p=o("DxScrolling"),x=o("DxPaging"),R=o("DxPager"),C=o("DxPopup"),c=o("DxItem"),I=o("DxFormGrid"),F=o("DxEditing"),m=o("DxRequiredRule"),_=o("DxColumn"),E=o("DxDataGrid");return ie(),re("div",ce,[i("div",ue,[i("div",pe,[e(h)]),i("div",xe,[i("div",me,[e(b,{"form-data":a.table,"col-count":1},{default:s(()=>[e(f,{"col-count":2},{default:s(()=>[i("div",_e,[De,i("div",he,[e(g,{items:a.subsidiaries,placeholder:"Seleccionar...",onValueChanged:D.subsidiaryChange,"display-expr":"name",value:a.subsidiaryId,"onUpdate:value":r[0]||(r[0]=B=>a.subsidiaryId=B),"value-expr":"id",id:"idproject","search-enabled":!0,"search-mode":a.searchModeOption,"search-expr":a.searchExprOption,"search-timeout":a.searchTimeoutOption,"min-search-length":a.minSearchLengthOption,"show-data-before-search":a.showDataBeforeSearchOption},null,8,["items","onValueChanged","value","search-mode","search-expr","search-timeout","min-search-length","show-data-before-search"])])])]),_:1})]),_:1},8,["form-data"])])]),i("div",ge,[i("div",fe,[e(E,{id:"dataGridActivities","data-source":a.dataSource,"show-borders":!0,"column-auto-width":!0,"repaint-changes-only":!0,"remote-operations":!0,onExporting:t.onExporting,onInitNewRow:t.initNewRow},{default:s(()=>[e(y,{visible:!0}),e(v,{visible:!0}),e(w,{"auto-expand-all":!0}),e(P,{enabled:!0,"allow-export-selected-data":!0}),e(S,{visible:!0,width:240,placeholder:"Buscar..."}),e(G,{visible:!0}),e(p,{"row-rendering-mode":"virtual"}),e(x,{"page-size":10}),e(R,{visible:!0,"allowed-page-sizes":[10,20,50],"display-mode":a.displayMode,"show-page-size-selector":!0,"show-info":!1,"show-navigation-buttons":!0},null,8,["display-mode"]),e(F,{"refresh-mode":t.refreshMode,"allow-updating":!0,"allow-adding":this.subsidiaryId!=0,"allow-deleting":!0,mode:"popup"},{default:s(()=>[e(p,{"row-rendering-mode":"virtual"}),e(x,{"page-size":10}),e(C,{"show-title":!0,width:400,height:200,title:"Registro de Actividades"}),e(I,null,{default:s(()=>[e(c,{"col-count":1,"col-span":1,"item-type":"group"},{default:s(()=>[e(c,{"data-field":"value"}),e(c,{"data-field":"percent"})]),_:1})]),_:1})]),_:1},8,["refresh-mode","allow-adding"]),e(_,{width:250,"data-field":"value",caption:"Value"},{default:s(()=>[e(m)]),_:1}),e(_,{"data-field":"percent",caption:"Percent"},{default:s(()=>[e(m)]),_:1})]),_:1},8,["data-source","onExporting","onInitNewRow"])])])])])}var Ee=ne(de,[["render",be]]);export{Ee as default};
