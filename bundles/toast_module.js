__d(function (g, r, i, a, m, e, d) {
  Object.defineProperty(e, "__esModule", {value: !0}), e.default = n, e.register = function () {
    g.moduleResolver.register(n, ['IMessage'])
  };
  var o = r(d[0]);

  function n() {
    return {
      name: function () {
        return 'ToastModule'
      }, message: function () {
        o.ToastAndroid.show('Hi from ToastModule', o.ToastAndroid.SHORT)
      }
    }
  }
}, 400, [2]);
