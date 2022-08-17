import{D as k,a as M,b as A,f as O,c as L,i as U,d as V,e as j,r as nt,g as q,h as B,j as z,s as ot,k as it,l as rt,m as lt,n as dt,t as st,u as ct,v as ut,w as pt}from"./data-grid.24b081de.js";import{D as H}from"./form.181df029.js";import{B as mt}from"./BreadCrumb.9367f10a.js";import{C as Y}from"./index.3bbb47f2.js";import{R as y}from"./RepositoryFactory.1ead146f.js";import{r as n,o as W,a as J,f as t,w as i,c as w}from"./vendor.7710df40.js";import{_ as K}from"./index.7b655b97.js";import{c as xt}from"./CellLinkTemplate.75b044c2.js";import{e as gt,F as Dt}from"./FileSaver.min.34d9f25a.js";import{e as _t}from"./excel_exporter.6e076f26.js";const ft="https://kameyo-api.azurewebsites.net",N=y.get("catalogs"),f=y.get("contacts"),qt=`${ft}/api/Contact`,Bt=await N.Get("NAME","AREA"),zt=await N.Get("NAME","DEPARTMEN"),Ht=await N.Get("NAME","POSITION");const yt={components:{DxDataGrid:k,DxColumn:M,DxScrolling:A,DxRequiredRule:O,DxPager:L,DxFilterRow:U,DxPaging:V,DxEditing:j,DxEmailRule:nt,DxPopup:q,DxLookup:B,DxForm:z,DxItem:H,DxPatternRule:ot},props:{templateData:{type:Object,default:()=>{}}},data(){const{id:e}=this.templateData.data;return{dataSource:new Y({key:"id",load:()=>this.getContacts(),insert:a=>this.createContact(a),update:(a,l)=>(l.id=a,this.updateContact(l)),remove:a=>this.deleteContact(a)}),jefe:{},area:{},department:{},position:{},pattern:/^\(\d{3}\) \d{3}-\d{4}$/i}},methods:{sendRequest(e,a="GET",l={}){const g=Object.keys(l).map(o=>`${encodeURIComponent(o)}=${encodeURIComponent(l[o])}`).join("&");return console.log("params",g),a==="GET"?fetch(`${e}?${g}`,{method:a}).then(o=>o.json().then(s=>{if(o.ok)return s.data;throw s.Message})):fetch(e,{method:a,body:l.values,headers:{"Content-Type":"application/json;charset=UTF-8"}}).then(o=>o.ok?o.text().then(s=>s&&JSON.parse(s)):o.json().then(s=>{throw s.Message}))},getContacts:async function(){const{data:e}=await f.Get("CUSTOMERID",this.templateData.data.id);return e.totalCount=e.data.length,e},createContact:async function(e){e.customerId=this.templateData.data.id;const{data:a}=await f.Create(e);return a},updateContact:async function(e){const{data:a}=await f.Update(e);return a},deleteContact:async function(e){const{data:a}=await f.Delete(e);return a},getAreas:async function(){const{data:e}=await catalogsRepository.Get("NAME","AREA");this.area=e.data},getDepartments:async function(){const{data:e}=await catalogsRepository.Get("NAME","DEPARTMEN");this.department=e.data},getPositions:async function(){const{data:e}=await catalogsRepository.Get("NAME","POSITION");this.position=e.data},getParentContacts:async function(){const{data:e}=await f.Get("PARENTID","NULL");this.jefe=e.data}},async created(){await this.getAreas(),await this.getDepartments(),await this.getPositions(),await this.getParentContacts()}};function ht(e,a,l,g,o,s){const R=n("DxFilterRow"),p=n("DxScrolling"),I=n("DxPaging"),E=n("DxPager"),b=n("DxPopup"),c=n("DxItem"),v=n("DxForm"),P=n("DxEditing"),D=n("DxLookup"),u=n("DxColumn"),_=n("DxRequiredRule"),S=n("DxEmailRule"),r=n("DxPatternRule"),G=n("DxDataGrid");return W(),J("div",null,[t(G,{id:"dataGridContacts","data-source":o.dataSource,"show-borders":!0,"key-expr":"id"},{default:i(()=>[t(R,{visible:!0}),t(p,{"row-rendering-mode":"virtual"}),t(I,{"page-size":10}),t(E,{visible:!0,"allowed-page-sizes":[10,20,50],"display-mode":e.displayMode,"show-page-size-selector":!0,"show-info":!1,"show-navigation-buttons":!0},null,8,["display-mode"]),t(P,{"allow-updating":!0,"allow-adding":!0,"allow-deleting":!0,mode:"popup"},{default:i(()=>[t(b,{"show-title":!0,width:700,height:525,title:"Contact Info"}),t(v,null,{default:i(()=>[t(c,{"col-count":2,"col-span":2,"item-type":"group"},{default:i(()=>[t(c,{"data-field":"parentId"}),t(c,{"data-field":"names"}),t(c,{"data-field":"lastName"}),t(c,{"data-field":"area"}),t(c,{"data-field":"department"}),t(c,{"data-field":"position"}),t(c,{"data-field":"email"}),t(c,{"data-field":"phoneOffice"}),t(c,{"data-field":"phoneOfficeExt"}),t(c,{"data-field":"phoneMobile"})]),_:1})]),_:1})]),_:1}),t(u,{width:150,"data-field":"parentId",caption:"Jefe"},{default:i(()=>[t(D,{"data-source":o.jefe,"value-expr":"id","display-expr":"names"},null,8,["data-source"])]),_:1}),t(u,{width:0,"data-field":"customerId",caption:"Cliente"}),t(u,{width:150,"data-field":"names",caption:"Nombres"},{default:i(()=>[t(_)]),_:1}),t(u,{width:150,"data-field":"lastName",caption:"Apellidos"}),t(u,{width:0,"data-field":"area",caption:"Area"},{default:i(()=>[t(D,{"data-source":o.area,"value-expr":"id","display-expr":"value"},null,8,["data-source"])]),_:1}),t(u,{width:0,"data-field":"department",caption:"Departamento"},{default:i(()=>[t(D,{"data-source":o.department,"value-expr":"id","display-expr":"value"},null,8,["data-source"])]),_:1}),t(u,{width:150,"data-field":"position",caption:"Posicion"},{default:i(()=>[t(D,{"data-source":o.position,"value-expr":"id","display-expr":"value"},null,8,["data-source"])]),_:1}),t(u,{width:200,"data-field":"email",caption:"Correo Elect."},{default:i(()=>[t(_),t(S)]),_:1}),t(u,{width:0,"data-field":"phoneOffice",caption:"Telefono"},{default:i(()=>[t(_),t(r,{pattern:o.pattern,message:'El n\xFAmero de telefono debe tener el siguiente formato:  "(555) 555-5555" !'},null,8,["pattern"])]),_:1}),t(u,{width:0,"data-field":"phoneOfficeExt",caption:"Ext.","data-type":"number"}),t(u,{width:150,"data-field":"phoneMobile",caption:"Movil"},{default:i(()=>[t(r,{pattern:o.pattern,message:'El n\xFAmero de telefono debe tener el siguiente formato:  "(555) 555-5555" !'},null,8,["pattern"])]),_:1})]),_:1},8,["data-source"])])}var wt=K(yt,[["render",ht]]);const x=y.get("catalogs"),C=y.get("customers"),Ct=y.get("subsidiaries"),Rt=await x.Get("NAME","COUNTRIES"),T=await x.Get("NAME","STATES"),F=await x.Get("NAME","CITY");function It(e){return e!=null&&e!==""}const Et={name:"ClientsView",components:{BreadCrumb:mt,DxDataGrid:k,DxScrolling:A,DxPaging:V,DxPager:L,DxEditing:j,DxPopup:q,DxForm:z,DxItem:H,DxColumn:M,DxLookup:B,DxFilterRow:U,DxHeaderFilter:it,DxSearchPanel:rt,DxMasterDetail:lt,cellLink:xt,DetailClient:wt,DxRequiredRule:O,DxExport:dt,DxSelection:st,DxGroupPanel:ct,DxGrouping:ut,DxRangeRule:pt},data(){return{dataSource:new Y({key:"id",load:e=>{let a={};return["skip","take","requireTotalCount","requireGroupCount","sort","filter","totalSummary","group","groupSummary"].forEach(l=>{l in e&&It(e[l])&&(a[l]=JSON.stringify(e[l]))}),this.getClients(a)},insert:e=>this.createClient(e),update:(e,a)=>(a.id=e,this.updateClient(a)),remove:e=>this.deleteClient(e)}),country:Rt.data.data,state:T.data.data,city:F.data.data,industrytype:{},industrysubtype:{},currency:{},subsidiary:{},catalog:{},setCountryValue(e,a){e.catalogRegionStateId=null,e.catalogRegionCityId=null,this.defaultSetCellValue(e,a)},setStateValue(e,a){e.catalogRegionCityId=null,this.defaultSetCellValue(e,a)},minDay:1,maxDay:31}},methods:{onEditorPreparing(e){e.parentType==="dataRow"&&e.dataField},getClients:async function(e){const{data:a}=await C.GetWithFilter(e);return a.data},createClient:async function(e){const{data:a}=await C.Create(e);return a},updateClient:async function(e){const{data:a}=await C.Update(e);return a},deleteClient:async function(e){const{data:a}=await C.Delete(e);return a},getIndustryTpes:async function(){const{data:e}=await x.Get("NAME","INDUSTRYTYPE");this.industrytype=e.data},getIndustrySubtypes:async function(){const{data:e}=await x.Get("NAME","INDUSTRYSUBTYPE");this.industrysubtype=e.data},getCurrencies:async function(){const{data:e}=await x.Get("NAME","CURRENCY");this.currency=e.data},getSubsidiaries:async function(){const{data:e}=await Ct.GetWithPagination({});this.subsidiary=e.data},getCatalogs:async function(){const{data:e}=await x.Get("NAME","IDENTIFICATIONTYPE");this.catalog=e.data},getFilteredStates:e=>({store:T.data.data,filter:e.data?["parentId","=",e.data.catalogRegionCountryId]:null}),getFilteredCities:e=>({store:F.data.data,filter:e.data?["parentId","=",e.data.catalogRegionStateId]:null}),onExporting(e){const a=new gt.exports.Workbook,l=a.addWorksheet("Clientes");_t({component:e.component,worksheet:l,autoFilterEnabled:!0}).then(()=>{a.xlsx.writeBuffer().then(g=>{Dt.exports.saveAs(new Blob([g],{type:"application/octet-stream"}),"Clientes.xlsx")})}),e.cancel=!0}},async created(){await this.getIndustryTpes().then(()=>this.getIndustrySubtypes()).then(()=>this.getCurrencies()).then(()=>this.getSubsidiaries()).then(()=>this.getCatalogs())}},bt={id:"main-content"},vt={class:"container-fluid"},Pt={class:"block-header"},St={class:"row clearfix"},Gt={class:"col-md-12"};function Nt(e,a,l,g,o,s){const R=n("bread-crumb"),p=n("DxHeaderFilter"),I=n("DxGroupPanel"),E=n("DxGrouping"),b=n("DxExport"),c=n("DxSelection"),v=n("DxSearchPanel"),P=n("DxFilterRow"),D=n("DxPaging"),u=n("DxScrolling"),_=n("DxPager"),S=n("DxPopup"),r=n("DxItem"),G=n("DxForm"),Q=n("DxEditing"),d=n("DxColumn"),X=n("DxRequiredRule"),Z=n("DxRangeRule"),m=n("DxLookup"),$=n("DxMasterDetail"),tt=n("DetailClient"),et=n("cellLink"),at=n("DxDataGrid");return W(),J("div",bt,[w("div",vt,[w("div",Pt,[t(R)]),w("div",St,[w("div",Gt,[t(at,{id:"dataGridClients","data-source":o.dataSource,"key-expr":"id","show-borders":!0,onEditorPreparing:s.onEditorPreparing,onExporting:s.onExporting},{masterDetailClient:i(({data:h})=>[t(tt,{"template-data":h},null,8,["template-data"])]),"cell-link-template":i(({data:h})=>[t(et,{"cell-data":h,routePath:{name:"clientView",params:{id:h.data.id}}},null,8,["cell-data","routePath"])]),default:i(()=>[t(p,{visible:!0}),t(I,{visible:!0}),t(E,{"auto-expand-all":!0}),t(b,{enabled:!0,"allow-export-selected-data":!0}),t(c,{mode:"multiple"}),t(v,{visible:!0,width:240,placeholder:"Search..."}),t(P,{visible:!0}),t(D,{"page-size":10,enabled:"true"}),t(u,{"column-rendering-mode":"virtual"}),t(_,{visible:!0,"allowed-page-sizes":e.pageSizes,"display-mode":e.displayMode,"show-navigation-buttons":e.showNavButtons},null,8,["allowed-page-sizes","display-mode","show-navigation-buttons"]),t(Q,{"allow-updating":!0,"allow-adding":!0,"allow-deleting":!0,mode:"popup"},{default:i(()=>[t(S,{"show-title":!0,width:700,height:525,title:"Client Info"}),t(G,null,{default:i(()=>[t(r,{"col-count":1,"col-span":2,"item-type":"group"},{default:i(()=>[t(r,{"data-field":"name"}),t(r,{"data-field":"numberId"}),t(r,{"data-field":"address"}),t(r,{"data-field":"phone"}),t(r,{"data-field":"deadlinebilling"}),t(r,{"data-field":"costHourMen"})]),_:1}),t(r,{"col-count":2,"col-span":2,"item-type":"group",caption:"Others"},{default:i(()=>[t(r,{"data-field":"subsidiaryId"}),t(r,{"data-field":"catalogTypeId"}),t(r,{"data-field":"catalogRegionCountryId"}),t(r,{"data-field":"catalogRegionStateId"}),t(r,{"data-field":"catalogRegionCityId"}),t(r,{"data-field":"catalogIndustryTypeId"}),t(r,{"data-field":"catalogIndustrySubTypeId"}),t(r,{"data-field":"catalogCurrencyId"})]),_:1})]),_:1})]),_:1}),t(d,{width:150,"data-field":"numberId",caption:"Numero de Iden."}),t(d,{width:150,"data-field":"name",caption:"Nombre","cell-template":"cell-link-template"},{default:i(()=>[t(X),t(p,{"allow-search":!0})]),_:1}),t(d,{width:0,"data-field":"address",caption:"Direccion"}),t(d,{width:0,"data-field":"deadlinebilling","data-type":"number",caption:"Fecha Limite de Facturacion"},{default:i(()=>[t(Z,{max:o.maxDay,min:o.minDay,message:"El numero debe estar comprendido entre 0 - 30."},null,8,["max","min"])]),_:1}),t(d,{width:150,"data-field":"costHourMen","data-type":"number",format:"currency",caption:"Costo Hora"}),t(d,{width:0,"data-field":"phone","data-type":"tel",caption:"Telefono"}),t(d,{width:150,"data-field":"subsidiaryId",caption:"Filial"},{default:i(()=>[t(m,{"data-source":o.subsidiary,"value-expr":"id","display-expr":"name"},null,8,["data-source"])]),_:1}),t(d,{width:150,"data-field":"catalogTypeId",caption:"Tipo de Iden."},{default:i(()=>[t(m,{"data-source":o.catalog,"value-expr":"id","display-expr":"value"},null,8,["data-source"])]),_:1}),t(d,{width:150,"set-cell-value":o.setCountryValue,"data-type":"string","data-field":"catalogRegionCountryId",caption:"Pais"},{default:i(()=>[t(m,{"data-source":o.country,"value-expr":"id","display-expr":"value"},null,8,["data-source"]),t(p,{"allow-search":!0})]),_:1},8,["set-cell-value"]),t(d,{width:0,"set-cell-value":o.setStateValue,"data-field":"catalogRegionStateId","data-type":"string",caption:"Estado"},{default:i(()=>[t(m,{"data-source":s.getFilteredStates,"value-expr":"id","display-expr":"value"},null,8,["data-source"]),t(p,{"allow-search":!0})]),_:1},8,["set-cell-value"]),t(d,{width:0,"data-field":"catalogRegionCityId",caption:"Ciudad"},{default:i(()=>[t(m,{"data-source":s.getFilteredCities,"value-expr":"id","display-expr":"value"},null,8,["data-source"]),t(p,{"allow-search":!0})]),_:1}),t(d,{width:0,"data-field":"catalogIndustryTypeId",caption:"Tipo de Industria"},{default:i(()=>[t(m,{"data-source":o.industrytype,"value-expr":"id","display-expr":"value"},null,8,["data-source"]),t(p,{"allow-search":!0})]),_:1}),t(d,{width:0,"data-field":"catalogIndustrySubTypeId",caption:"Tipo de SubIndustria"},{default:i(()=>[t(m,{"data-source":o.industrysubtype,"value-expr":"id","display-expr":"value"},null,8,["data-source"]),t(p,{"allow-search":!0})]),_:1}),t(d,{width:120,"data-field":"catalogCurrencyId",caption:"Moneda"},{default:i(()=>[t(m,{"data-source":o.currency,"value-expr":"id","display-expr":"value"},null,8,["data-source"])]),_:1}),t($,{enabled:!0,template:"masterDetailClient"})]),_:1},8,["data-source","onEditorPreparing","onExporting"])])])])])}var Yt=K(Et,[["render",Nt]]);export{Yt as default};