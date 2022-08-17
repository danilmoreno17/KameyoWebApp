import{b9 as C,b1 as c}from"./vendor.7710df40.js";import{bx as y,bl as g}from"./index.3bbb47f2.js";var e={},x=C(y);/*!
 * devextreme-vue
 * Version: 21.2.6
 * Build date: Tue Mar 01 2022
 *
 * Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file in the root of the project for details.
 *
 * https://github.com/DevExpress/devextreme-vue
 */var _=c&&c.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(e,"__esModule",{value:!0});var D=e.DxValidationRule=P=e.DxStringLengthRule=F=e.DxRequiredRule=B=e.DxRangeRule=I=e.DxPatternRule=b=e.DxNumericRule=A=e.DxEmailRule=S=e.DxCustomRule=V=e.DxCompareRule=N=e.DxAsyncRule=h=e.DxAdapter=E=e.DxValidator=void 0,$=_(x),f=g,t=g,v=f.createExtensionComponent({props:{adapter:Object,elementAttr:Object,height:[Function,Number,String],name:String,onDisposing:Function,onInitialized:Function,onOptionChanged:Function,onValidated:Function,validationGroup:String,validationRules:Array,width:[Function,Number,String]},emits:{"update:isActive":null,"update:hoveredElement":null,"update:adapter":null,"update:elementAttr":null,"update:height":null,"update:name":null,"update:onDisposing":null,"update:onInitialized":null,"update:onOptionChanged":null,"update:onValidated":null,"update:validationGroup":null,"update:validationRules":null,"update:width":null},computed:{instance:function(){return this.$_instance}},beforeCreate:function(){this.$_WidgetClass=$.default,this.$_hasAsyncTemplate=!0,this.$_expectedChildren={adapter:{isCollectionItem:!1,optionName:"adapter"},AsyncRule:{isCollectionItem:!0,optionName:"validationRules"},CompareRule:{isCollectionItem:!0,optionName:"validationRules"},CustomRule:{isCollectionItem:!0,optionName:"validationRules"},EmailRule:{isCollectionItem:!0,optionName:"validationRules"},NumericRule:{isCollectionItem:!0,optionName:"validationRules"},PatternRule:{isCollectionItem:!0,optionName:"validationRules"},RangeRule:{isCollectionItem:!0,optionName:"validationRules"},RequiredRule:{isCollectionItem:!0,optionName:"validationRules"},StringLengthRule:{isCollectionItem:!0,optionName:"validationRules"},validationRule:{isCollectionItem:!0,optionName:"validationRules"}}}}),E=e.DxValidator=v,R=t.createConfigurationComponent({emits:{"update:isActive":null,"update:hoveredElement":null,"update:applyValidationResults":null,"update:bypass":null,"update:focus":null,"update:getValue":null,"update:reset":null,"update:validationRequestsCallbacks":null},props:{applyValidationResults:Function,bypass:Function,focus:Function,getValue:Function,reset:Function,validationRequestsCallbacks:Array}}),h=e.DxAdapter=R;R.$_optionName="adapter";var l=t.createConfigurationComponent({emits:{"update:isActive":null,"update:hoveredElement":null,"update:ignoreEmptyValue":null,"update:message":null,"update:reevaluate":null,"update:type":null,"update:validationCallback":null},props:{ignoreEmptyValue:Boolean,message:String,reevaluate:Boolean,type:String,validationCallback:Function}}),N=e.DxAsyncRule=l;l.$_optionName="validationRules";l.$_isCollectionItem=!0;l.$_predefinedProps={type:"async"};var n=t.createConfigurationComponent({emits:{"update:isActive":null,"update:hoveredElement":null,"update:comparisonTarget":null,"update:comparisonType":null,"update:ignoreEmptyValue":null,"update:message":null,"update:type":null},props:{comparisonTarget:Function,comparisonType:String,ignoreEmptyValue:Boolean,message:String,type:String}}),V=e.DxCompareRule=n;n.$_optionName="validationRules";n.$_isCollectionItem=!0;n.$_predefinedProps={type:"compare"};var u=t.createConfigurationComponent({emits:{"update:isActive":null,"update:hoveredElement":null,"update:ignoreEmptyValue":null,"update:message":null,"update:reevaluate":null,"update:type":null,"update:validationCallback":null},props:{ignoreEmptyValue:Boolean,message:String,reevaluate:Boolean,type:String,validationCallback:Function}}),S=e.DxCustomRule=u;u.$_optionName="validationRules";u.$_isCollectionItem=!0;u.$_predefinedProps={type:"custom"};var i=t.createConfigurationComponent({emits:{"update:isActive":null,"update:hoveredElement":null,"update:ignoreEmptyValue":null,"update:message":null,"update:type":null},props:{ignoreEmptyValue:Boolean,message:String,type:String}}),A=e.DxEmailRule=i;i.$_optionName="validationRules";i.$_isCollectionItem=!0;i.$_predefinedProps={type:"email"};var o=t.createConfigurationComponent({emits:{"update:isActive":null,"update:hoveredElement":null,"update:ignoreEmptyValue":null,"update:message":null,"update:type":null},props:{ignoreEmptyValue:Boolean,message:String,type:String}}),b=e.DxNumericRule=o;o.$_optionName="validationRules";o.$_isCollectionItem=!0;o.$_predefinedProps={type:"numeric"};var r=t.createConfigurationComponent({emits:{"update:isActive":null,"update:hoveredElement":null,"update:ignoreEmptyValue":null,"update:message":null,"update:pattern":null,"update:type":null},props:{ignoreEmptyValue:Boolean,message:String,pattern:{},type:String}}),I=e.DxPatternRule=r;r.$_optionName="validationRules";r.$_isCollectionItem=!0;r.$_predefinedProps={type:"pattern"};var p=t.createConfigurationComponent({emits:{"update:isActive":null,"update:hoveredElement":null,"update:ignoreEmptyValue":null,"update:max":null,"update:message":null,"update:min":null,"update:reevaluate":null,"update:type":null},props:{ignoreEmptyValue:Boolean,max:{},message:String,min:{},reevaluate:Boolean,type:String}}),B=e.DxRangeRule=p;p.$_optionName="validationRules";p.$_isCollectionItem=!0;p.$_predefinedProps={type:"range"};var d=t.createConfigurationComponent({emits:{"update:isActive":null,"update:hoveredElement":null,"update:message":null,"update:trim":null,"update:type":null},props:{message:String,trim:Boolean,type:String}}),F=e.DxRequiredRule=d;d.$_optionName="validationRules";d.$_isCollectionItem=!0;d.$_predefinedProps={type:"required"};var s=t.createConfigurationComponent({emits:{"update:isActive":null,"update:hoveredElement":null,"update:ignoreEmptyValue":null,"update:max":null,"update:message":null,"update:min":null,"update:trim":null,"update:type":null},props:{ignoreEmptyValue:Boolean,max:Number,message:String,min:Number,trim:Boolean,type:String}}),P=e.DxStringLengthRule=s;s.$_optionName="validationRules";s.$_isCollectionItem=!0;s.$_predefinedProps={type:"stringLength"};var m=t.createConfigurationComponent({emits:{"update:isActive":null,"update:hoveredElement":null,"update:comparisonTarget":null,"update:comparisonType":null,"update:ignoreEmptyValue":null,"update:max":null,"update:message":null,"update:min":null,"update:pattern":null,"update:reevaluate":null,"update:trim":null,"update:type":null,"update:validationCallback":null},props:{comparisonTarget:Function,comparisonType:String,ignoreEmptyValue:Boolean,max:{},message:String,min:{},pattern:{},reevaluate:Boolean,trim:Boolean,type:String,validationCallback:Function}});D=e.DxValidationRule=m;m.$_optionName="validationRules";m.$_isCollectionItem=!0;m.$_predefinedProps={type:"required"};var k=e.default=v;export{F as D,V as a,N as b,A as c,E as d};