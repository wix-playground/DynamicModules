__d(function(g,r,i,a,m,e,d){'use strict';var n=r(d[0]),t=r(d[1]),o=r(d[2]),s=r(d[3]),l=r(d[4]),u=r(d[5]),p=r(d[6]),c=r(d[7]),h=r(d[8]),f=r(d[9]),R=r(d[10]),H=r(d[11]),v=r(d[12]),T=r(d[13]),b=r(d[14]),S=r(d[15]),x=r(d[16]),C={top:20,left:20,right:20,bottom:30},P={validAttributes:c({},R.UIView,{isHighlighted:!0,numberOfLines:!0,ellipsizeMode:!0,allowFontScaling:!0,maxFontSizeMultiplier:!0,disabled:!0,selectable:!0,selectionColor:!0,adjustsFontSizeToFit:!0,minimumFontScale:!0,textBreakStrategy:!0,onTextLayout:!0}),directEventTypes:{topTextLayout:{registrationName:'onTextLayout'}},uiViewClassName:'RCTText'},w=(function(h){function R(){var n,o;t(this,R);for(var p=arguments.length,h=new Array(p),f=0;f<p;f++)h[f]=arguments[f];return(o=s(this,(n=l(R)).call.apply(n,[this].concat(h)))).state=c({},v.Mixin.touchableGetInitialState(),{isHighlighted:!1,createResponderHandlers:o._createResponseHandlers.bind(u(o)),responseHandlers:null}),o}return p(R,h),o(R,[{key:"render",value:function(){var t=this.props;return y(t)&&(t=c({},t,this.state.responseHandlers,{isHighlighted:this.state.isHighlighted})),null!=t.selectionColor&&(t=c({},t,{selectionColor:x(t.selectionColor)})),f.createElement(H.Consumer,null,function(o){return o?f.createElement(V,n({},t,{ref:t.forwardedRef})):f.createElement(H.Provider,{value:!0},f.createElement(M,n({},t,{ref:t.forwardedRef})))})}},{key:"_createResponseHandlers",value:function(){var n=this;return{onStartShouldSetResponder:function(){var t=n.props.onStartShouldSetResponder,o=null!=t&&t()||y(n.props);return o&&n._attachTouchHandlers(),o},onResponderGrant:function(t,o){S(n.touchableHandleResponderGrant)(t,o),null!=n.props.onResponderGrant&&n.props.onResponderGrant.call(n,t,o)},onResponderMove:function(t){S(n.touchableHandleResponderMove)(t),null!=n.props.onResponderMove&&n.props.onResponderMove.call(n,t)},onResponderRelease:function(t){S(n.touchableHandleResponderRelease)(t),null!=n.props.onResponderRelease&&n.props.onResponderRelease.call(n,t)},onResponderTerminate:function(t){S(n.touchableHandleResponderTerminate)(t),null!=n.props.onResponderTerminate&&n.props.onResponderTerminate.call(n,t)},onResponderTerminationRequest:function(){var t=n.props.onResponderTerminationRequest;return!!S(n.touchableHandleResponderTerminationRequest)()&&(null==t||t())}}}},{key:"_attachTouchHandlers",value:function(){var n=this;if(null==this.touchableGetPressRectOffset){for(var t in v.Mixin)'function'==typeof v.Mixin[t]&&(this[t]=v.Mixin[t].bind(this));this.touchableHandleActivePressIn=function(){!n.props.suppressHighlighting&&y(n.props)&&n.setState({isHighlighted:!0})},this.touchableHandleActivePressOut=function(){!n.props.suppressHighlighting&&y(n.props)&&n.setState({isHighlighted:!1})},this.touchableHandlePress=function(t){null!=n.props.onPress&&n.props.onPress(t)},this.touchableHandleLongPress=function(t){null!=n.props.onLongPress&&n.props.onLongPress(t)},this.touchableGetPressRectOffset=function(){return null==n.props.pressRetentionOffset?C:n.props.pressRetentionOffset}}}}],[{key:"getDerivedStateFromProps",value:function(n,t){return null==t.responseHandlers&&y(n)?{responseHandlers:t.createResponderHandlers()}:null}}]),R})(f.Component);w.defaultProps={accessible:!0,allowFontScaling:!0,ellipsizeMode:'tail'},w.viewConfig=P;var y=function(n){return null!=n.onPress||null!=n.onLongPress||null!=n.onStartShouldSetResponder},M=b(P.uiViewClassName,function(){return P}),V=null==T.getViewManagerConfig('RCTVirtualText')?M:b('RCTVirtualText',function(){return{validAttributes:c({},R.UIView,{isHighlighted:!0,maxFontSizeMultiplier:!0}),uiViewClassName:'RCTVirtualText'}}),F=f.forwardRef(function(t,o){return f.createElement(w,n({},t,{forwardedRef:o}))});F.displayName='Text',F.propTypes=h,m.exports=F},191,[19,30,31,38,41,40,44,55,192,57,186,85,196,51,170,203,78]);