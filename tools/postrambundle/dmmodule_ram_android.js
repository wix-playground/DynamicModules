// bundle file should be used to find entry point

// create buildconfig.json : {"entry_index":...}

// for every js-modules/ file:
//    filter if it should be added into result (see dbmodule.js)
//    add $__dmIdx=$__BASE_INDEX
//    generalize index and deps in __d() func

const fs = require('fs');
const fsExtra = require('fs-extra');
const path = require('path');
const minimist = require('minimist');

const args = minimist(process.argv.slice(2));

const bundle = args['bundle'];
const jsModulesDir = args['js-modules-dir'];
const outDir = args['out-dir'];
const jsModulesOutDir = `${outDir}/js-modules`;
const base__d = args['base__d'];

const tmpModule__d = './tmp/module__d.js';

try {
  fs.unlinkSync(`${outDir}/buildconfig.json`);
} catch (e) {
}

try {
  fs.unlinkSync(tmpModule__d);
} catch (e) {
}

if (!fs.existsSync(jsModulesOutDir)) {
  fs.mkdirSync(jsModulesOutDir);
} else {
  fsExtra.emptyDirSync(jsModulesOutDir);
}


const baseMap = {}; // func -> idx
const moduleMap = []; // idx -> {func, dependencies}
const moduleConfig = {entry_point: 0, last_module_index: 0};
const resultMap = []; // originalIdx -> {newIdx, newDeps} (newIdx is '$__dmIdx+originalIndex')

function is__rLine(line) {
  return line.startsWith('__r(');
}

function loadBaseMap() {
  require(base__d)(baseMap);
}

function loadModuleMap() {
  function __d(func, idx, dependencies) {
    moduleMap[idx] = {
      func: func.toString(),
      deps: dependencies
    };
  }

  function __r(idx) {
    moduleConfig.entry_point = idx;
  }

  fs.appendFileSync(tmpModule__d, 'module.exports = function (moduleMap, moduleConfig) {\n');
  fs.appendFileSync(tmpModule__d, __d.toString() + '\n');
  fs.appendFileSync(tmpModule__d, __r.toString() + '\n');

  // write content of all js-modules/*.js to tmpModule__d
  const files = fs.readdirSync(jsModulesDir);
  const jsFiles = files.filter((file) => {
    return path.extname(file) === '.js';
  });

  for (let jsFile of jsFiles) {
    const content = fs.readFileSync(`${jsModulesDir}/${jsFile}`);
    fs.appendFileSync(tmpModule__d, content + '\n');
  }

  // write all __r() calls from bundle file to tmpModule__d
  fs.readFileSync(bundle).toString().split('\n').forEach((line) => {
    if (is__rLine(line)) {
      fs.appendFileSync(tmpModule__d, line + '\n');
    }
  });

  fs.appendFileSync(tmpModule__d, '}');

  require(tmpModule__d)(moduleMap, moduleConfig);
}

function evalResultMap() {
  addToResultMap(moduleConfig.entry_point);
}

function addToResultMap(idx) {
  const newIdx = `$__dmIdx+${idx}`;

  resultMap[idx] = {
    newIdx,
    deps: []
  };

  const originalDeps = moduleMap[idx].deps;

  // console.log('oroginalDeps: ' + originalDeps.toString());
  // let func = moduleMap[originalDeps[0]].func.trim();
  // console.log('finc: ' + func);
  // const baseIdx = baseMap[func];
  // console.log('basIdx: ' + baseIdx);
  // return;

  resultMap[idx].deps = resolveDependencies(originalDeps);
}

function resolveDependencies(originalDeps) {
  const newDeps = [];

  for (let originalIdx of originalDeps) {
    // try to find a func in resultMap
    const resultVal = resultMap[originalIdx];
    if (resultVal) {
      newDeps.push(resultVal.newIdx);
      continue;
    }

    // try to find a func in baseMap
    const baseIdx = baseMap[moduleMap[originalIdx].func];
    if (baseIdx) {
      newDeps.push(baseIdx);
      continue;
    }

    // if func is not found then add it into resultMap
    addToResultMap(originalIdx);
    newDeps.push(resultMap[originalIdx].newIdx);
  }

  return newDeps;
}

function createResultBundle() {
  for (let i = 0; i < resultMap.length; i++) {
    const resultVal = resultMap[i];
    if (resultVal) {
      const func = moduleMap[i].func;
      const idx = resultVal.newIdx;
      const deps = `[${resultVal.deps.toString()}]`;

      moduleConfig.last_module_index = i;

      const out = `${jsModulesOutDir}/${i}.js`;
      fs.appendFileSync(out, '$__dmIdx=$__BASE_INDEX;\n');
      fs.appendFileSync(out, `__d(${func},${idx},${deps});`);
    }
  }

  fs.appendFileSync(`${outDir}/buildconfig.json`, JSON.stringify(moduleConfig));
}

// =========

function consoleBaseMap() {
  for (let func in baseMap) {
    if (baseMap[func] === 13) {
      console.log(func + ' | ' + baseMap[func]);
      break;
    }
  }
}

function consoleModuleMap() {
  for (let i = 0; i < moduleMap.length; i++) {
    if (moduleMap[i]) {
      console.log(`${i} | ${moduleMap[i].func} | ${moduleMap[i].deps}`);
    }
  }
}

// =========

loadBaseMap();

//consoleBaseMap();

loadModuleMap();

//consoleModuleMap();

evalResultMap();
createResultBundle();

