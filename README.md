# Dynamic modules
Client-side runtime jsbundle merger

## base application code
* Copy into your project ModuleResolver.js and ModuleRegistrar.js files.
* Add into your entry file following statements:
    ```
    global.moduleResolver = moduleResolver();
    moduleRegistrar();
    ```
* Use your modules via moduleResolver, for example:
    ```
    const module = global.moduleResolver.resolve('IMessage');
    if (module) {
      module.message();
    }
    ```

## module code
Every module must to export two functions: 
* a default function providing module API
* a function register() that will be used by ModuleRegistrar to register this module

**Example of simple module**
```
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
```  

## Plain JSBundle transformation

### base application
Use following command to transform base app jsbundle:
```
node dmbase.js --bundle={jsbundle_file_name} --out-dir={output_dir_name}
```
The output is 4 files: base.js, reg.js, end.js and buildconfig.json.

### module
Use following command to transform base app jsbundle:
```
node dmmodule.js --base={base_js_file} --bundle={module_jsbundle_file_name} --out={output_file_name}
```

## RAM JSBundle transformation
// TODO


## Client-side usage


### Android
* Put the base app files (base.js, reg.js, end.js and buildconfig.json) under *assets/bundle* folder
* Use PlainBundleBuilder class instance to create resulting jsbundle, for example:
```
    private void buildBundle() throws IOException, JSONException {
        final String[] moduleNames = SwitchModuleHelper.currentModules(this);
        ISource modules = new ISource() {
            @NonNull
            @Override
            public String[] names() {
                return moduleNames;
            }

            @Override
            public InputStream open(@NonNull String name) throws IOException {
                return getAssets().open("bundle/modules/" + name);
            }
        };

        PlainBundleBuilder builder = new PlainBundleBuilder(this, modules, bundleName());
        builder.build();
    }
```

### iOS
// TODO

