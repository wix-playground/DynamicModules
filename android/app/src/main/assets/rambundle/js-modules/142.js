__d(function(g,r,i,a,m,e,d){'use strict';var t=r(d[0]),s=r(d[1]),n=r(d[2]),o=r(d[3]),u=r(d[4]),h=r(d[5]),_=(r(d[6]),r(d[7]).FileReaderModule),c=0,y=1,l=2,f=(function(h){function f(){var s;return t(this,f),(s=n(this,o(f).call(this))).EMPTY=c,s.LOADING=y,s.DONE=l,s._aborted=!1,s._subscriptions=[],s._reset(),s}return u(f,h),s(f,[{key:"_reset",value:function(){this._readyState=c,this._error=null,this._result=null}},{key:"_clearSubscriptions",value:function(){this._subscriptions.forEach(function(t){return t.remove()}),this._subscriptions=[]}},{key:"_setReadyState",value:function(t){this._readyState=t,this.dispatchEvent({type:'readystatechange'}),t===l&&(this._aborted?this.dispatchEvent({type:'abort'}):this._error?this.dispatchEvent({type:'error'}):this.dispatchEvent({type:'load'}),this.dispatchEvent({type:'loadend'}))}},{key:"readAsArrayBuffer",value:function(){throw new Error('FileReader.readAsArrayBuffer is not implemented')}},{key:"readAsDataURL",value:function(t){var s=this;this._aborted=!1,_.readAsDataURL(t.data).then(function(t){s._aborted||(s._result=t,s._setReadyState(l))},function(t){s._aborted||(s._error=t,s._setReadyState(l))})}},{key:"readAsText",value:function(t){var s=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:'UTF-8';this._aborted=!1,_.readAsText(t.data,n).then(function(t){s._aborted||(s._result=t,s._setReadyState(l))},function(t){s._aborted||(s._error=t,s._setReadyState(l))})}},{key:"abort",value:function(){this._aborted=!0,this._readyState!==c&&this._readyState!==l&&(this._reset(),this._setReadyState(l)),this._reset()}},{key:"readyState",get:function(){return this._readyState}},{key:"error",get:function(){return this._error}},{key:"result",get:function(){return this._result}}]),f})(h.apply(void 0,['abort','error','load','loadstart','loadend','progress']));f.EMPTY=c,f.LOADING=y,f.DONE=l,m.exports=f},142,[30,31,38,41,44,123,133,16]);