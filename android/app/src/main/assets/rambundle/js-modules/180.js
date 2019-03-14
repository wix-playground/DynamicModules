__d(function(g,r,i,a,m,e,d){'use strict';var t=r(d[0]),n=r(d[1]),o=r(d[2]),l=r(d[3]),u=r(d[4]),s=r(d[5]),f=r(d[6]),c=r(d[7]),h=r(d[8]),p=r(d[9]),v=r(d[10]),y=r(d[11]),b=r(d[12]),k=r(d[13]);function S(t,n){if(null==t||null==n)return!0;if(t.length!==n.length)return!0;for(var o=0;o<t.length;o++)if(t[o]!==n[o])return!0;return!1}var w=b(v.UIView,{}),x={transform:{diff:S},opacity:!0},C=b(x,{clipping:{diff:S}}),T=b(x,{fill:{diff:S},stroke:{diff:S},strokeWidth:!0,strokeCap:!0,strokeJoin:!0,strokeDash:{diff:S}}),_=b(T,{d:{diff:S}}),A=b(T,{alignment:!0,frame:{diff:function(t,n){if(t===n)return!1;if(t.font!==n.font){if(null===t.font)return!0;if(null===n.font)return!0;if(t.font.fontFamily!==n.font.fontFamily||t.font.fontSize!==n.font.fontSize||t.font.fontWeight!==n.font.fontWeight||t.font.fontStyle!==n.font.fontStyle)return!0}return S(t.lines,n.lines)}},path:{diff:S}}),R=y('ARTSurfaceView',function(){return{validAttributes:w,uiViewClassName:'ARTSurfaceView'}}),W=y('ARTGroup',function(){return{validAttributes:C,uiViewClassName:'ARTGroup'}}),J=y('ARTShape',function(){return{validAttributes:_,uiViewClassName:'ARTShape'}}),V=y('ARTText',function(){return{validAttributes:A,uiViewClassName:'ARTText'}});function G(t){return t?'string'==typeof t?t:t.length?t.join('\n'):'':''}var I=(function(s){function f(){return t(this,f),o(this,l(f).apply(this,arguments))}return u(f,s),n(f,[{key:"getChildContext",value:function(){return{isInSurface:!0}}},{key:"render",value:function(){var t=N(this.props.height,0),n=N(this.props.width,0);return h.createElement(R,{style:[this.props.style,{height:t,width:n}]},this.props.children)}}]),f})(h.Component);function N(t,n){return null==t?n:+t}I.childContextTypes={isInSurface:p.bool};var z=new c;function D(t){var n=null!=t.scaleX?t.scaleX:null!=t.scale?t.scale:1,o=null!=t.scaleY?t.scaleY:null!=t.scale?t.scale:1;return z.transformTo(1,0,0,1,0,0).move(t.x||0,t.y||0).rotate(t.rotation||0,t.originX,t.originY).scale(n,o,t.originX,t.originY),null!=t.transform&&z.transform(t.transform),[z.xx,z.yx,z.xy,z.yy,z.x,z.y]}function E(t){return!1===t.visible?0:null==t.opacity?1:+t.opacity}var F=(function(s){function f(){return t(this,f),o(this,l(f).apply(this,arguments))}return u(f,s),n(f,[{key:"render",value:function(){var t=this.props;return k(this.context.isInSurface,'ART: <Group /> must be a child of a <Surface />'),h.createElement(W,{opacity:E(t),transform:D(t)},this.props.children)}}]),f})(h.Component);F.contextTypes={isInSurface:p.bool.isRequired};var M=(function(s){function f(){return t(this,f),o(this,l(f).apply(this,arguments))}return u(f,s),n(f,[{key:"render",value:function(){var t=this.props,n=[N(t.x,0),N(t.y,0),N(t.width,0),N(t.height,0)],o=b(t);return delete o.x,delete o.y,h.createElement(W,{clipping:n,opacity:E(t),transform:D(o)},this.props.children)}}]),f})(h.Component),P=0,X=1,Y=2,O=3;function q(t,n,o){var l=new s(t);n[o+0]=l.red/255,n[o+1]=l.green/255,n[o+2]=l.blue/255,n[o+3]=l.alpha}function j(t,n,o){var l=0;if('length'in t)for(;l<t.length;)q(t[l],n,o+4*l),l++;else for(var u in t)q(t[u],n,o+4*l),l++;return o+4*l}function L(t,n,o,l,u){var s,f=0;if('length'in t)for(;f<t.length;)s=f/(t.length-1)*l,n[o+f]=u?1-s:s,f++;else for(var c in t)s=+c*l,n[o+f]=u?1-s:s,f++;return o+f}function U(t,n,o){L(t,n,j(t,n,o),1,!1)}function $(t,n,o){var l=j(t,n,o);L(t,n,l=L(t,n,l=j(t,n,l),.5,!1),.5,!0)}function B(t,n){var o=t[0],l=+n.width,u=+n.height;o===X?(t[1]*=l,t[2]*=u,t[3]*=l,t[4]*=u):o===Y&&(t[1]*=l,t[2]*=u,t[3]*=l,t[4]*=u,t[5]*=l,t[6]*=u)}function H(t,n){if(null==t)return null;if(t._brush)return t._bb&&(B(t._brush,n),t._bb=!1),t._brush;var o=new s(t);return[P,o.red/255,o.green/255,o.blue/255,o.alpha]}function K(t){if(null==t)return null;var n=new s(t);return[n.red/255,n.green/255,n.blue/255,n.alpha]}function Q(t){switch(t){case'butt':return 0;case'square':return 2;default:return 1}}function Z(t){switch(t){case'miter':return 0;case'bevel':return 2;default:return 1}}var tt=(function(s){function c(){return t(this,c),o(this,l(c).apply(this,arguments))}return u(c,s),n(c,[{key:"render",value:function(){var t=this.props,n=t.d||G(t.children),o=(n instanceof f?n:new f(n)).toJSON();return h.createElement(J,{fill:H(t.fill,t),opacity:E(t),stroke:K(t.stroke),strokeCap:Q(t.strokeCap),strokeDash:t.strokeDash||null,strokeJoin:Z(t.strokeJoin),strokeWidth:N(t.strokeWidth,1),transform:D(t),d:o})}}]),c})(h.Component),nt={},et=/^[\s"']*/,rt=/[\s"']*$/;function it(t){return t.split(',')[0].replace(et,'').replace(rt,'')}function ot(t){if(nt.hasOwnProperty(t))return nt[t];var n=/^\s*((?:(?:normal|bold|italic)\s+)*)(?:(\d+(?:\.\d+)?)[ptexm\%]*(?:\s*\/.*?)?\s+)?\s*\"?([^\"]*)/i.exec(t);if(!n)return null;var o=it(n[3]),l=+n[2]||12,u=/bold/.exec(n[1]),s=/italic/.exec(n[1]);return nt[t]={fontFamily:o,fontSize:l,fontWeight:u?'bold':'normal',fontStyle:s?'italic':'normal'},nt[t]}function lt(t){return null==t?null:'string'==typeof t?ot(t):{fontFamily:it(t.fontFamily),fontSize:+t.fontSize||12,fontWeight:null!=t.fontWeight?t.fontWeight.toString():'400',fontStyle:t.fontStyle}}var ut=/\n/g;function at(t){switch(t){case'right':return 1;case'center':return 2;default:return 0}}var st=(function(s){function c(){return t(this,c),o(this,l(c).apply(this,arguments))}return u(c,s),n(c,[{key:"render",value:function(){var t,n,o=this.props,l=o.path,u=l?(l instanceof f?l:new f(l)).toJSON():null,s=(t=o.font,n=G(o.children),{font:lt(t),lines:n.split(ut)});return h.createElement(V,{fill:H(o.fill,o),opacity:E(o),stroke:K(o.stroke),strokeCap:Q(o.strokeCap),strokeDash:o.strokeDash||null,strokeJoin:Z(o.strokeJoin),strokeWidth:N(o.strokeWidth,1),transform:D(o),alignment:at(o.alignment),frame:s,path:u})}}]),c})(h.Component);var ft={LinearGradient:function(t,n,o,l,u){var s=X;if(arguments.length<5){var f=(null==n?270:n)*Math.PI/180,c=Math.cos(f),h=-Math.sin(f),p=(Math.abs(c)+Math.abs(h))/2;n=.5-(c*=p),l=.5+c,o=.5-(h*=p),u=.5+h,this._bb=!0}else this._bb=!1;var v=[s,+n,+o,+l,+u];U(t,v,5),this._brush=v},RadialGradient:function(t,n,o,l,u,s,f){null==u&&(u=l),null==s&&(s=n),null==f&&(f=o),null==n?(n=o=l=u=s=f=.5,this._bb=!0):this._bb=!1;var c=[Y,+n,+o,2*+l,2*+u,+s,+f];$(t,c,7),this._brush=c},Pattern:function(t,n,o,l,u){this._brush=[O,t,+l||0,+u||0,+n,+o]},Transform:c,Path:f,Surface:I,Group:F,ClippingRectangle:M,Shape:tt,Text:st};m.exports=ft},180,[30,31,38,41,44,181,182,185,57,70,186,170,187,14]);