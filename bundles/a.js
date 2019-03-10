__d(function (g, r, i, a, m, e, d) {
  function o() {
    return {
      foo: function () {
        console.log('ModuleA.foo')
      }
    }
  }

  Object.defineProperty(e, "__esModule", {value: !0}), e.default = o, e.register = function () {
    g.moduleResolver.register(o, ['IA'])
  }
}, 400, []);
