__d(function(g,r,i,a,m,e,d){'use strict';var E=r(d[0]),t=r(d[1]),R=r(d[2]),_=r(d[3]),s=(r(d[4]),r(d[5])),S=r(d[6]),o=r(d[7]),n=r(d[8]),l=r(d[9]),N=(r(d[10]),r(d[11])),T=(r(d[12]),N({NOT_RESPONDER:null,RESPONDER_INACTIVE_PRESS_IN:null,RESPONDER_INACTIVE_PRESS_OUT:null,RESPONDER_ACTIVE_PRESS_IN:null,RESPONDER_ACTIVE_PRESS_OUT:null,RESPONDER_ACTIVE_LONG_PRESS_IN:null,RESPONDER_ACTIVE_LONG_PRESS_OUT:null,ERROR:null})),h={NOT_RESPONDER:!1,RESPONDER_INACTIVE_PRESS_IN:!1,RESPONDER_INACTIVE_PRESS_OUT:!1,RESPONDER_ACTIVE_PRESS_IN:!1,RESPONDER_ACTIVE_PRESS_OUT:!1,RESPONDER_ACTIVE_LONG_PRESS_IN:!1,RESPONDER_ACTIVE_LONG_PRESS_OUT:!1,ERROR:!1},P=E({},h,{RESPONDER_ACTIVE_PRESS_OUT:!0,RESPONDER_ACTIVE_PRESS_IN:!0}),O=E({},h,{RESPONDER_INACTIVE_PRESS_IN:!0,RESPONDER_ACTIVE_PRESS_IN:!0,RESPONDER_ACTIVE_LONG_PRESS_IN:!0}),u=E({},h,{RESPONDER_ACTIVE_LONG_PRESS_IN:!0}),D=N({DELAY:null,RESPONDER_GRANT:null,RESPONDER_RELEASE:null,RESPONDER_TERMINATED:null,ENTER_PRESS_RECT:null,LEAVE_PRESS_RECT:null,LONG_PRESS_DETECTED:null}),c={NOT_RESPONDER:{DELAY:T.ERROR,RESPONDER_GRANT:T.RESPONDER_INACTIVE_PRESS_IN,RESPONDER_RELEASE:T.ERROR,RESPONDER_TERMINATED:T.ERROR,ENTER_PRESS_RECT:T.ERROR,LEAVE_PRESS_RECT:T.ERROR,LONG_PRESS_DETECTED:T.ERROR},RESPONDER_INACTIVE_PRESS_IN:{DELAY:T.RESPONDER_ACTIVE_PRESS_IN,RESPONDER_GRANT:T.ERROR,RESPONDER_RELEASE:T.NOT_RESPONDER,RESPONDER_TERMINATED:T.NOT_RESPONDER,ENTER_PRESS_RECT:T.RESPONDER_INACTIVE_PRESS_IN,LEAVE_PRESS_RECT:T.RESPONDER_INACTIVE_PRESS_OUT,LONG_PRESS_DETECTED:T.ERROR},RESPONDER_INACTIVE_PRESS_OUT:{DELAY:T.RESPONDER_ACTIVE_PRESS_OUT,RESPONDER_GRANT:T.ERROR,RESPONDER_RELEASE:T.NOT_RESPONDER,RESPONDER_TERMINATED:T.NOT_RESPONDER,ENTER_PRESS_RECT:T.RESPONDER_INACTIVE_PRESS_IN,LEAVE_PRESS_RECT:T.RESPONDER_INACTIVE_PRESS_OUT,LONG_PRESS_DETECTED:T.ERROR},RESPONDER_ACTIVE_PRESS_IN:{DELAY:T.ERROR,RESPONDER_GRANT:T.ERROR,RESPONDER_RELEASE:T.NOT_RESPONDER,RESPONDER_TERMINATED:T.NOT_RESPONDER,ENTER_PRESS_RECT:T.RESPONDER_ACTIVE_PRESS_IN,LEAVE_PRESS_RECT:T.RESPONDER_ACTIVE_PRESS_OUT,LONG_PRESS_DETECTED:T.RESPONDER_ACTIVE_LONG_PRESS_IN},RESPONDER_ACTIVE_PRESS_OUT:{DELAY:T.ERROR,RESPONDER_GRANT:T.ERROR,RESPONDER_RELEASE:T.NOT_RESPONDER,RESPONDER_TERMINATED:T.NOT_RESPONDER,ENTER_PRESS_RECT:T.RESPONDER_ACTIVE_PRESS_IN,LEAVE_PRESS_RECT:T.RESPONDER_ACTIVE_PRESS_OUT,LONG_PRESS_DETECTED:T.ERROR},RESPONDER_ACTIVE_LONG_PRESS_IN:{DELAY:T.ERROR,RESPONDER_GRANT:T.ERROR,RESPONDER_RELEASE:T.NOT_RESPONDER,RESPONDER_TERMINATED:T.NOT_RESPONDER,ENTER_PRESS_RECT:T.RESPONDER_ACTIVE_LONG_PRESS_IN,LEAVE_PRESS_RECT:T.RESPONDER_ACTIVE_LONG_PRESS_OUT,LONG_PRESS_DETECTED:T.RESPONDER_ACTIVE_LONG_PRESS_IN},RESPONDER_ACTIVE_LONG_PRESS_OUT:{DELAY:T.ERROR,RESPONDER_GRANT:T.ERROR,RESPONDER_RELEASE:T.NOT_RESPONDER,RESPONDER_TERMINATED:T.NOT_RESPONDER,ENTER_PRESS_RECT:T.RESPONDER_ACTIVE_LONG_PRESS_IN,LEAVE_PRESS_RECT:T.RESPONDER_ACTIVE_LONG_PRESS_OUT,LONG_PRESS_DETECTED:T.ERROR},error:{DELAY:T.NOT_RESPONDER,RESPONDER_GRANT:T.RESPONDER_INACTIVE_PRESS_IN,RESPONDER_RELEASE:T.NOT_RESPONDER,RESPONDER_TERMINATED:T.NOT_RESPONDER,ENTER_PRESS_RECT:T.NOT_RESPONDER,LEAVE_PRESS_RECT:T.NOT_RESPONDER,LONG_PRESS_DETECTED:T.NOT_RESPONDER}},A={Mixin:{componentDidMount:function(){R.isTV&&(this._tvEventHandler=new o,this._tvEventHandler.enable(this,function(E,t){var R=s.findNodeHandle(E);t.dispatchConfig={},R===t.tag&&('focus'===t.eventType?E.touchableHandleFocus(t):'blur'===t.eventType?E.touchableHandleBlur(t):'select'===t.eventType&&E.touchableHandlePress&&!E.props.disabled&&E.touchableHandlePress(t))}))},componentWillUnmount:function(){this._tvEventHandler&&(this._tvEventHandler.disable(),delete this._tvEventHandler),this.touchableDelayTimeout&&clearTimeout(this.touchableDelayTimeout),this.longPressDelayTimeout&&clearTimeout(this.longPressDelayTimeout),this.pressOutDelayTimeout&&clearTimeout(this.pressOutDelayTimeout)},touchableGetInitialState:function(){return{touchable:{touchState:void 0,responderID:null}}},touchableHandleResponderTerminationRequest:function(){return!this.props.rejectResponderTermination},touchableHandleStartShouldSetResponder:function(){return!this.props.disabled},touchableLongPressCancelsPress:function(){return!0},touchableHandleResponderGrant:function(E){var t=E.currentTarget;E.persist(),this.pressOutDelayTimeout&&clearTimeout(this.pressOutDelayTimeout),this.pressOutDelayTimeout=null,this.state.touchable.touchState=T.NOT_RESPONDER,this.state.touchable.responderID=t,this._receiveSignal(D.RESPONDER_GRANT,E);var R=void 0!==this.touchableGetHighlightDelayMS?Math.max(this.touchableGetHighlightDelayMS(),0):130;0!==(R=isNaN(R)?130:R)?this.touchableDelayTimeout=setTimeout(this._handleDelay.bind(this,E),R):this._handleDelay(E);var _=void 0!==this.touchableGetLongPressDelayMS?Math.max(this.touchableGetLongPressDelayMS(),10):370;_=isNaN(_)?370:_,this.longPressDelayTimeout=setTimeout(this._handleLongDelay.bind(this,E),_+R)},touchableHandleResponderRelease:function(E){this._receiveSignal(D.RESPONDER_RELEASE,E)},touchableHandleResponderTerminate:function(E){this._receiveSignal(D.RESPONDER_TERMINATED,E)},touchableHandleResponderMove:function(E){if(this.state.touchable.touchState!==T.RESPONDER_INACTIVE_PRESS_IN&&this.state.touchable.positionOnActivate){var t=this.state.touchable.positionOnActivate,R=this.state.touchable.dimensionsOnActivate,_=this.touchableGetPressRectOffset?this.touchableGetPressRectOffset():{left:20,right:20,top:20,bottom:20},s=_.left,S=_.top,o=_.right,l=_.bottom,N=this.touchableGetHitSlop?this.touchableGetHitSlop():null;N&&(s+=N.left,S+=N.top,o+=N.right,l+=N.bottom);var h=n.extractSingleTouch(E.nativeEvent),P=h&&h.pageX,O=h&&h.pageY;if(this.pressInLocation)this._getDistanceBetweenPoints(P,O,this.pressInLocation.pageX,this.pressInLocation.pageY)>10&&this._cancelLongPressDelayTimeout();if(P>t.left-s&&O>t.top-S&&P<t.left+R.width+o&&O<t.top+R.height+l)this._receiveSignal(D.ENTER_PRESS_RECT,E),this.state.touchable.touchState===T.RESPONDER_INACTIVE_PRESS_IN&&this._cancelLongPressDelayTimeout();else this._cancelLongPressDelayTimeout(),this._receiveSignal(D.LEAVE_PRESS_RECT,E)}},touchableHandleFocus:function(E){this.props.onFocus&&this.props.onFocus(E)},touchableHandleBlur:function(E){this.props.onBlur&&this.props.onBlur(E)},_remeasureMetricsOnActivation:function(){var E=this.state.touchable.responderID;null!=E&&l.measure(E,this._handleQueryLayout)},_handleQueryLayout:function(E,R,s,S,o,n){(E||R||s||S||o||n)&&(this.state.touchable.positionOnActivate&&_.release(this.state.touchable.positionOnActivate),this.state.touchable.dimensionsOnActivate&&t.release(this.state.touchable.dimensionsOnActivate),this.state.touchable.positionOnActivate=_.getPooled(o,n),this.state.touchable.dimensionsOnActivate=t.getPooled(s,S))},_handleDelay:function(E){this.touchableDelayTimeout=null,this._receiveSignal(D.DELAY,E)},_handleLongDelay:function(E){this.longPressDelayTimeout=null;var t=this.state.touchable.touchState;t!==T.RESPONDER_ACTIVE_PRESS_IN&&t!==T.RESPONDER_ACTIVE_LONG_PRESS_IN?console.error('Attempted to transition from state `'+t+'` to `'+T.RESPONDER_ACTIVE_LONG_PRESS_IN+"`, which is not supported. This is most likely due to `Touchable.longPressDelayTimeout` not being cancelled."):this._receiveSignal(D.LONG_PRESS_DETECTED,E)},_receiveSignal:function(E,t){var R=this.state.touchable.responderID,_=this.state.touchable.touchState,s=c[_]&&c[_][E];if(R||E!==D.RESPONDER_RELEASE){if(!s)throw new Error('Unrecognized signal `'+E+'` or state `'+_+'` for Touchable responder `'+R+'`');if(s===T.ERROR)throw new Error('Touchable cannot transition from `'+_+'` to `'+E+'` for responder `'+R+'`');_!==s&&(this._performSideEffectsForTransition(_,s,E,t),this.state.touchable.touchState=s)}},_cancelLongPressDelayTimeout:function(){this.longPressDelayTimeout&&clearTimeout(this.longPressDelayTimeout),this.longPressDelayTimeout=null},_isHighlight:function(E){return E===T.RESPONDER_ACTIVE_PRESS_IN||E===T.RESPONDER_ACTIVE_LONG_PRESS_IN},_savePressInLocation:function(E){var t=n.extractSingleTouch(E.nativeEvent),R=t&&t.pageX,_=t&&t.pageY,s=t&&t.locationX,S=t&&t.locationY;this.pressInLocation={pageX:R,pageY:_,locationX:s,locationY:S}},_getDistanceBetweenPoints:function(E,t,R,_){var s=E-R,S=t-_;return Math.sqrt(s*s+S*S)},_performSideEffectsForTransition:function(E,t,R,_){var s=this._isHighlight(E),S=this._isHighlight(t);if((R===D.RESPONDER_TERMINATED||R===D.RESPONDER_RELEASE)&&this._cancelLongPressDelayTimeout(),!P[E]&&P[t]&&this._remeasureMetricsOnActivation(),O[E]&&R===D.LONG_PRESS_DETECTED&&this.touchableHandleLongPress&&this.touchableHandleLongPress(_),S&&!s?this._startHighlight(_):!S&&s&&this._endHighlight(_),O[E]&&R===D.RESPONDER_RELEASE){var o=!!this.props.onLongPress,n=u[E]&&(!o||!this.touchableLongPressCancelsPress());(!u[E]||n)&&this.touchableHandlePress&&(S||s||(this._startHighlight(_),this._endHighlight(_)),this._playTouchSound(),this.touchableHandlePress(_))}this.touchableDelayTimeout&&clearTimeout(this.touchableDelayTimeout),this.touchableDelayTimeout=null},_playTouchSound:function(){l.playTouchSound()},_startHighlight:function(E){this._savePressInLocation(E),this.touchableHandleActivePressIn&&this.touchableHandleActivePressIn(E)},_endHighlight:function(E){var t=this;this.touchableHandleActivePressOut&&(this.touchableGetPressOutDelayMS&&this.touchableGetPressOutDelayMS()?this.pressOutDelayTimeout=setTimeout(function(){t.touchableHandleActivePressOut(E)},this.touchableGetPressOutDelayMS()):this.touchableHandleActivePressOut(E))}},TOUCH_TARGET_DEBUG:!1,renderDebugView:function(E){E.color,E.hitSlop;if(!A.TOUCH_TARGET_DEBUG)return null;throw Error('Touchable.TOUCH_TARGET_DEBUG should not be enabled in prod!')}};S.create({debug:{position:'absolute',borderWidth:1,borderStyle:'dashed'}});m.exports=A},196,[55,197,52,199,57,87,61,200,201,51,84,202,68]);