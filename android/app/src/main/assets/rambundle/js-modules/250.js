__d(function(g,r,i,a,m,e,d){'use strict';var t=r(d[0]),o=r(d[1]),n={setGlobalOptions:function(n){if(void 0!==n.debug&&o(t.FrameRateLogger,'Trying to debug FrameRateLogger without the native module!'),t.FrameRateLogger){var c={debug:!!n.debug,reportStackTraces:!!n.reportStackTraces};Object.freeze(c),Object.seal(c),t.FrameRateLogger.setGlobalOptions(c)}},setContext:function(o){t.FrameRateLogger&&t.FrameRateLogger.setContext(o)},beginScroll:function(){t.FrameRateLogger&&t.FrameRateLogger.beginScroll()},endScroll:function(){t.FrameRateLogger&&t.FrameRateLogger.endScroll()}};m.exports=n},250,[16,14]);