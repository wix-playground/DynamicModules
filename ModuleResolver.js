export default function moduleResolver() {
  const modulesPerInterface = {};

  function register(module, interfaceNames) {
    let m = module();
    for (let interfaceName of interfaceNames) {
      modulesPerInterface[interfaceName] = m;
    }
  }

  function resolve(interfaceName) {
    return modulesPerInterface[interfaceName];
  }

  return {
    register,
    resolve
  };
}
