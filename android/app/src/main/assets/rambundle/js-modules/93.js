__d(function(g,r,i,a,m,e,d){'use strict';var t=r(d[0]),n=r(d[1]),o=r(d[2]),u=(r(d[3]),r(d[4])),s=r(d[5]);m.exports=(function(l,f){if(!o('Map'))return l.Map;var p='key',c='value',h='key+value',v='$map_',_='IE_HASH_',y=(function(){function o(n){if(t(this,o),!w(this))throw new TypeError('Wrong map object type.');if(E(this),null!=n)for(var u,l=s(n);!(u=l.next()).done;){if(!w(u.value))throw new TypeError('Expected iterable items to be pair objects.');this.set(u.value[0],u.value[1])}}return n(o,[{key:"clear",value:function(){E(this)}},{key:"has",value:function(t){var n=I(this,t);return!(null==n||!this._mapData[n])}},{key:"set",value:function(t,n){var o=I(this,t);return null!=o&&this._mapData[o]?this._mapData[o][1]=n:(x(this,t,o=this._mapData.push([t,n])-1),this.size+=1),this}},{key:"get",value:function(t){var n=I(this,t);return null==n?void 0:this._mapData[n][1]}},{key:"delete",value:function(t){var n=I(this,t);return!(null==n||!this._mapData[n])&&(x(this,t,void 0),this._mapData[n]=void 0,this.size-=1,!0)}},{key:"entries",value:function(){return new b(this,h)}},{key:"keys",value:function(){return new b(this,p)}},{key:"values",value:function(){return new b(this,c)}},{key:"forEach",value:function(t,n){if('function'!=typeof t)throw new TypeError('Callback must be callable.');for(var o=t.bind(n||void 0),u=this._mapData,s=0;s<u.length;s++){var l=u[s];null!=l&&o(l[1],l[0],this)}}}]),o})();y.prototype[s.ITERATOR_SYMBOL]=y.prototype.entries;var b=(function(){function o(n,u){if(t(this,o),!w(n)||!n._mapData)throw new TypeError('Object is not a map.');if(-1===[p,h,c].indexOf(u))throw new Error('Invalid iteration kind.');this._map=n,this._nextIndex=0,this._kind=u}return n(o,[{key:"next",value:function(){if(!this instanceof y)throw new TypeError('Expected to be called on a MapIterator.');var t=this._map,n=this._nextIndex,o=this._kind;if(null==t)return k(void 0,!0);for(var u=t._mapData;n<u.length;){var s=u[n];if(n+=1,this._nextIndex=n,s){if(o===p)return k(s[0],!1);if(o===c)return k(s[1],!1);if(o)return k(s,!1)}}return this._map=void 0,k(void 0,!0)}}]),o})();function I(t,n){if(w(n)){var o=M(n);return t._objectIndex[o]}var u=v+n;return'string'==typeof n?t._stringIndex[u]:t._otherIndex[u]}function x(t,n,o){var u=null==o;if(w(n)){var s=M(n);u?delete t._objectIndex[s]:t._objectIndex[s]=o}else{var l=v+n;'string'==typeof n?u?delete t._stringIndex[l]:t._stringIndex[l]=o:u?delete t._otherIndex[l]:t._otherIndex[l]=o}}function E(t){t._mapData=[],t._objectIndex={},t._stringIndex={},t._otherIndex={},t.size=0}function w(t){return null!=t&&('object'==typeof t||'function'==typeof t)}function k(t,n){return{value:t,done:n}}b.prototype[s.ITERATOR_SYMBOL]=function(){return this};var j=(function(){try{return Object.defineProperty({},'x',{}),!0}catch(t){return!1}})();function D(t){return!j||Object.isExtensible(t)}function O(t){var n;switch(t.nodeType){case 1:n=t.uniqueID;break;case 9:n=t.documentElement.uniqueID;break;default:return null}return n?_+n:null}var T,A,L,M=(T=Object.prototype.propertyIsEnumerable,A='__MAP_POLYFILL_INTERNAL_HASH__',L=0,function(t){if(t[A])return t[A];if(!j&&t.propertyIsEnumerable&&t.propertyIsEnumerable[A])return t.propertyIsEnumerable[A];if(!j&&u(t)&&O(t))return O(t);if(!j&&t[A])return t[A];if(D(t)){if(L+=1,j)Object.defineProperty(t,A,{enumerable:!1,writable:!1,configurable:!1,value:L});else if(t.propertyIsEnumerable)t.propertyIsEnumerable=function(){return T.apply(this,arguments)},t.propertyIsEnumerable[A]=L;else{if(!u(t))throw new Error('Unable to set a non-enumerable property on object.');t[A]=L}return L}throw new Error('Non-extensible objects are not allowed as keys.')});return y})(Function('return this')())},93,[30,31,92,94,95,96]);