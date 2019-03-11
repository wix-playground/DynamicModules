export default function ConsoleModule() {
  function name() {
    return 'ConsoleModule';
  }

  function message() {
    console.log('Hi from ConsoleModule');
  }

  return {
    name,
    message
  };
}

export function register() {
  global.moduleResolver.register(ConsoleModule, ['IMessage']);
}
