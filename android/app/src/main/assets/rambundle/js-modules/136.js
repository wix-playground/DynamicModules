__d(function(g,r,i,a,m,e,d){'use strict';var t=r(d[0]),n=r(d[1]),s=r(d[2]),o=r(d[3]),p=(function(){function p(){s(this,p),this._parts=[]}return o(p,[{key:"append",value:function(t,n){this._parts.push([t,n])}},{key:"getParts",value:function(){return this._parts.map(function(s){var o=n(s,2),p=o[0],f=o[1],u={'content-disposition':'form-data; name="'+p+'"'};return'object'==typeof f&&f?('string'==typeof f.name&&(u['content-disposition']+='; filename="'+f.name+'"'),'string'==typeof f.type&&(u['content-type']=f.type),t({},f,{headers:u,fieldName:p})):{string:String(f),headers:u,fieldName:p}})}}]),p})();m.exports=p},136,[55,20,30,31]);