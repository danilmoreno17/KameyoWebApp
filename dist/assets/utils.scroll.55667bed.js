import{$ as i}from"./vendor.7710df40.js";import{bu as v}from"./index.3bbb47f2.js";var u=function(t,a,l){var r=i(t),o=l?r.scrollLeft():r.scrollTop(),n=l?"Width":"Height",e=r.prop("scroll".concat(n))-r.prop("client".concat(n))-o;if(o===0&&e===0)return!1;var c=o===0&&a>=0,s=e===0&&a<=0,p=o>0&&e>0;if(c||s||p)return!0},S=function(t,a){var l=i(t);return{validate:function(r){if(v(r)&&(o=r.target,a?i(o).is(t):!0))return u(l,-r.delta,r.shiftKey)?(r._needSkipEvent=!0,!0):!1;var o}}};export{u as a,S as p};
