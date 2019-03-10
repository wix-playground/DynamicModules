export default function ModuleA() {
  function foo() {
    console.log('ModuleA.foo');
  }

  return {
    foo
  };
}

export function register() {
  global.moduleResolver.register(ModuleA, ['IA']);
}
