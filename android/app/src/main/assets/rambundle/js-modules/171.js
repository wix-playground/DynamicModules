__d(function(g,r,i,a,m,e,d){'use strict';var n=r(d[0]),t=r(d[1]),s=r(d[2]),u=r(d[3]),o=r(d[4]),l=r(d[5]),c=r(d[6]),v=r(d[7]),p=r(d[8]),b=r(d[9]),f=r(d[10]),y=r(d[11]);var C=!1;function E(n){u.ViewManagerNames||u.LazyViewManagersEnabled?n=T(n,u.getDefaultEventTypes()):(n.bubblingEventTypes=T(n.bubblingEventTypes,u.genericBubblingEventTypes),n.directEventTypes=T(n.directEventTypes,u.genericDirectEventTypes))}function T(n,t){if(!t)return n;if(!n)return t;for(var s in t)if(t.hasOwnProperty(s)){var u=t[s];if(n.hasOwnProperty(s)){var o=n[s];'object'==typeof u&&'object'==typeof o&&(u=T(o,u))}n[s]=u}return n}function w(n){switch(n){case'CATransform3D':return l;case'CGPoint':return c;case'CGSize':return b;case'UIEdgeInsets':return o}return null}function I(n){switch(n){case'CGColor':case'UIColor':return v;case'CGColorArray':case'UIColorArray':return N;case'CGImage':case'UIImage':case'RCTImageSource':return p;case'Color':return v;case'ColorArray':return N}return null}function N(n){return null==n?null:n.map(v)}m.exports=function(o){var l=u.getViewManagerConfig(o);f(null!=l&&null!=l.NativeProps,'requireNativeComponent: "%s" was not found in the UIManager.',o);for(var c=l.baseModuleName,v=l.bubblingEventTypes,p=l.directEventTypes,b=l.NativeProps;c;){var T=u.getViewManagerConfig(c);T?(v=t({},T.bubblingEventTypes,v),p=t({},T.directEventTypes,p),b=t({},T.NativeProps,b),c=T.baseModuleName):(y(!1,'Base module "%s" does not exist',c),c=null)}var N={};for(var M in b){var P=b[M],h=w(P),A=I(P);N[M]=null==h&&null==A||{diff:h,process:A}}return N.style=s,n(l,{uiViewClassName:o,validAttributes:N,bubblingEventTypes:v,directEventTypes:p}),C||(E(l),C=!0),l}},171,[19,55,65,51,172,173,174,78,175,81,14,120]);