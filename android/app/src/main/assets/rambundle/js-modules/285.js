__d(function(g,r,i,a,m,e,d){'use strict';var t=r(d[0]),n=r(d[1]),s=r(d[2]),o=r(d[3]),h=r(d[4]),c=r(d[5]);function u(t,n,s){return t[n][s]}function l(t,n){return t[n]}var w=(function(){function h(t){n(this,h),o(t&&'function'==typeof t.rowHasChanged,'Must provide a rowHasChanged function.'),this._rowHasChanged=t.rowHasChanged,this._getRowData=t.getRowData||u,this._sectionHeaderHasChanged=t.sectionHeaderHasChanged,this._getSectionHeaderData=t.getSectionHeaderData||l,this._dataBlob=null,this._dirtyRows=[],this._dirtySections=[],this._cachedRowCount=0,this.rowIdentities=[],this.sectionIdentities=[]}return s(h,[{key:"cloneWithRows",value:function(n,s){var o=s?[t(s)]:null;return this._sectionHeaderHasChanged||(this._sectionHeaderHasChanged=function(){return!1}),this.cloneWithRowsAndSections({s1:n},['s1'],o)}},{key:"cloneWithRowsAndSections",value:function(t,n,s){o('function'==typeof this._sectionHeaderHasChanged,'Must provide a sectionHeaderHasChanged function with section data.'),o(!n||!s||n.length===s.length,'row and section ids lengths must be the same');var c=new h({getRowData:this._getRowData,getSectionHeaderData:this._getSectionHeaderData,rowHasChanged:this._rowHasChanged,sectionHeaderHasChanged:this._sectionHeaderHasChanged});return c._dataBlob=t,c.sectionIdentities=n||Object.keys(t),s?c.rowIdentities=s:(c.rowIdentities=[],c.sectionIdentities.forEach(function(n){c.rowIdentities.push(Object.keys(t[n]))})),c._cachedRowCount=_(c.rowIdentities),c._calculateDirtyArrays(this._dataBlob,this.sectionIdentities,this.rowIdentities),c}},{key:"getRowCount",value:function(){return this._cachedRowCount}},{key:"getRowAndSectionCount",value:function(){return this._cachedRowCount+this.sectionIdentities.length}},{key:"rowShouldUpdate",value:function(t,n){var s=this._dirtyRows[t][n];return c(void 0!==s,'missing dirtyBit for section, row: '+t+', '+n),s}},{key:"getRowData",value:function(t,n){var s=this.sectionIdentities[t],o=this.rowIdentities[t][n];return c(void 0!==s&&void 0!==o,'rendering invalid section, row: '+t+', '+n),this._getRowData(this._dataBlob,s,o)}},{key:"getRowIDForFlatIndex",value:function(t){for(var n=t,s=0;s<this.sectionIdentities.length;s++){if(!(n>=this.rowIdentities[s].length))return this.rowIdentities[s][n];n-=this.rowIdentities[s].length}return null}},{key:"getSectionIDForFlatIndex",value:function(t){for(var n=t,s=0;s<this.sectionIdentities.length;s++){if(!(n>=this.rowIdentities[s].length))return this.sectionIdentities[s];n-=this.rowIdentities[s].length}return null}},{key:"getSectionLengths",value:function(){for(var t=[],n=0;n<this.sectionIdentities.length;n++)t.push(this.rowIdentities[n].length);return t}},{key:"sectionHeaderShouldUpdate",value:function(t){var n=this._dirtySections[t];return c(void 0!==n,'missing dirtyBit for section: '+t),n}},{key:"getSectionHeaderData",value:function(t){if(!this._getSectionHeaderData)return null;var n=this.sectionIdentities[t];return c(void 0!==n,'renderSection called on invalid section: '+t),this._getSectionHeaderData(this._dataBlob,n)}},{key:"_calculateDirtyArrays",value:function(t,n,s){for(var o,h=f(n),u={},l=0;l<s.length;l++){var w=n[l];c(!u[w],'SectionID appears more than once: '+w),u[w]=f(s[l])}this._dirtySections=[],this._dirtyRows=[];for(var _=0;_<this.sectionIdentities.length;_++){var v=this.sectionIdentities[_];o=!h[v];var H=this._sectionHeaderHasChanged;!o&&H&&(o=H(this._getSectionHeaderData(t,v),this._getSectionHeaderData(this._dataBlob,v))),this._dirtySections.push(!!o),this._dirtyRows[_]=[];for(var I=0;I<this.rowIdentities[_].length;I++){var y=this.rowIdentities[_][I];o=!h[v]||!u[v][y]||this._rowHasChanged(this._getRowData(t,v,y),this._getRowData(this._dataBlob,v,y)),this._dirtyRows[_].push(!!o)}}}}]),h})();function _(t){for(var n=0,s=0;s<t.length;s++){n+=t[s].length}return n}function f(t){if(h(t))return{};for(var n={},s=0;s<t.length;s++){var o=t[s];c(!n[o],'Value appears more than once in array: '+o),n[o]=!0}return n}m.exports=w},285,[26,30,31,14,286,120]);