__d(function (g, r, i, a, m, e, d) {
  function o() {
    return {
      name: function () {
        return 'ConsoleModule'
      }, message: function () {
        console.log('Hi from ConsoleModule')
      }
    }
  }

  Object.defineProperty(e, "__esModule", {value: !0}), e.default = o, e.register = function () {
    g.moduleResolver.register(o, ['IMessage'])
  }
}, 400, []);
