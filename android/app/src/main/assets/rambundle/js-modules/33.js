__d(function(g,r,i,a,m,e,d){'use strict';r(d[0]);var n=!1,t=0,c={installReactHook:function(){!0},setEnabled:function(t){n!==t&&(n=t)},isEnabled:function(){return n},beginEvent:function(t,c){n&&(t='function'==typeof t?t():t,g.nativeTraceBeginSection(131072,t,c))},endEvent:function(){n&&g.nativeTraceEndSection(131072)},beginAsyncEvent:function(c){var o=t;return n&&(t++,c='function'==typeof c?c():c,g.nativeTraceBeginAsyncSection(131072,c,o)),o},endAsyncEvent:function(t,c){n&&(t='function'==typeof t?t():t,g.nativeTraceEndAsyncSection(131072,t,c))},counterEvent:function(t,c){n&&(t='function'==typeof t?t():t,g.nativeTraceCounter&&g.nativeTraceCounter(131072,t,c))}};m.exports=c},33,[14]);