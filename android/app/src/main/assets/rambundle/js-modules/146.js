__d(function(g,r,i,a,m,e,d){'use strict';var t=r(d[0]),n=r(d[1]),l=r(d[2]).AlertManager,o=(function(){function o(){t(this,o)}return n(o,null,[{key:"alert",value:function(t,n,l,o){if(void 0!==o)return console.warn('AlertIOS.alert() with a 4th "type" parameter is deprecated and will be removed. Use AlertIOS.prompt() instead.'),void this.prompt(t,n,l,o);this.prompt(t,n,l,'default')}},{key:"prompt",value:function(t,n,o){var u=arguments.length>3&&void 0!==arguments[3]?arguments[3]:'plain-text',s=arguments.length>4?arguments[4]:void 0,c=arguments.length>5?arguments[5]:void 0;if('function'!=typeof u){var p,f,v=[],y=[];'function'==typeof o?v=[o]:o instanceof Array&&o.forEach(function(t,n){if(v[n]=t.onPress,'cancel'===t.style?p=String(n):'destructive'===t.style&&(f=String(n)),t.text||n<(o||[]).length-1){var l={};l[n]=t.text||'',y.push(l)}}),l.alertWithArgs({title:t||'',message:n||void 0,buttons:y,type:u||void 0,defaultValue:s,cancelButtonKey:p,destructiveButtonKey:f,keyboardType:c},function(t,n){var l=v[t];l&&l(n)})}else{console.warn("You passed a callback function as the \"type\" argument to AlertIOS.prompt(). React Native is assuming  you want to use the deprecated AlertIOS.prompt(title, defaultValue, buttons, callback) signature. The current signature is AlertIOS.prompt(title, message, callbackOrButtons, type, defaultValue, keyboardType) and the old syntax will be removed in a future version.");var h=u;l.alertWithArgs({title:t||'',type:'plain-text',defaultValue:n},function(t,n){h(n)})}}}]),o})();m.exports=o},146,[30,31,16]);