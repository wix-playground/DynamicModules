__d(function(g,r,i,a,m,e,d){'use strict';var t=r(d[0]),n=r(d[1]),s=r(d[2]),v=r(d[3]),o=r(d[4]),c=r(d[5]),_=r(d[3]).shouldUseNativeDriver;function l(t,n,_){var l=[];c(_[0]&&_[0].nativeEvent,'Native driven events only support animated values contained inside `nativeEvent`.'),(function t(n,v){if(n instanceof s)n.__makeNative(),l.push({nativeEventPath:v,animatedValueTag:n.__getNativeTag()});else if('object'==typeof n)for(var o in n)t(n[o],v.concat(o))})(_[0].nativeEvent,[]);var h=o.findNodeHandle(t);return l.forEach(function(t){v.API.addAnimatedEventToView(h,n,t)}),{detach:function(){l.forEach(function(t){v.API.removeAnimatedEventFromView(h,n,t.animatedValueTag)})}}}var h=(function(){function v(n){var s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};t(this,v),this._listeners=[],this._argMapping=n,s.listener&&this.__addListener(s.listener),this._callListeners=this._callListeners.bind(this),this._attachedEvent=null,this.__isNative=_(s)}return n(v,[{key:"__addListener",value:function(t){this._listeners.push(t)}},{key:"__removeListener",value:function(t){this._listeners=this._listeners.filter(function(n){return n!==t})}},{key:"__attach",value:function(t,n){c(this.__isNative,'Only native driven events need to be attached.'),this._attachedEvent=l(t,n,this._argMapping)}},{key:"__detach",value:function(t,n){c(this.__isNative,'Only native driven events need to be detached.'),this._attachedEvent&&this._attachedEvent.detach()}},{key:"__getHandler",value:function(){var t=this;return this.__isNative?this._callListeners:function(){for(var n=arguments.length,v=new Array(n),o=0;o<n;o++)v[o]=arguments[o];var c=function t(n,v,o){if('number'==typeof v&&n instanceof s)n.setValue(v);else if('object'==typeof n)for(var c in n)t(n[c],v[c],c)};t.__isNative||t._argMapping.forEach(function(t,n){c(t,v[n])}),t._callListeners.apply(t,v)}}},{key:"_callListeners",value:function(){for(var t=arguments.length,n=new Array(t),s=0;s<t;s++)n[s]=arguments[s];this._listeners.forEach(function(t){return t.apply(void 0,n)})}},{key:"_validateMapping",value:function(){}}]),v})();m.exports={AnimatedEvent:h,attachNativeEvent:l}},215,[30,31,216,219,87,14]);