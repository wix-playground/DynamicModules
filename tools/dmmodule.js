const fs = require('fs');
const minimist = require('minimist');

// load 'base.js' into file map, where '__d(... until fileIndex' is key and fileIndex is value
// handle module bundle by checking all dependencies => build second map
// build 'module.js' from second map

const args = minimist(process.argv.slice(2));

const bundle = args['bundle'];
const out = args['out'];
const base = args['base'];

const tmpBase__d = './tmp/base__d.js';
const tmpModule__d = './tmp/module__d.js';

// first of all some cleaning
try {
  fs.unlinkSync(out);
} catch (e) {
}

try {
  fs.unlinkSync(tmpBase__d);
} catch (e) {
}

try {
  fs.unlinkSync(tmpModule__d);
} catch (e) {
}


const baseMap = {}; // func -> idx
const moduleMap = []; // idx -> {func, dependencies}
const moduleConfig = {entryPoint: 0};
const resultMap = []; // originalIdx -> {newIdx, newDeps} (newIdx is '$__dmIdx+originalIndex')

function is__dLine(line) {
  return line.startsWith('__d(');
}

function is__rLine(line) {
  return line.startsWith('__r(');
}

function loadBaseMap(base) {
  function __d(func, idx, dependencies) {
    baseMap[func.toString()] = idx;
  }

  fs.appendFileSync(tmpBase__d, 'module.exports = function (baseMap) {\n');
  fs.appendFileSync(tmpBase__d, __d.toString() + '\n');

  fs.readFileSync(base).toString().split('\n').forEach((line) => {
    if (is__dLine(line)) {
      fs.appendFileSync(tmpBase__d, line + '\n');
    }
  });

  fs.appendFileSync(tmpBase__d, '}');

  require(tmpBase__d)(baseMap);
}

function loadModuleMap(module) {
  function __d(func, idx, dependencies) {
    moduleMap[idx] = {
      func: func.toString(),
      deps: dependencies
    };
  }

  function __r(idx) {
    moduleConfig.entryPoint = idx;
  }

  fs.appendFileSync(tmpModule__d, 'module.exports = function (moduleMap, moduleConfig) {\n');
  fs.appendFileSync(tmpModule__d, __d.toString() + '\n');
  fs.appendFileSync(tmpModule__d, __r.toString() + '\n');

  fs.readFileSync(bundle).toString().split('\n').forEach((line) => {
    if (is__dLine(line) || is__rLine(line)) {
      fs.appendFileSync(tmpModule__d, line + '\n');
    }
  });

  fs.appendFileSync(tmpModule__d, '}');

  require(tmpModule__d)(moduleMap, moduleConfig);
}

function evalResultMap() {
  addToResultMap(moduleConfig.entryPoint);
}

function addToResultMap(idx) {
  const newIdx = `$__dmIdx+${idx}`;

  resultMap[idx] = {
    newIdx,
    deps: []
  };

  const originalDeps = moduleMap[idx].deps;
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

function createResultBundle(out) {
  for (let i = 0; i < resultMap.length; i++) {
    const resultVal = resultMap[i];
    if (resultVal) {
      const func = moduleMap[i].func;
      const idx = resultVal.newIdx;
      const deps = `[${resultVal.deps.toString()}]`;

      fs.appendFileSync(out, `__d(${func},${idx},${deps});\n`);
    }
  }

  fs.appendFileSync(out, `$__dmRegIdxArray.push($__dmIdx+${moduleConfig.entryPoint});$__dmIdx+=${resultMap.length};`);
}

// =========

function consoleBaseMap() {
  for (let func in baseMap) {
    console.log(func + ' | ' + baseMap[func]);
  }
}

function consoleModuleMap() {
  for (let i = 0; i < moduleMap.length; i++) {
    console.log(`${i} | ${moduleMap[i].func} | ${moduleMap[i].deps}`);
  }
}

// =========

loadBaseMap(base);
loadModuleMap(bundle);
evalResultMap();
createResultBundle(out);

//consoleModuleMap();
//consoleBaseMap();


