__d(function(g,r,i,a,m,e,d){'use strict';var t=r(d[0]),n=r(d[1]),s=r(d[2]),o=r(d[3]),p=r(d[4]),u=(r(d[5]),r(d[6])),v=r(d[7]).AppState,c=r(d[8]),h=r(d[9]),l=(function(l){function _(){var n;t(this,_),(n=s(this,o(_).call(this,v))).isAvailable=!0,n.isAvailable=!0,n._eventHandlers={change:new Map,memoryWarning:new Map},n.currentState=v.initialAppState||'active';var p=!1;return n.addListener('appStateDidChange',function(t){p=!0,n.currentState=t.app_state}),v.getCurrentAppState(function(t){p||n.currentState===t.app_state||(n.currentState=t.app_state,n.emit('appStateDidChange',t))},c),n}return p(_,u),n(_,[{key:"addEventListener",value:function(t,n){h(-1!==['change','memoryWarning'].indexOf(t),'Trying to subscribe to unknown event: "%s"',t),'change'===t?this._eventHandlers[t].set(n,this.addListener('appStateDidChange',function(t){n(t.app_state)})):'memoryWarning'===t&&this._eventHandlers[t].set(n,this.addListener('memoryWarning',n))}},{key:"removeEventListener",value:function(t,n){h(-1!==['change','memoryWarning'].indexOf(t),'Trying to remove listener for unknown event: "%s"',t),this._eventHandlers[t].has(n)&&(this._eventHandlers[t].get(n).remove(),this._eventHandlers[t].delete(n))}}]),_})();l=new l,m.exports=l},336,[30,31,38,41,44,128,129,16,152,14]);