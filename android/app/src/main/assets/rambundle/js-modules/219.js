__d(function(g,r,i,a,m,e,d){'use strict';var t,n=r(d[0]).NativeAnimatedModule,o=r(d[1]),s=r(d[2]),u=1,c=1,f={createAnimatedNode:function(t,o){A(),n.createAnimatedNode(t,o)},startListeningToAnimatedNodeValue:function(t){A(),n.startListeningToAnimatedNodeValue(t)},stopListeningToAnimatedNodeValue:function(t){A(),n.stopListeningToAnimatedNodeValue(t)},connectAnimatedNodes:function(t,o){A(),n.connectAnimatedNodes(t,o)},disconnectAnimatedNodes:function(t,o){A(),n.disconnectAnimatedNodes(t,o)},startAnimatingNode:function(t,o,s,u){A(),n.startAnimatingNode(t,o,s,u)},stopAnimation:function(t){A(),n.stopAnimation(t)},setAnimatedNodeValue:function(t,o){A(),n.setAnimatedNodeValue(t,o)},setAnimatedNodeOffset:function(t,o){A(),n.setAnimatedNodeOffset(t,o)},flattenAnimatedNodeOffset:function(t){A(),n.flattenAnimatedNodeOffset(t)},extractAnimatedNodeOffset:function(t){A(),n.extractAnimatedNodeOffset(t)},connectAnimatedNodeToView:function(t,o){A(),n.connectAnimatedNodeToView(t,o)},disconnectAnimatedNodeFromView:function(t,o){A(),n.disconnectAnimatedNodeFromView(t,o)},dropAnimatedNode:function(t){A(),n.dropAnimatedNode(t)},addAnimatedEventToView:function(t,o,s){A(),n.addAnimatedEventToView(t,o,s)},removeAnimatedEventFromView:function(t,o,s){A(),n.removeAnimatedEventFromView(t,o,s)}},p={opacity:!0,transform:!0,borderRadius:!0,borderBottomEndRadius:!0,borderBottomLeftRadius:!0,borderBottomRightRadius:!0,borderBottomStartRadius:!0,borderTopEndRadius:!0,borderTopLeftRadius:!0,borderTopRightRadius:!0,borderTopStartRadius:!0,elevation:!0,shadowOpacity:!0,shadowRadius:!0,scaleX:!0,scaleY:!0,translateX:!0,translateY:!0},l={translateX:!0,translateY:!0,scale:!0,scaleX:!0,scaleY:!0,rotate:!0,rotateX:!0,rotateY:!0,perspective:!0},v={inputRange:!0,outputRange:!0,extrapolate:!0,extrapolateRight:!0,extrapolateLeft:!0};function A(){s(n,'Native animated module is not available')}var N=!1;m.exports={API:f,addWhitelistedStyleProp:function(t){p[t]=!0},addWhitelistedTransformProp:function(t){l[t]=!0},addWhitelistedInterpolationParam:function(t){v[t]=!0},validateStyles:function(t){for(var n in t)if(!p.hasOwnProperty(n))throw new Error("Style property '"+n+"' is not supported by native animated module")},validateTransform:function(t){t.forEach(function(t){if(!l.hasOwnProperty(t.property))throw new Error("Property '"+t.property+"' is not supported by native animated module")})},validateInterpolation:function(t){for(var n in t)if(!v.hasOwnProperty(n))throw new Error("Interpolation property '"+n+"' is not supported by native animated module")},generateNewNodeTag:function(){return u++},generateNewAnimationId:function(){return c++},assertNativeAnimatedModule:A,shouldUseNativeDriver:function(t){return t.useNativeDriver&&!n?(N||(console.warn("Animated: `useNativeDriver` is not supported because the native animated module is missing. Falling back to JS-based animation. To resolve this, add `RCTAnimation` module to this app, or remove `useNativeDriver`. More info: https://github.com/facebook/react-native/issues/11094#issuecomment-263240420"),N=!0),!1):t.useNativeDriver||!1},transformDataType:function(t){return'string'!=typeof t?t:/deg$/.test(t)?(parseFloat(t)||0)*Math.PI/180:parseFloat(t)||0},get nativeEventEmitter(){return t||(t=new o(n)),t}}},219,[16,129,14]);