__d(function(g,r,i,a,m,e,d){'use strict';var t=r(d[0]),o=r(d[1]),l=r(d[2]),n=(r(d[3]),r(d[4])),s=o.roundToNearestPixel(.4);0===s&&(s=1/o.get());var u={position:'absolute',left:0,right:0,top:0,bottom:0};m.exports={hairlineWidth:s,absoluteFill:u,absoluteFillObject:u,compose:function(t,o){return null!=t&&null!=o?[t,o]:null!=t?t:o},flatten:n,setStyleAttributePreprocessor:function(o,n){var s;if(!0===l[o])s={};else{if('object'!=typeof l[o])return void console.error(o+" is not a valid style attribute");s=l[o]}l[o]=t({},s,{process:n})},create:function(t){return t}}},61,[55,62,65,82,83]);