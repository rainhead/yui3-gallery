YUI.add("gallery-exprbuilder",function(b){function e(k){if(arguments.length===0){return;}e.superclass.constructor.call(this,k);}e.NAME="exprbuilder";e.ATTRS={fieldId:{value:b.guid(),validator:b.Lang.isString,writeOnce:true},fieldName:{value:"",validator:b.Lang.isString,writeOnce:true},formMgr:{validator:function(k){return(!k||k instanceof b.FormManager);},writeOnce:true},queryBuilder:{validator:function(k){return(!k||k instanceof b.QueryBuilder);},writeOnce:true},combinatorMap:{validator:b.Lang.isObject},parenLabel:{value:"()",validator:b.Lang.isString,writeOnce:true},andLabel:{value:"AND",validator:b.Lang.isString,writeOnce:true},orLabel:{value:"OR",validator:b.Lang.isString,writeOnce:true},notLabel:{value:"NOT",validator:b.Lang.isString,writeOnce:true},clearLabel:{value:"Clear",validator:b.Lang.isString,writeOnce:true},insertLabel:{value:"Insert",validator:b.Lang.isString,writeOnce:true},resetLabel:{value:"Cancel",validator:b.Lang.isString,writeOnce:true},tooManyParensError:{value:'The expression contains an extra closing parenthesis at "{context}...".',validator:b.Lang.isString},unmatchedSingleQuoteError:{value:'The expression contains an unmatched single quote at "{context}...".',validator:b.Lang.isString},unclosedParenError:{value:'The expression contains an unclosed parenthesis at "{context}...".',validator:b.Lang.isString},noVariableSelectedError:{value:"Please choose a variable.",validator:b.Lang.isString}};function f(){this.ie_range=document.selection.createRange();}function a(o,n){n=n||o.length;this.field.focus();var l=b.Node.getDOMNode(this.field);if(l.setSelectionRange){var p=l.selectionStart;l.value=l.value.substring(0,p)+o+l.value.substring(l.selectionEnd,l.value.length);var k=p+n;l.setSelectionRange(k,k);}else{if(document.selection){if(!this.ie_range){this.ie_range=document.selection.createRange();}var m=this.ie_range.duplicate();m.text=o;this.ie_range.move("character",n);this.ie_range.select();}}}function i(k){a.call(this,"()",1);k.halt();}function j(k){return function(l){a.call(this," "+this.get(k+"Label")+" ");l.halt();};}function d(k){this.clear();k.halt();}function h(t){if(!this.qb_form.validateForm()){t.halt();return;}var o=this.get("queryBuilder");var v=o.toDatabaseQuery();if(v.length===0){var n=o.get("contentBox").one("select");this.qb_form.displayMessage(n,this.get("noVariableSelectedError"),"error");t.halt();return;}var l=this.get("combinatorMap");var w="";var r=" "+this.get("andLabel")+" ";for(var p=0;p<v.length;p++){var k=v[p];if(p>0){w+=r;}w+=k[0];var u=k[1];if(u.indexOf("{")==-1){u+="{value}";}var m=l&&l[k[1]];if(m){r=m.operator;u=m.pattern;}w+=b.Lang.substitute(u,{value:k[2].replace(/'/g,"\\'")});}a.call(this,w);o.reset();t.halt();}function g(k){this.qb_form.clearMessages();this.get("queryBuilder").reset();k.halt();}function c(l){if(l){var k=this;l.setFunction(this.get("fieldId"),function(m,n){return k._validateExpression(m,n,this);});}}b.extend(e,b.Widget,{initializer:function(k){c.call(this,k.formMgr);this.after("formMgrChange",function(l){if(l.prevVal){l.prevVal.setFunction(this.get("fieldId"),null);}c.call(this,l.newVal);});},renderUI:function(){var m=b.guid();var k=this.get("contentBox");k.set("innerHTML",this._field());this.field=k.one("#"+this.get("fieldId"));if(document.selection){this.field.on("change",f,this);}k.one("."+this.getClassName("paren")).on("click",i,this);var o=["and","or","not"];for(var l=0;l<o.length;l++){k.one("."+this.getClassName(o[l])).on("click",j(o[l]),this);}k.one("."+this.getClassName("clear")).on("click",d,this);var n=this.get("queryBuilder");if(n){k.appendChild(b.Node.create(this._query(m)));n.render(k.one("."+this.getClassName("querybuilder")));k.one("."+this.getClassName("insert")).on("click",h,this);k.one("."+this.getClassName("reset")).on("click",g,this);this.qb_form=new b.FormManager(m);this.qb_form.prepareForm();}},destructor:function(){var k=this.get("queryBuilder");if(k){k.destroy();}this.ie_range=null;},clear:function(){this.field.set("value","");this.field.focus();},_validateExpression:function(m,q,r){var u=q.get("value");var t=0;var p=-1;var k=false;var l=-1;for(var o=0;o<u.length;o++){if(!k&&u[o]=="("){if(t===0){p=o;}t++;}else{if(!k&&u[o]==")"){t--;if(t<0){var n=b.Lang.substitute(this.get("tooManyParensError"),{context:u.substr(0,o+1)});r.displayMessage(q,n,"error");return false;}}else{if(u[o]=="'"&&(o===0||u[o-1]!="\\")){if(!k){l=o;}k=!k;}}}}if(k&&(t===0||l<p)){var n=b.Lang.substitute(this.get("unmatchedSingleQuoteError"),{context:u.substr(0,l+1)});r.displayMessage(q,n,"error");return false;}else{if(t>0){var n=b.Lang.substitute(this.get("unclosedParenError"),{context:u.substr(0,p+1)});r.displayMessage(q,n,"error");return false;}}return true;},_field:function(){var k='<div class="{td}">'+'<textarea id="{tid}" name="{tn}" class="formmgr-field {ta}"></textarea>'+"</div>"+'<div class="{fctl}">'+'<button class="{pc}">{paren}</button>'+'<button class="{ac}">{and}</button>'+'<button class="{oc}">{or}</button>'+'<button class="{nc}">{not}</button>'+'<button class="{cc}">{clear}</button>'+"</div>";return b.Lang.substitute(k,{td:this.getClassName("field-container"),ta:this.getClassName("field"),tid:this.get("fieldId"),tn:this.get("fieldName"),fctl:this.getClassName("controls"),pc:this.getClassName("paren"),ac:this.getClassName("and"),oc:this.getClassName("or"),nc:this.getClassName("not"),cc:this.getClassName("clear"),paren:this.get("parenLabel"),and:this.get("andLabel"),or:this.get("orLabel"),not:this.get("notLabel"),clear:this.get("clearLabel")});},_query:function(l){var k='<form name="{qbf}">'+'<div class="{qb}"></div>'+'<div class="{qbctl} formmgr-row">'+'<button class="{ic}">{insert}</button>'+'<button class="{rc}">{reset}</button>'+"</div>"+"</form>";return b.Lang.substitute(k,{qbf:l,qb:this.getClassName("querybuilder"),qbctl:this.getClassName("querybuilder-controls"),ic:this.getClassName("insert"),rc:this.getClassName("reset"),insert:this.get("insertLabel"),reset:this.get("resetLabel")});}});b.ExpressionBuilder=e;},"gallery-2011.02.16-20-31",{requires:["gallery-querybuilder","gallery-formmgr"],skinnable:true});
