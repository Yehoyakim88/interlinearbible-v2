/*ADOBE SYSTEMS INCORPORATED
Copyright 2012 Adobe Systems Incorporated
All Rights Reserved.

NOTICE:  Adobe permits you to use, modify, and distribute this file in accordance with the
terms of the Adobe license agreement accompanying it.  If you have received this file from a
source other than Adobe, then your use, modification, or distribution of it requires the prior
written permission of Adobe.*/
if(!String.prototype.startsWith){
Object.defineProperty(String.prototype,"startsWith",{value:function(_56f,pos){
pos=!pos||pos<0?0:+pos;
return this.substring(pos,pos+_56f.length)===_56f;
}});
}
function cfinit(){
if(!window.ColdFusion){
ColdFusion={};
var $C=ColdFusion;
if(!$C.Ajax){
$C.Ajax={};
}
var $A=$C.Ajax;
if(!$C.AjaxProxy){
$C.AjaxProxy={};
}
var $X=$C.AjaxProxy;
if(!$C.Bind){
$C.Bind={};
}
var $B=$C.Bind;
if(!$C.Event){
$C.Event={};
}
var $E=$C.Event;
if(!$C.Log){
$C.Log={};
}
var $L=$C.Log;
if(!$C.Util){
$C.Util={};
}
var $U=$C.Util;
if(!$C.DOM){
$C.DOM={};
}
var $D=$C.DOM;
if(!$C.Spry){
$C.Spry={};
}
var $S=$C.Spry;
if(!$C.Pod){
$C.Pod={};
}
var $P=$C.Pod;
if(!$C.objectCache){
$C.objectCache={};
}
if(!$C.required){
$C.required={};
}
if(!$C.importedTags){
$C.importedTags=[];
}
if(!$C.requestCounter){
$C.requestCounter=0;
}
if(!$C.bindHandlerCache){
$C.bindHandlerCache={};
}
window._cf_loadingtexthtml="<div style=\"text-align: center;\">"+window._cf_loadingtexthtml+"&nbsp;"+CFMessage["loading"]+"</div>";
$C.globalErrorHandler=function(_57b,_57c){
if($L.isAvailable){
$L.error(_57b,_57c);
}
if($C.userGlobalErrorHandler){
$C.userGlobalErrorHandler(_57b);
}
if(!$L.isAvailable&&!$C.userGlobalErrorHandler){
alert(_57b+CFMessage["globalErrorHandler.alert"]);
}
};
$C.handleError=function(_57d,_57e,_57f,_580,_581,_582,_583,_584){
var msg=$L.format(_57e,_580);
if(_57d){
$L.error(msg,"http");
if(!_581){
_581=-1;
}
if(!_582){
_582=msg;
}
_57d(_581,_582,_584);
}else{
if(_583){
$L.error(msg,"http");
throw msg;
}else{
$C.globalErrorHandler(msg,_57f);
}
}
};
$C.setGlobalErrorHandler=function(_586){
$C.userGlobalErrorHandler=_586;
};
$A.createXMLHttpRequest=function(){
try{
return new XMLHttpRequest();
}
catch(e){
}
var _587=["Microsoft.XMLHTTP","MSXML2.XMLHTTP.5.0","MSXML2.XMLHTTP.4.0","MSXML2.XMLHTTP.3.0","MSXML2.XMLHTTP"];
for(var i=0;i<_587.length;i++){
try{
return new ActiveXObject(_587[i]);
}
catch(e){
}
}
return false;
};
$A.isRequestError=function(req){
return ((req.status!=0&&req.status!=200)||req.getResponseHeader("server-error"));
};
$A.sendMessage=function(url,_58b,_58c,_58d,_58e,_58f,_590){
var req=$A.createXMLHttpRequest();
if(!_58b){
_58b="GET";
}
if(_58d&&_58e){
req.onreadystatechange=function(){
$A.callback(req,_58e,_58f);
};
}
if(_58c){
_58c+="&_cf_nodebug=true&_cf_nocache=true";
}else{
_58c="_cf_nodebug=true&_cf_nocache=true";
}
if(window._cf_clientid){
_58c+="&_cf_clientid="+_cf_clientid;
}
if(_58b=="GET"){
if(_58c){
_58c+="&_cf_rc="+($C.requestCounter++);
if(url.indexOf("?")==-1){
url+="?"+_58c;
}else{
url+="&"+_58c;
}
}
$L.info("ajax.sendmessage.get","http",[url]);
req.open(_58b,url,_58d);
req.send(null);
}else{
$L.info("ajax.sendmessage.post","http",[url,_58c]);
req.open(_58b,url,_58d);
req.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
if(_58c){
req.send(_58c);
}else{
req.send(null);
}
}
if(!_58d){
while(req.readyState!=4){
}
if($A.isRequestError(req)){
$C.handleError(null,"ajax.sendmessage.error","http",[req.status,req.statusText],req.status,req.statusText,_590);
}else{
return req;
}
}
};
$A.callback=function(req,_593,_594){
if(req.readyState!=4){
return;
}
req.onreadystatechange=new Function;
_593(req,_594);
};
$A.submitForm=function(_595,url,_597,_598,_599,_59a){
var _59b=$C.getFormQueryString(_595);
if(_59b==-1){
$C.handleError(_598,"ajax.submitform.formnotfound","http",[_595],-1,null,true);
return;
}
if(!_599){
_599="POST";
}
_59a=!(_59a===false);
var _59c=function(req){
$A.submitForm.callback(req,_595,_597,_598);
};
$L.info("ajax.submitform.submitting","http",[_595]);
var _59e=$A.sendMessage(url,_599,_59b,_59a,_59c);
if(!_59a){
$L.info("ajax.submitform.success","http",[_595]);
return _59e.responseText;
}
};
$A.submitForm.callback=function(req,_5a0,_5a1,_5a2){
if($A.isRequestError(req)){
$C.handleError(_5a2,"ajax.submitform.error","http",[req.status,_5a0,req.statusText],req.status,req.statusText);
}else{
$L.info("ajax.submitform.success","http",[_5a0]);
if(_5a1){
_5a1(req.responseText);
}
}
};
$C.empty=function(){
};
$C.setSubmitClicked=function(_5a3,_5a4){
var el=$D.getElement(_5a4,_5a3);
el.cfinputbutton=true;
$C.setClickedProperty=function(){
el.clicked=true;
};
$E.addListener(el,"click",$C.setClickedProperty);
};
$C.getFormQueryString=function(_5a6,_5a7){
var _5a8;
if(typeof _5a6=="string"){
_5a8=(document.getElementById(_5a6)||document.forms[_5a6]);
}else{
if(typeof _5a6=="object"){
_5a8=_5a6;
}
}
if(!_5a8||null==_5a8.elements){
return -1;
}
var _5a9,elementName,elementValue,elementDisabled;
var _5aa=false;
var _5ab=(_5a7)?{}:"";
for(var i=0;i<_5a8.elements.length;i++){
_5a9=_5a8.elements[i];
elementDisabled=_5a9.disabled;
elementName=_5a9.name;
elementValue=_5a9.value;
if(_5a9.id&&_5a9.id.startsWith("cf_textarea")){
var _5ad=CKEDITOR.instances;
if(_5ad){
for(ta in _5ad){
if(_5ad[ta].getData){
elementValue=_5ad[ta].getData();
break;
}
}
}
}
if(!elementDisabled&&elementName){
switch(_5a9.type){
case "select-one":
case "select-multiple":
for(var j=0;j<_5a9.options.length;j++){
if(_5a9.options[j].selected){
if(window.ActiveXObject){
_5ab=$C.getFormQueryString.processFormData(_5ab,_5a7,elementName,_5a9.options[j].attributes["value"].specified?_5a9.options[j].value:_5a9.options[j].text);
}else{
_5ab=$C.getFormQueryString.processFormData(_5ab,_5a7,elementName,_5a9.options[j].hasAttribute("value")?_5a9.options[j].value:_5a9.options[j].text);
}
}
}
break;
case "radio":
case "checkbox":
if(_5a9.checked){
_5ab=$C.getFormQueryString.processFormData(_5ab,_5a7,elementName,elementValue);
}
break;
case "file":
case undefined:
case "reset":
break;
case "button":
_5ab=$C.getFormQueryString.processFormData(_5ab,_5a7,elementName,elementValue);
break;
case "submit":
if(_5a9.cfinputbutton){
if(_5aa==false&&_5a9.clicked){
_5ab=$C.getFormQueryString.processFormData(_5ab,_5a7,elementName,elementValue);
_5aa=true;
}
}else{
_5ab=$C.getFormQueryString.processFormData(_5ab,_5a7,elementName,elementValue);
}
break;
case "textarea":
var _5af;
if(window.FCKeditorAPI&&(_5af=$C.objectCache[elementName])&&_5af.richtextid){
var _5b0=FCKeditorAPI.GetInstance(_5af.richtextid);
if(_5b0){
elementValue=_5b0.GetXHTML();
}
}
_5ab=$C.getFormQueryString.processFormData(_5ab,_5a7,elementName,elementValue);
break;
default:
_5ab=$C.getFormQueryString.processFormData(_5ab,_5a7,elementName,elementValue);
break;
}
}
}
if(!_5a7){
_5ab=_5ab.substr(0,_5ab.length-1);
}
return _5ab;
};
$C.getFormQueryString.processFormData=function(_5b1,_5b2,_5b3,_5b4){
if(_5b2){
if(_5b1[_5b3]){
_5b1[_5b3]+=","+_5b4;
}else{
_5b1[_5b3]=_5b4;
}
}else{
_5b1+=encodeURIComponent(_5b3)+"="+encodeURIComponent(_5b4)+"&";
}
return _5b1;
};
$A.importTag=function(_5b5){
$C.importedTags.push(_5b5);
};
$A.checkImportedTag=function(_5b6){
var _5b7=false;
for(var i=0;i<$C.importedTags.length;i++){
if($C.importedTags[i]==_5b6){
_5b7=true;
break;
}
}
if(!_5b7){
$C.handleError(null,"ajax.checkimportedtag.error","widget",[_5b6]);
}
};
$C.getElementValue=function(_5b9,_5ba,_5bb){
if(!_5b9){
$C.handleError(null,"getelementvalue.noelementname","bind",null,null,null,true);
return;
}
if(!_5bb){
_5bb="value";
}
var _5bc=$B.getBindElementValue(_5b9,_5ba,_5bb);
if(typeof (_5bc)=="undefined"){
_5bc=null;
}
if(_5bc==null){
$C.handleError(null,"getelementvalue.elnotfound","bind",[_5b9,_5bb],null,null,true);
return;
}
return _5bc;
};
$B.getBindElementValue=function(_5bd,_5be,_5bf,_5c0,_5c1){
var _5c2="";
if(window[_5bd]){
var _5c3=eval(_5bd);
if(_5c3&&_5c3._cf_getAttribute){
_5c2=_5c3._cf_getAttribute(_5bf);
return _5c2;
}
}
var _5c4=$C.objectCache[_5bd];
if(_5c4&&_5c4._cf_getAttribute){
_5c2=_5c4._cf_getAttribute(_5bf);
return _5c2;
}
var el=$D.getElement(_5bd,_5be);
var _5c6=(el&&((!el.length&&el.length!=0)||(el.length&&el.length>0)||el.tagName=="SELECT"));
if(!_5c6&&!_5c1){
$C.handleError(null,"bind.getbindelementvalue.elnotfound","bind",[_5bd]);
return null;
}
if(el.tagName!="SELECT"){
if(el.length>1){
var _5c7=true;
for(var i=0;i<el.length;i++){
var _5c9=(el[i].getAttribute("type")=="radio"||el[i].getAttribute("type")=="checkbox");
if(!_5c9||(_5c9&&el[i].checked)){
if(!_5c7){
_5c2+=",";
}
_5c2+=$B.getBindElementValue.extract(el[i],_5bf);
_5c7=false;
}
}
}else{
_5c2=$B.getBindElementValue.extract(el,_5bf);
}
}else{
var _5c7=true;
for(var i=0;i<el.options.length;i++){
if(el.options[i].selected){
if(!_5c7){
_5c2+=",";
}
_5c2+=$B.getBindElementValue.extract(el.options[i],_5bf);
_5c7=false;
}
}
}
if(typeof (_5c2)=="object"){
$C.handleError(null,"bind.getbindelementvalue.simplevalrequired","bind",[_5bd,_5bf]);
return null;
}
if(_5c0&&$C.required[_5bd]&&_5c2.length==0){
return null;
}
return _5c2;
};
$B.getBindElementValue.extract=function(el,_5cb){
var _5cc=el[_5cb];
if((_5cc==null||typeof (_5cc)=="undefined")&&el.getAttribute){
_5cc=el.getAttribute(_5cb);
}
return _5cc;
};
$L.init=function(){
if(window.YAHOO&&YAHOO.widget&&YAHOO.widget.Logger){
YAHOO.widget.Logger.categories=[CFMessage["debug"],CFMessage["info"],CFMessage["error"],CFMessage["window"]];
YAHOO.widget.LogReader.prototype.formatMsg=function(_5cd){
var _5ce=_5cd.category;
return "<p>"+"<span class='"+_5ce+"'>"+_5ce+"</span>:<i>"+_5cd.source+"</i>: "+_5cd.msg+"</p>";
};
var _5cf=new YAHOO.widget.LogReader(null,{width:"30em",fontSize:"100%"});
_5cf.setTitle(CFMessage["log.title"]||"ColdFusion AJAX Logger");
_5cf._btnCollapse.value=CFMessage["log.collapse"]||"Collapse";
_5cf._btnPause.value=CFMessage["log.pause"]||"Pause";
_5cf._btnClear.value=CFMessage["log.clear"]||"Clear";
$L.isAvailable=true;
}
};
$L.log=function(_5d0,_5d1,_5d2,_5d3){
if(!$L.isAvailable){
return;
}
if(!_5d2){
_5d2="global";
}
_5d2=CFMessage[_5d2]||_5d2;
_5d1=CFMessage[_5d1]||_5d1;
_5d0=$L.format(_5d0,_5d3);
YAHOO.log(_5d0,_5d1,_5d2);
};
$L.format=function(code,_5d5){
var msg=CFMessage[code]||code;
if(_5d5){
for(i=0;i<_5d5.length;i++){
if(!_5d5[i].length){
_5d5[i]="";
}
var _5d7="{"+i+"}";
msg=msg.replace(_5d7,_5d5[i]);
}
}
return msg;
};
$L.debug=function(_5d8,_5d9,_5da){
$L.log(_5d8,"debug",_5d9,_5da);
};
$L.info=function(_5db,_5dc,_5dd){
$L.log(_5db,"info",_5dc,_5dd);
};
$L.error=function(_5de,_5df,_5e0){
$L.log(_5de,"error",_5df,_5e0);
};
$L.dump=function(_5e1,_5e2){
if($L.isAvailable){
var dump=(/string|number|undefined|boolean/.test(typeof (_5e1))||_5e1==null)?_5e1:recurse(_5e1,typeof _5e1,true);
$L.debug(dump,_5e2);
}
};
$X.invoke=function(_5e4,_5e5,_5e6,_5e7,_5e8){
return $X.invokeInternal(_5e4,_5e5,_5e6,_5e7,_5e8,false,null,null);
};
$X.invokeInternal=function(_5e9,_5ea,_5eb,_5ec,_5ed,_5ee,_5ef,_5f0){
var _5f1="method="+_5ea+"&_cf_ajaxproxytoken="+_5eb;
if(_5ee){
_5f1+="&_cfclient="+"true";
var _5f2=$X.JSON.encodeInternal(_5e9._variables,_5ee);
_5f1+="&_variables="+encodeURIComponent(_5f2);
var _5f3=$X.JSON.encodeInternal(_5e9._metadata,_5ee);
_5f1+="&_metadata="+encodeURIComponent(_5f3);
}
var _5f4=_5e9.returnFormat||"json";
_5f1+="&returnFormat="+_5f4;
if(_5e9.queryFormat){
_5f1+="&queryFormat="+_5e9.queryFormat;
}
if(_5e9.formId){
var _5f5=$C.getFormQueryString(_5e9.formId,true);
if(_5ec!=null){
for(prop in _5f5){
_5ec[prop]=_5f5[prop];
}
}else{
_5ec=_5f5;
}
_5e9.formId=null;
}
var _5f6="";
if(_5ec!=null){
_5f6=$X.JSON.encodeInternal(_5ec,_5ee);
_5f1+="&argumentCollection="+encodeURIComponent(_5f6);
}
$L.info("ajaxproxy.invoke.invoking","http",[_5e9.cfcPath,_5ea,_5f6]);
if(_5e9.callHandler){
_5e9.callHandler.call(null,_5e9.callHandlerParams,_5e9.cfcPath,_5f1);
return;
}
var _5f7;
var _5f8=_5e9.async;
if(_5ef!=null){
_5f8=true;
_5f7=function(req){
$X.callbackOp(req,_5e9,_5ed,_5ef,_5f0);
};
}else{
if(_5e9.async){
_5f7=function(req){
$X.callback(req,_5e9,_5ed);
};
}
}
var req=$A.sendMessage(_5e9.cfcPath,_5e9.httpMethod,_5f1,_5f8,_5f7,null,true);
if(!_5f8){
return $X.processResponse(req,_5e9);
}
};
$X.callback=function(req,_5fd,_5fe){
if($A.isRequestError(req)){
$C.handleError(_5fd.errorHandler,"ajaxproxy.invoke.error","http",[req.status,_5fd.cfcPath,req.statusText],req.status,req.statusText,false,_5fe);
}else{
if(_5fd.callbackHandler){
var _5ff=$X.processResponse(req,_5fd);
_5fd.callbackHandler(_5ff,_5fe);
}
}
};
$X.callbackOp=function(req,_601,_602,_603,_604){
if($A.isRequestError(req)){
var _605=_601.errorHandler;
if(_604!=null){
_605=_604;
}
$C.handleError(_605,"ajaxproxy.invoke.error","http",[req.status,_601.cfcPath,req.statusText],req.status,req.statusText,false,_602);
}else{
if(_603){
var _606=$X.processResponse(req,_601);
_603(_606,_602);
}
}
};
$X.processResponse=function(req,_608){
var _609=true;
for(var i=0;i<req.responseText.length;i++){
var c=req.responseText.charAt(i);
_609=(c==" "||c=="\n"||c=="\t"||c=="\r");
if(!_609){
break;
}
}
var _60c=(req.responseXML&&req.responseXML.childNodes.length>0);
var _60d=_60c?"[XML Document]":req.responseText;
$L.info("ajaxproxy.invoke.response","http",[_60d]);
var _60e;
var _60f=_608.returnFormat||"json";
if(_60f=="json"){
try{
_60e=_609?null:$X.JSON.decode(req.responseText);
}
catch(e){
if(typeof _608._metadata!=="undefined"&&_608._metadata.servercfc&&typeof req.responseText==="string"){
_60e=req.responseText;
}else{
throw e;
}
}
}else{
_60e=_60c?req.responseXML:(_609?null:req.responseText);
}
return _60e;
};
$X.init=function(_610,_611,_612){
if(typeof _612==="undefined"){
_612=false;
}
var _613=_611;
if(!_612){
var _614=_611.split(".");
var ns=self;
for(i=0;i<_614.length-1;i++){
if(_614[i].length){
ns[_614[i]]=ns[_614[i]]||{};
ns=ns[_614[i]];
}
}
var _616=_614[_614.length-1];
if(ns[_616]){
return ns[_616];
}
ns[_616]=function(){
this.httpMethod="GET";
this.async=false;
this.callbackHandler=null;
this.errorHandler=null;
this.formId=null;
};
_613=ns[_616].prototype;
}else{
_613.httpMethod="GET";
_613.async=false;
_613.callbackHandler=null;
_613.errorHandler=null;
_613.formId=null;
}
_613.cfcPath=_610;
_613.setHTTPMethod=function(_617){
if(_617){
_617=_617.toUpperCase();
}
if(_617!="GET"&&_617!="POST"){
$C.handleError(null,"ajaxproxy.sethttpmethod.invalidmethod","http",[_617],null,null,true);
}
this.httpMethod=_617;
};
_613.setSyncMode=function(){
this.async=false;
};
_613.setAsyncMode=function(){
this.async=true;
};
_613.setCallbackHandler=function(fn){
this.callbackHandler=fn;
this.setAsyncMode();
};
_613.setErrorHandler=function(fn){
this.errorHandler=fn;
this.setAsyncMode();
};
_613.setForm=function(fn){
this.formId=fn;
};
_613.setQueryFormat=function(_61b){
if(_61b){
_61b=_61b.toLowerCase();
}
if(!_61b||(_61b!="column"&&_61b!="row"&&_61b!="struct")){
$C.handleError(null,"ajaxproxy.setqueryformat.invalidformat","http",[_61b],null,null,true);
}
this.queryFormat=_61b;
};
_613.setReturnFormat=function(_61c){
if(_61c){
_61c=_61c.toLowerCase();
}
if(!_61c||(_61c!="plain"&&_61c!="json"&&_61c!="wddx")){
$C.handleError(null,"ajaxproxy.setreturnformat.invalidformat","http",[_61c],null,null,true);
}
this.returnFormat=_61c;
};
$L.info("ajaxproxy.init.created","http",[_610]);
if(_612){
return _613;
}else{
return ns[_616];
}
};
$U.isWhitespace=function(s){
var _61e=true;
for(var i=0;i<s.length;i++){
var c=s.charAt(i);
_61e=(c==" "||c=="\n"||c=="\t"||c=="\r");
if(!_61e){
break;
}
}
return _61e;
};
$U.getFirstNonWhitespaceIndex=function(s){
var _622=true;
for(var i=0;i<s.length;i++){
var c=s.charAt(i);
_622=(c==" "||c=="\n"||c=="\t"||c=="\r");
if(!_622){
break;
}
}
return i;
};
$C.trim=function(_625){
return _625.replace(/^\s+|\s+$/g,"");
};
$U.isInteger=function(n){
var _627=true;
if(typeof (n)=="number"){
_627=(n>=0);
}else{
for(i=0;i<n.length;i++){
if($U.isInteger.numberChars.indexOf(n.charAt(i))==-1){
_627=false;
break;
}
}
}
return _627;
};
$U.isInteger.numberChars="0123456789";
$U.isArray=function(a){
return (typeof (a.length)=="number"&&!a.toUpperCase);
};
$U.isBoolean=function(b){
if(b===true||b===false){
return true;
}else{
if(b.toLowerCase){
b=b.toLowerCase();
return (b==$U.isBoolean.trueChars||b==$U.isBoolean.falseChars);
}else{
return false;
}
}
};
$U.isBoolean.trueChars="true";
$U.isBoolean.falseChars="false";
$U.castBoolean=function(b){
if(b===true){
return true;
}else{
if(b===false){
return false;
}else{
if(b.toLowerCase){
b=b.toLowerCase();
if(b==$U.isBoolean.trueChars){
return true;
}else{
if(b==$U.isBoolean.falseChars){
return false;
}else{
return false;
}
}
}else{
return false;
}
}
}
};
$U.checkQuery=function(o){
var _62c=null;
if(o&&o.COLUMNS&&$U.isArray(o.COLUMNS)&&o.DATA&&$U.isArray(o.DATA)&&(o.DATA.length==0||(o.DATA.length>0&&$U.isArray(o.DATA[0])))){
_62c="row";
}else{
if(o&&o.COLUMNS&&$U.isArray(o.COLUMNS)&&o.ROWCOUNT&&$U.isInteger(o.ROWCOUNT)&&o.DATA){
_62c="col";
for(var i=0;i<o.COLUMNS.length;i++){
var _62e=o.DATA[o.COLUMNS[i]];
if(!_62e||!$U.isArray(_62e)){
_62c=null;
break;
}
}
}
}
return _62c;
};
$X.JSON=new function(){
var _62f={}.hasOwnProperty?true:false;
var _630=/^("(\\.|[^"\\\n\r])*?"|[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t])+?$/;
var pad=function(n){
return n<10?"0"+n:n;
};
var m={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r","\"":"\\\"","\\":"\\\\"};
var _634=function(s){
if(/["\\\x00-\x1f]/.test(s)){
return "\""+s.replace(/([\x00-\x1f\\"])/g,function(a,b){
var c=m[b];
if(c){
return c;
}
c=b.charCodeAt();
return "\\u00"+Math.floor(c/16).toString(16)+(c%16).toString(16);
})+"\"";
}
return "\""+s+"\"";
};
var _639=function(o){
var a=["["],b,i,l=o.length,v;
for(i=0;i<l;i+=1){
v=o[i];
switch(typeof v){
case "undefined":
case "function":
case "unknown":
break;
default:
if(b){
a.push(",");
}
a.push(v===null?"null":$X.JSON.encode(v));
b=true;
}
}
a.push("]");
return a.join("");
};
var _63c=function(o){
return "\""+o.getFullYear()+"-"+pad(o.getMonth()+1)+"-"+pad(o.getDate())+"T"+pad(o.getHours())+":"+pad(o.getMinutes())+":"+pad(o.getSeconds())+"\"";
};
this.encode=function(o){
return this.encodeInternal(o,false);
};
this.encodeInternal=function(o,cfc){
if(typeof o=="undefined"||o===null){
return "null";
}else{
if(o instanceof Array){
return _639(o);
}else{
if(o instanceof Date){
if(cfc){
return this.encodeInternal({_date_:o.getTime()},cfc);
}
return _63c(o);
}else{
if(typeof o=="string"){
return _634(o);
}else{
if(typeof o=="number"){
return isFinite(o)?String(o):"null";
}else{
if(typeof o=="boolean"){
return String(o);
}else{
if(cfc&&typeof o=="object"&&typeof o._metadata!=="undefined"){
return "{\"_metadata\":"+this.encodeInternal(o._metadata,false)+",\"_variables\":"+this.encodeInternal(o._variables,cfc)+"}";
}else{
var a=["{"],b,i,v;
for(var i in o){
if(!_62f||o.hasOwnProperty(i)){
v=o[i];
switch(typeof v){
case "undefined":
case "function":
case "unknown":
break;
default:
if(b){
a.push(",");
}
a.push(this.encodeInternal(i,cfc),":",v===null?"null":this.encodeInternal(v,cfc));
b=true;
}
}
}
a.push("}");
return a.join("");
}
}
}
}
}
}
}
};
this.decode=function(json){
if(typeof json=="object"){
return json;
}
if($U.isWhitespace(json)){
return null;
}
var _644=$U.getFirstNonWhitespaceIndex(json);
if(_644>0){
json=json.slice(_644);
}
if(window._cf_jsonprefix&&json.indexOf(_cf_jsonprefix)==0){
json=json.slice(_cf_jsonprefix.length);
}
try{
if(_630.test(json)){
return JSON.parse(json);
}
}
catch(e){
}
throw new SyntaxError("parseJSON");
};
}();
if(!$C.JSON){
$C.JSON={};
}
$C.JSON.encode=$X.JSON.encode;
$C.JSON.encodeInternal=$X.JSON.encodeInternal;
$C.JSON.decode=$X.JSON.decode;
$C.navigate=function(url,_646,_647,_648,_649,_64a){
if(url==null){
$C.handleError(_648,"navigate.urlrequired","widget");
return;
}
if(_649){
_649=_649.toUpperCase();
if(_649!="GET"&&_649!="POST"){
$C.handleError(null,"navigate.invalidhttpmethod","http",[_649],null,null,true);
}
}else{
_649="GET";
}
var _64b;
if(_64a){
_64b=$C.getFormQueryString(_64a);
if(_64b==-1){
$C.handleError(null,"navigate.formnotfound","http",[_64a],null,null,true);
}
}
if(_646==null){
if(_64b){
if(url.indexOf("?")==-1){
url+="?"+_64b;
}else{
url+="&"+_64b;
}
}
$L.info("navigate.towindow","widget",[url]);
window.location.replace(url);
return;
}
$L.info("navigate.tocontainer","widget",[url,_646]);
var obj=$C.objectCache[_646];
if(obj!=null){
if(typeof (obj._cf_body)!="undefined"&&obj._cf_body!=null){
_646=obj._cf_body;
}
}
$A.replaceHTML(_646,url,_649,_64b,_647,_648);
};
$A.checkForm=function(_64d,_64e,_64f,_650,_651){
var _652=_64e.call(null,_64d);
if(_652==false){
return false;
}
var _653=$C.getFormQueryString(_64d);
$L.info("ajax.submitform.submitting","http",[_64d.name]);
$A.replaceHTML(_64f,_64d.action,_64d.method,_653,_650,_651);
return false;
};
$A.replaceHTML=function(_654,url,_656,_657,_658,_659){
var _65a=document.getElementById(_654);
if(!_65a){
$C.handleError(_659,"ajax.replacehtml.elnotfound","http",[_654]);
return;
}
var _65b="_cf_containerId="+encodeURIComponent(_654);
_657=(_657)?_657+"&"+_65b:_65b;
$L.info("ajax.replacehtml.replacing","http",[_654,url,_657]);
if(_cf_loadingtexthtml){
try{
_65a.innerHTML=_cf_loadingtexthtml;
}
catch(e){
}
}
var _65c=function(req,_65e){
var _65f=false;
if($A.isRequestError(req)){
$C.handleError(_659,"ajax.replacehtml.error","http",[req.status,_65e.id,req.statusText],req.status,req.statusText);
_65f=true;
}
var _660=new $E.CustomEvent("onReplaceHTML",_65e);
var _661=new $E.CustomEvent("onReplaceHTMLUser",_65e);
$E.loadEvents[_65e.id]={system:_660,user:_661};
if(req.responseText.search(/<script/i)!=-1){
try{
_65e.innerHTML="";
}
catch(e){
}
$A.replaceHTML.processResponseText(req.responseText,_65e,_659);
}else{
try{
_65e.innerHTML=req.responseText;
$A.updateLayouttab(_65e);
if(_657.indexOf("window-id")>-1){
var q=_657.substring(_657.indexOf("window-id")+10,_657.indexOf("&"));
var cmp=Ext.getCmp(q);
if(cmp){
cmp.update(_65e.innerHTML);
}
}
}
catch(e){
}
}
$E.loadEvents[_65e.id]=null;
_660.fire();
_660.unsubscribe();
_661.fire();
_661.unsubscribe();
$L.info("ajax.replacehtml.success","http",[_65e.id]);
if(_658&&!_65f){
_658();
}
};
try{
$A.sendMessage(url,_656,_657,true,_65c,_65a);
}
catch(e){
try{
_65a.innerHTML=$L.format(CFMessage["ajax.replacehtml.connectionerrordisplay"],[url,e]);
}
catch(e){
}
$C.handleError(_659,"ajax.replacehtml.connectionerror","http",[_654,url,e]);
}
};
$A.replaceHTML.processResponseText=function(text,_665,_666){
var pos=0;
var _668=0;
var _669=0;
_665._cf_innerHTML="";
while(pos<text.length){
var _66a=text.indexOf("<s",pos);
if(_66a==-1){
_66a=text.indexOf("<S",pos);
}
if(_66a==-1){
break;
}
pos=_66a;
var _66b=true;
var _66c=$A.replaceHTML.processResponseText.scriptTagChars;
for(var i=1;i<_66c.length;i++){
var _66e=pos+i+1;
if(_66e>text.length){
break;
}
var _66f=text.charAt(_66e);
if(_66c[i][0]!=_66f&&_66c[i][1]!=_66f){
pos+=i+1;
_66b=false;
break;
}
}
if(!_66b){
continue;
}
var _670=text.substring(_668,pos);
if(_670){
_665._cf_innerHTML+=_670;
}
var _671=text.indexOf(">",pos)+1;
if(_671==0){
pos++;
continue;
}else{
pos+=7;
}
var _672=_671;
while(_672<text.length&&_672!=-1){
_672=text.indexOf("</s",_672);
if(_672==-1){
_672=text.indexOf("</S",_672);
}
if(_672!=-1){
_66b=true;
for(var i=1;i<_66c.length;i++){
var _66e=_672+2+i;
if(_66e>text.length){
break;
}
var _66f=text.charAt(_66e);
if(_66c[i][0]!=_66f&&_66c[i][1]!=_66f){
_672=_66e;
_66b=false;
break;
}
}
if(_66b){
break;
}
}
}
if(_672!=-1){
var _673=text.substring(_671,_672);
var _674=_673.indexOf("<!--");
if(_674!=-1){
_673=_673.substring(_674+4);
}
var _675=_673.lastIndexOf("//-->");
if(_675!=-1){
_673=_673.substring(0,_675-1);
}
if(_673.indexOf("document.write")!=-1||_673.indexOf("CF_RunContent")!=-1){
if(_673.indexOf("CF_RunContent")!=-1){
_673=_673.replace("CF_RunContent","document.write");
}
_673="var _cfDomNode = document.getElementById('"+_665.id+"'); var _cfBuffer='';"+"if (!document._cf_write)"+"{document._cf_write = document.write;"+"document.write = function(str){if (_cfBuffer!=null){_cfBuffer+=str;}else{document._cf_write(str);}};};"+_673+";_cfDomNode._cf_innerHTML += _cfBuffer; _cfBuffer=null;";
}
try{
eval(_673);
}
catch(ex){
$C.handleError(_666,"ajax.replacehtml.jserror","http",[_665.id,ex]);
}
}
_66a=text.indexOf(">",_672)+1;
if(_66a==0){
_669=_672+1;
break;
}
_669=_66a;
pos=_66a;
_668=_66a;
}
if(_669<text.length-1){
var _670=text.substring(_669,text.length);
if(_670){
_665._cf_innerHTML+=_670;
}
}
try{
_665.innerHTML=_665._cf_innerHTML;
$A.updateLayouttab(_665);
}
catch(e){
}
_665._cf_innerHTML="";
};
$A.updateLayouttab=function(_676){
var _677=_676.id;
var s=_677.substr(13,_677.length);
var cmp=Ext.getCmp(s);
var _67a=_676.innerHTML;
var _67b=document.getElementById(_677);
var html=_67b.innerHTML;
if(cmp){
cmp.update("<div id="+_676.id+">"+html+"</div>");
}
var _67b=document.getElementById(_677);
if(_67b){
}
};
$A.replaceHTML.processResponseText.scriptTagChars=[["s","S"],["c","C"],["r","R"],["i","I"],["p","P"],["t","T"]];
$D.getElement=function(_67d,_67e){
var _67f=function(_680){
return (_680.name==_67d||_680.id==_67d);
};
var _681=$D.getElementsBy(_67f,null,_67e);
if(_681.length==1){
return _681[0];
}else{
return _681;
}
};
$D.getElementsBy=function(_682,tag,root){
tag=tag||"*";
var _685=[];
if(root){
root=$D.get(root);
if(!root){
return _685;
}
}else{
root=document;
}
var _686=root.getElementsByTagName(tag);
if(!_686.length&&(tag=="*"&&root.all)){
_686=root.all;
}
for(var i=0,len=_686.length;i<len;++i){
if(_682(_686[i])){
_685[_685.length]=_686[i];
}
}
return _685;
};
$D.get=function(el){
if(!el){
return null;
}
if(typeof el!="string"&&!(el instanceof Array)){
return el;
}
if(typeof el=="string"){
return document.getElementById(el);
}else{
var _689=[];
for(var i=0,len=el.length;i<len;++i){
_689[_689.length]=$D.get(el[i]);
}
return _689;
}
return null;
};
$E.loadEvents={};
$E.CustomEvent=function(_68b,_68c){
return {name:_68b,domNode:_68c,subs:[],subscribe:function(func,_68e){
var dup=false;
for(var i=0;i<this.subs.length;i++){
var sub=this.subs[i];
if(sub.f==func&&sub.p==_68e){
dup=true;
break;
}
}
if(!dup){
this.subs.push({f:func,p:_68e});
}
},fire:function(){
for(var i=0;i<this.subs.length;i++){
var sub=this.subs[i];
sub.f.call(null,this,sub.p);
}
},unsubscribe:function(){
this.subscribers=[];
}};
};
$E.windowLoadImpEvent=new $E.CustomEvent("cfWindowLoadImp");
$E.windowLoadEvent=new $E.CustomEvent("cfWindowLoad");
$E.windowLoadUserEvent=new $E.CustomEvent("cfWindowLoadUser");
$E.listeners=[];
$E.addListener=function(el,ev,fn,_697){
var l={el:el,ev:ev,fn:fn,params:_697};
$E.listeners.push(l);
var _699=function(e){
if(!e){
var e=window.event;
}
fn.call(null,e,_697);
};
if(el.addEventListener){
window.addEventListener("load",function(){
el.addEventListener(ev,_699,false);
});
el.addEventListener(ev,_699,false);
return true;
}else{
if(el.attachEvent){
el.attachEvent("on"+ev,_699);
return true;
}else{
return false;
}
}
};
$E.isListener=function(el,ev,fn,_69e){
var _69f=false;
var ls=$E.listeners;
for(var i=0;i<ls.length;i++){
if(ls[i].el==el&&ls[i].ev==ev&&ls[i].fn==fn&&ls[i].params==_69e){
_69f=true;
break;
}
}
return _69f;
};
$E.callBindHandlers=function(id,_6a3,ev){
var el=document.getElementById(id);
if(!el){
return;
}
var ls=$E.listeners;
for(var i=0;i<ls.length;i++){
if(ls[i].el==el&&ls[i].ev==ev&&ls[i].fn._cf_bindhandler){
ls[i].fn.call(null,null,ls[i].params);
}
}
};
$E.registerOnLoad=function(func,_6a9,_6aa,user){
if($E.registerOnLoad.windowLoaded){
if(_6a9&&_6a9._cf_containerId&&$E.loadEvents[_6a9._cf_containerId]){
if(user){
$E.loadEvents[_6a9._cf_containerId].user.subscribe(func,_6a9);
}else{
$E.loadEvents[_6a9._cf_containerId].system.subscribe(func,_6a9);
}
}else{
func.call(null,null,_6a9);
}
}else{
if(user){
$E.windowLoadUserEvent.subscribe(func,_6a9);
}else{
if(_6aa){
$E.windowLoadImpEvent.subscribe(func,_6a9);
}else{
$E.windowLoadEvent.subscribe(func,_6a9);
}
}
}
};
$E.registerOnLoad.windowLoaded=false;
$E.onWindowLoad=function(fn){
if(window.addEventListener){
window.addEventListener("load",fn,false);
}else{
if(window.attachEvent){
window.attachEvent("onload",fn);
}else{
if(document.getElementById){
window.onload=fn;
}
}
}
};
$C.addSpanToDom=function(){
var _6ad=document.createElement("span");
document.body.insertBefore(_6ad,document.body.firstChild);
};
$E.windowLoadHandler=function(e){
if(window.Ext){
Ext.BLANK_IMAGE_URL=_cf_ajaxscriptsrc+"/resources/ext/images/default/s.gif";
}
$C.addSpanToDom();
$L.init();
$E.registerOnLoad.windowLoaded=true;
$E.windowLoadImpEvent.fire();
$E.windowLoadImpEvent.unsubscribe();
$E.windowLoadEvent.fire();
$E.windowLoadEvent.unsubscribe();
if(window.Ext){
Ext.onReady(function(){
$E.windowLoadUserEvent.fire();
});
}else{
$E.windowLoadUserEvent.fire();
}
$E.windowLoadUserEvent.unsubscribe();
};
$E.onWindowLoad($E.windowLoadHandler);
$B.register=function(_6af,_6b0,_6b1,_6b2){
for(var i=0;i<_6af.length;i++){
var _6b4=_6af[i][0];
var _6b5=_6af[i][1];
var _6b6=_6af[i][2];
if(window[_6b4]){
var _6b7=eval(_6b4);
if(_6b7&&_6b7._cf_register){
_6b7._cf_register(_6b6,_6b1,_6b0);
continue;
}
}
var _6b8=$C.objectCache[_6b4];
if(_6b8&&_6b8._cf_register){
_6b8._cf_register(_6b6,_6b1,_6b0);
continue;
}
var _6b9=$D.getElement(_6b4,_6b5);
var _6ba=(_6b9&&((!_6b9.length&&_6b9.length!=0)||(_6b9.length&&_6b9.length>0)||_6b9.tagName=="SELECT"));
if(!_6ba){
$C.handleError(null,"bind.register.elnotfound","bind",[_6b4]);
}
if(_6b9.length>1&&!_6b9.options){
for(var j=0;j<_6b9.length;j++){
$B.register.addListener(_6b9[j],_6b6,_6b1,_6b0);
}
}else{
$B.register.addListener(_6b9,_6b6,_6b1,_6b0);
}
}
if(!$C.bindHandlerCache[_6b0.bindTo]&&typeof (_6b0.bindTo)=="string"){
$C.bindHandlerCache[_6b0.bindTo]=function(){
_6b1.call(null,null,_6b0);
};
}
if(_6b2){
_6b1.call(null,null,_6b0);
}
};
$B.register.addListener=function(_6bc,_6bd,_6be,_6bf){
if(!$E.isListener(_6bc,_6bd,_6be,_6bf)){
$E.addListener(_6bc,_6bd,_6be,_6bf);
}
};
$B.assignValue=function(_6c0,_6c1,_6c2,_6c3){
if(!_6c0){
return;
}
if(_6c0.call){
_6c0.call(null,_6c2,_6c3);
return;
}
var _6c4=$C.objectCache[_6c0];
if(_6c4&&_6c4._cf_setValue){
_6c4._cf_setValue(_6c2);
return;
}
var _6c5=document.getElementById(_6c0);
if(!_6c5){
$C.handleError(null,"bind.assignvalue.elnotfound","bind",[_6c0]);
}
if(_6c5.tagName=="SELECT"){
var _6c6=$U.checkQuery(_6c2);
var _6c7=$C.objectCache[_6c0];
if(_6c6){
if(!_6c7||(_6c7&&(!_6c7.valueCol||!_6c7.displayCol))){
$C.handleError(null,"bind.assignvalue.selboxmissingvaldisplay","bind",[_6c0]);
return;
}
}else{
if(typeof (_6c2.length)=="number"&&!_6c2.toUpperCase){
if(_6c2.length>0&&(typeof (_6c2[0].length)!="number"||_6c2[0].toUpperCase)){
$C.handleError(null,"bind.assignvalue.selboxerror","bind",[_6c0]);
return;
}
}else{
$C.handleError(null,"bind.assignvalue.selboxerror","bind",[_6c0]);
return;
}
}
_6c5.options.length=0;
var _6c8;
var _6c9=false;
if(_6c7){
_6c8=_6c7.selected;
if(_6c8&&_6c8.length>0){
_6c9=true;
}
}
if(!_6c6){
for(var i=0;i<_6c2.length;i++){
var opt=new Option(_6c2[i][1],_6c2[i][0]);
_6c5.options[i]=opt;
if(_6c9){
for(var j=0;j<_6c8.length;j++){
if(_6c8[j]==opt.value){
opt.selected=true;
}
}
}
}
}else{
if(_6c6=="col"){
var _6cd=_6c2.DATA[_6c7.valueCol];
var _6ce=_6c2.DATA[_6c7.displayCol];
if(!_6cd||!_6ce){
$C.handleError(null,"bind.assignvalue.selboxinvalidvaldisplay","bind",[_6c0]);
return;
}
for(var i=0;i<_6cd.length;i++){
var opt=new Option(_6ce[i],_6cd[i]);
_6c5.options[i]=opt;
if(_6c9){
for(var j=0;j<_6c8.length;j++){
if(_6c8[j]==opt.value){
opt.selected=true;
}
}
}
}
}else{
if(_6c6=="row"){
var _6cf=-1;
var _6d0=-1;
for(var i=0;i<_6c2.COLUMNS.length;i++){
var col=_6c2.COLUMNS[i];
if(col==_6c7.valueCol){
_6cf=i;
}
if(col==_6c7.displayCol){
_6d0=i;
}
if(_6cf!=-1&&_6d0!=-1){
break;
}
}
if(_6cf==-1||_6d0==-1){
$C.handleError(null,"bind.assignvalue.selboxinvalidvaldisplay","bind",[_6c0]);
return;
}
for(var i=0;i<_6c2.DATA.length;i++){
var opt=new Option(_6c2.DATA[i][_6d0],_6c2.DATA[i][_6cf]);
_6c5.options[i]=opt;
if(_6c9){
for(var j=0;j<_6c8.length;j++){
if(_6c8[j]==opt.value){
opt.selected=true;
}
}
}
}
}
}
}
}else{
_6c5[_6c1]=_6c2;
}
$E.callBindHandlers(_6c0,null,"change");
$L.info("bind.assignvalue.success","bind",[_6c2,_6c0,_6c1]);
};
$B.localBindHandler=function(e,_6d3){
var _6d4=document.getElementById(_6d3.bindTo);
var _6d5=$B.evaluateBindTemplate(_6d3,true);
$B.assignValue(_6d3.bindTo,_6d3.bindToAttr,_6d5);
};
$B.localBindHandler._cf_bindhandler=true;
$B.evaluateBindTemplate=function(_6d6,_6d7,_6d8,_6d9,_6da){
var _6db=_6d6.bindExpr;
var _6dc="";
if(typeof _6da=="undefined"){
_6da=false;
}
for(var i=0;i<_6db.length;i++){
if(typeof (_6db[i])=="object"){
var _6de=null;
if(!_6db[i].length||typeof _6db[i][0]=="object"){
_6de=$X.JSON.encode(_6db[i]);
}else{
var _6de=$B.getBindElementValue(_6db[i][0],_6db[i][1],_6db[i][2],_6d7,_6d9);
if(_6de==null){
if(_6d7){
_6dc="";
break;
}else{
_6de="";
}
}
}
if(_6d8){
_6de=encodeURIComponent(_6de);
}
_6dc+=_6de;
}else{
var _6df=_6db[i];
if(_6da==true&&i>0){
if(typeof (_6df)=="string"&&_6df.indexOf("&")!=0){
_6df=encodeURIComponent(_6df);
}
}
_6dc+=_6df;
}
}
return _6dc;
};
$B.jsBindHandler=function(e,_6e1){
var _6e2=_6e1.bindExpr;
var _6e3=new Array();
var _6e4=_6e1.callFunction+"(";
for(var i=0;i<_6e2.length;i++){
var _6e6;
if(typeof (_6e2[i])=="object"){
if(_6e2[i].length){
if(typeof _6e2[i][0]=="object"){
_6e6=_6e2[i];
}else{
_6e6=$B.getBindElementValue(_6e2[i][0],_6e2[i][1],_6e2[i][2],false);
}
}else{
_6e6=_6e2[i];
}
}else{
_6e6=_6e2[i];
}
if(i!=0){
_6e4+=",";
}
_6e3[i]=_6e6;
_6e4+="'"+_6e6+"'";
}
_6e4+=")";
var _6e7=_6e1.callFunction.apply(null,_6e3);
$B.assignValue(_6e1.bindTo,_6e1.bindToAttr,_6e7,_6e1.bindToParams);
};
$B.jsBindHandler._cf_bindhandler=true;
$B.urlBindHandler=function(e,_6e9){
var _6ea=_6e9.bindTo;
if($C.objectCache[_6ea]&&$C.objectCache[_6ea]._cf_visible===false){
$C.objectCache[_6ea]._cf_dirtyview=true;
return;
}
var url=$B.evaluateBindTemplate(_6e9,false,true,false,true);
var _6ec=$U.extractReturnFormat(url);
if(_6ec==null||typeof _6ec=="undefined"){
_6ec="JSON";
}
if(_6e9.bindToAttr||typeof _6e9.bindTo=="undefined"||typeof _6e9.bindTo=="function"){
var _6e9={"bindTo":_6e9.bindTo,"bindToAttr":_6e9.bindToAttr,"bindToParams":_6e9.bindToParams,"errorHandler":_6e9.errorHandler,"url":url,returnFormat:_6ec};
try{
$A.sendMessage(url,"GET",null,true,$B.urlBindHandler.callback,_6e9);
}
catch(e){
$C.handleError(_6e9.errorHandler,"ajax.urlbindhandler.connectionerror","http",[url,e]);
}
}else{
$A.replaceHTML(_6ea,url,null,null,_6e9.callback,_6e9.errorHandler);
}
};
$B.urlBindHandler._cf_bindhandler=true;
$B.urlBindHandler.callback=function(req,_6ee){
if($A.isRequestError(req)){
$C.handleError(_6ee.errorHandler,"bind.urlbindhandler.httperror","http",[req.status,_6ee.url,req.statusText],req.status,req.statusText);
}else{
$L.info("bind.urlbindhandler.response","http",[req.responseText]);
var _6ef;
try{
if(_6ee.returnFormat==null||_6ee.returnFormat==="JSON"){
_6ef=$X.JSON.decode(req.responseText);
}else{
_6ef=req.responseText;
}
}
catch(e){
if(req.responseText!=null&&typeof req.responseText=="string"){
_6ef=req.responseText;
}else{
$C.handleError(_6ee.errorHandler,"bind.urlbindhandler.jsonerror","http",[req.responseText]);
}
}
$B.assignValue(_6ee.bindTo,_6ee.bindToAttr,_6ef,_6ee.bindToParams);
}
};
$A.initSelect=function(_6f0,_6f1,_6f2,_6f3){
$C.objectCache[_6f0]={"valueCol":_6f1,"displayCol":_6f2,selected:_6f3};
};
$S.setupSpry=function(){
if(typeof (Spry)!="undefined"&&Spry.Data){
Spry.Data.DataSet.prototype._cf_getAttribute=function(_6f4){
var val;
var row=this.getCurrentRow();
if(row){
val=row[_6f4];
}
return val;
};
Spry.Data.DataSet.prototype._cf_register=function(_6f7,_6f8,_6f9){
var obs={bindParams:_6f9};
obs.onCurrentRowChanged=function(){
_6f8.call(null,null,this.bindParams);
};
obs.onDataChanged=function(){
_6f8.call(null,null,this.bindParams);
};
this.addObserver(obs);
};
if(Spry.Debug.trace){
var _6fb=Spry.Debug.trace;
Spry.Debug.trace=function(str){
$L.info(str,"spry");
_6fb(str);
};
}
if(Spry.Debug.reportError){
var _6fd=Spry.Debug.reportError;
Spry.Debug.reportError=function(str){
$L.error(str,"spry");
_6fd(str);
};
}
$L.info("spry.setupcomplete","bind");
}
};
$E.registerOnLoad($S.setupSpry,null,true);
$S.bindHandler=function(_6ff,_700){
var url;
var _702="_cf_nodebug=true&_cf_nocache=true";
if(window._cf_clientid){
_702+="&_cf_clientid="+_cf_clientid;
}
var _703=window[_700.bindTo];
var _704=(typeof (_703)=="undefined");
if(_700.cfc){
var _705={};
var _706=_700.bindExpr;
for(var i=0;i<_706.length;i++){
var _708;
if(_706[i].length==2){
_708=_706[i][1];
}else{
_708=$B.getBindElementValue(_706[i][1],_706[i][2],_706[i][3],false,_704);
}
_705[_706[i][0]]=_708;
}
_705=$X.JSON.encode(_705);
_702+="&method="+_700.cfcFunction;
_702+="&argumentCollection="+encodeURIComponent(_705);
$L.info("spry.bindhandler.loadingcfc","http",[_700.bindTo,_700.cfc,_700.cfcFunction,_705]);
url=_700.cfc;
}else{
url=$B.evaluateBindTemplate(_700,false,true,_704);
$L.info("spry.bindhandler.loadingurl","http",[_700.bindTo,url]);
}
var _709=_700.options||{};
if((_703&&_703._cf_type=="json")||_700.dsType=="json"){
_702+="&returnformat=json";
}
if(_703){
if(_703.requestInfo.method=="GET"){
_709.method="GET";
if(url.indexOf("?")==-1){
url+="?"+_702;
}else{
url+="&"+_702;
}
}else{
_709.postData=_702;
_709.method="POST";
_703.setURL("");
}
_703.setURL(url,_709);
_703.loadData();
}else{
if(!_709.method||_709.method=="GET"){
if(url.indexOf("?")==-1){
url+="?"+_702;
}else{
url+="&"+_702;
}
}else{
_709.postData=_702;
_709.useCache=false;
}
var ds;
if(_700.dsType=="xml"){
ds=new Spry.Data.XMLDataSet(url,_700.xpath,_709);
}else{
ds=new Spry.Data.JSONDataSet(url,_709);
ds.preparseFunc=$S.preparseData;
}
ds._cf_type=_700.dsType;
var _70b={onLoadError:function(req){
$C.handleError(_700.errorHandler,"spry.bindhandler.error","http",[_700.bindTo,req.url,req.requestInfo.postData]);
}};
ds.addObserver(_70b);
window[_700.bindTo]=ds;
}
};
$S.bindHandler._cf_bindhandler=true;
$S.preparseData=function(ds,_70e){
var _70f=$U.getFirstNonWhitespaceIndex(_70e);
if(_70f>0){
_70e=_70e.slice(_70f);
}
if(window._cf_jsonprefix&&_70e.indexOf(_cf_jsonprefix)==0){
_70e=_70e.slice(_cf_jsonprefix.length);
}
return _70e;
};
$P.init=function(_710){
$L.info("pod.init.creating","widget",[_710]);
var _711={};
_711._cf_body=_710+"_body";
$C.objectCache[_710]=_711;
};
$B.cfcBindHandler=function(e,_713){
var _714=(_713.httpMethod)?_713.httpMethod:"GET";
var _715={};
var _716=_713.bindExpr;
for(var i=0;i<_716.length;i++){
var _718;
if(_716[i].length==2){
_718=_716[i][1];
}else{
_718=$B.getBindElementValue(_716[i][1],_716[i][2],_716[i][3],false);
}
_715[_716[i][0]]=_718;
}
var _719=function(_71a,_71b){
$B.assignValue(_71b.bindTo,_71b.bindToAttr,_71a,_71b.bindToParams);
};
var _71c={"bindTo":_713.bindTo,"bindToAttr":_713.bindToAttr,"bindToParams":_713.bindToParams};
var _71d={"async":true,"cfcPath":_713.cfc,"httpMethod":_714,"callbackHandler":_719,"errorHandler":_713.errorHandler};
if(_713.proxyCallHandler){
_71d.callHandler=_713.proxyCallHandler;
_71d.callHandlerParams=_713;
}
$X.invoke(_71d,_713.cfcFunction,_713._cf_ajaxproxytoken,_715,_71c);
};
$B.cfcBindHandler._cf_bindhandler=true;
$U.extractReturnFormat=function(url){
var _71f;
var _720=url.toUpperCase();
var _721=_720.indexOf("RETURNFORMAT");
if(_721>0){
var _722=_720.indexOf("&",_721+13);
if(_722<0){
_722=_720.length;
}
_71f=_720.substring(_721+13,_722);
}
return _71f;
};
$U.replaceAll=function(_723,_724,_725){
var _726=_723.indexOf(_724);
while(_726>-1){
_723=_723.replace(_724,_725);
_726=_723.indexOf(_724);
}
return _723;
};
$U.cloneObject=function(obj){
var _728={};
for(key in obj){
var _729=obj[key];
if(typeof _729=="object"){
_729=$U.cloneObject(_729);
}
_728.key=_729;
}
return _728;
};
$C.clone=function(obj,_72b){
if(typeof (obj)!="object"){
return obj;
}
if(obj==null){
return obj;
}
var _72c=new Object();
for(var i in obj){
if(_72b===true){
_72c[i]=$C.clone(obj[i]);
}else{
_72c[i]=obj[i];
}
}
return _72c;
};
$C.printObject=function(obj){
var str="";
for(key in obj){
str=str+"  "+key+"=";
value=obj[key];
if(typeof (value)=="object"){
value=$C.printObject(value);
}
str+=value;
}
return str;
};
}
}
cfinit();
