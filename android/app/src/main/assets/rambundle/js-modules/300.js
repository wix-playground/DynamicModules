__d(function(g,r,i,a,m,e,d){'use strict';var n,t=r(d[0]),o=(r(d[1]),r(d[2]),r(d[3])),l=r(d[4]),u=r(d[5])('RCTSlider'),s=o.forwardRef(function(s,v){var f=l.compose(n.slider,s.style),c=s.onValueChange&&function(n){var t;t=null!=n.nativeEvent.fromUser&&n.nativeEvent.fromUser,s.onValueChange&&t&&s.onValueChange(n.nativeEvent.value)},p=c,C=s.onSlidingComplete&&function(n){s.onSlidingComplete&&s.onSlidingComplete(n.nativeEvent.value)};return o.createElement(u,t({},s,{ref:v,style:f,onChange:p,onSlidingComplete:C,onValueChange:c,enabled:!s.disabled,onStartShouldSetResponder:function(){return!0},onResponderTerminationRequest:function(){return!1}}))});s.defaultProps={disabled:!1,value:0,minimumValue:0,maximumValue:1,step:0},n=l.create({slider:{}}),m.exports=s},300,[19,87,52,57,61,169]);