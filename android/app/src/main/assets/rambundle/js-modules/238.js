__d(function(g,r,i,a,m,e,d){'use strict';var t,n=r(d[0]),s=r(d[1]),o=r(d[2]),_=r(d[3]),u=r(d[4]),h=r(d[5]),v=(r(d[6]),r(d[7]),r(d[8])),l=r(d[9]).shouldUseNativeDriver;function c(){if(!t){var n=r(d[10]);t=n.inOut(n.ease)}return t}var f=(function(t){function f(t){var s;return n(this,f),(s=o(this,_(f).call(this)))._toValue=t.toValue,s._easing=void 0!==t.easing?t.easing:c(),s._duration=void 0!==t.duration?t.duration:500,s._delay=void 0!==t.delay?t.delay:0,s.__iterations=void 0!==t.iterations?t.iterations:1,s.__isInteraction=void 0===t.isInteraction||t.isInteraction,s._useNativeDriver=l(t),s}return h(f,v),s(f,[{key:"__getNativeAnimationConfig",value:function(){for(var t=[],n=0;n<this._duration;n+=16.666666666666668)t.push(this._easing(n/this._duration));return t.push(this._easing(1)),{type:'frames',frames:t,toValue:this._toValue,iterations:this.__iterations}}},{key:"start",value:function(t,n,s,o,_){var u=this;this.__active=!0,this._fromValue=t,this._onUpdate=n,this.__onEnd=s;var h=function(){0!==u._duration||u._useNativeDriver?(u._startTime=Date.now(),u._useNativeDriver?u.__startNativeAnimation(_):u._animationFrame=requestAnimationFrame(u.onUpdate.bind(u))):(u._onUpdate(u._toValue),u.__debouncedOnEnd({finished:!0}))};this._delay?this._timeout=setTimeout(h,this._delay):h()}},{key:"onUpdate",value:function(){var t=Date.now();if(t>=this._startTime+this._duration)return 0===this._duration?this._onUpdate(this._toValue):this._onUpdate(this._fromValue+this._easing(1)*(this._toValue-this._fromValue)),void this.__debouncedOnEnd({finished:!0});this._onUpdate(this._fromValue+this._easing((t-this._startTime)/this._duration)*(this._toValue-this._fromValue)),this.__active&&(this._animationFrame=requestAnimationFrame(this.onUpdate.bind(this)))}},{key:"stop",value:function(){u(_(f.prototype),"stop",this).call(this),this.__active=!1,clearTimeout(this._timeout),g.cancelAnimationFrame(this._animationFrame),this.__debouncedOnEnd({finished:!1})}}]),f})();m.exports=f},238,[30,31,38,41,42,44,216,233,235,219,239]);