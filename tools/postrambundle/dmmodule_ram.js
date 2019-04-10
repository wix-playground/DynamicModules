const fs = require('fs');
const minimist = require('minimist');
const RamBundle = require('./RamBundle');

// We'll use some long var name in __d() func, f.e. $__dmStartIndex

// Exclude all the duplicate code (that is used already in base app)
// Generate module body, header and config (contains entry_point)
// Header:
//    1. unused ids => should be zero filled in header
//    2. we don't need magic number and next two ints, they should be removed
//    3. the client-side merger will replace all the offsets in header (if length !== 0)

const START_POINT_INDEX_NAME = '$__dmStartIndex';

const args = minimist(process.argv.slice(2));

const bundle = args['bundle'];
const outDir = args['out-dir'];
const baseBundle = args['base-bundle'];

const tmpBase__d = './tmp/base__d.js';
const tmpModule__d = './tmp/module__d.js';



try {
  fs.unlinkSync(`${outDir}/header`);
} catch (e) {
}

try {
  fs.unlinkSync(`${outDir}/body`);
} catch (e) {
}

try {
  fs.unlinkSync(`${outDir}/config`);
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

function loadBaseMap() {
  function __d(func, idx, dependencies) {
    baseMap[func.toString()] = idx;
  }

  fs.appendFileSync(tmpBase__d, 'module.exports = function (baseMap) {\n');
  fs.appendFileSync(tmpBase__d, __d.toString() + '\n');

  const buffer = fs.readFileSync(baseBundle);
  const ramBundle = new RamBundle(buffer);

  const numModules = ramBundle.getNumModules();
  for (let i = 0; i < numModules; i++) {
    const line = ramBundle.getModule(i);
    fs.appendFileSync(tmpBase__d, line + '\n');
  }

  fs.appendFileSync(tmpBase__d, '}');

  require(tmpBase__d)(baseMap);
}

function loadModule() {
  function __d(func, idx, dependencies) {
    moduleMap[idx] = {
      func: func.toString(),
      deps: dependencies
    };
  }

  const buffer = fs.readFileSync(bundle);
  const ramBundle = new RamBundle(buffer);

  const startupCode = ramBundle.getStartupCode();
  const start = startupCode.lastIndexOf('__r(') + 4;
  const end = startupCode.indexOf(');', start);
  const entryPointStr = startupCode.substring(start, end).trim();
  moduleConfig.entryPoint = parseInt(entryPointStr);

  fs.appendFileSync(tmpModule__d, 'module.exports = function (moduleMap) {\n');
  fs.appendFileSync(tmpModule__d, __d.toString() + '\n');

  const numModules = ramBundle.getNumModules();
  for (let i = 0; i < numModules; i++) {
    const line = ramBundle.getModule(i);
    fs.appendFileSync(tmpModule__d, line + '\n');
  }

  fs.appendFileSync(tmpModule__d, '}');

  require(tmpModule__d)(moduleMap);
}


function evalResultMap() {
  addToResultMap(moduleConfig.entryPoint);
}

function addToResultMap(idx) {
  const newIdx = `${START_POINT_INDEX_NAME}+${idx}`;

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


function createResultBundle() {
  // creates base, header and config

  const header = Buffer.alloc(resultMap.length * 4 * 2);
  let body = '';
  let offset = 0;

  for (let i = 0; i < resultMap.length; i++) {
    const resultVal = resultMap[i];
    if (resultVal) {
      const func = moduleMap[i].func;
      const idx = resultVal.newIdx;
      const deps = `[${resultVal.deps.toString()}]`;
      const module = `__d(${func},${idx},${deps});\0`;

      const length = module.length; // + 1 ?

      writeToBuffer(header, 2 * i, offset);
      writeToBuffer(header, 2 * i + 1, length);

      body += module;

      offset += length;
    } else {
      writeToBuffer(header, 2 * i, 0);
      writeToBuffer(header, 2 * i + 1, 0);
    }
  }

  fs.appendFileSync(`${outDir}/header`, header);
  fs.appendFileSync(`${outDir}/body`, body);
  fs.appendFileSync(`${outDir}/config`, JSON.stringify(moduleConfig));
}

function writeToBuffer(buffer, pos, int) {
  buffer.writeUInt32LE(int, pos * 4);
}

// ================

loadBaseMap();
loadModule();

evalResultMap();
createResultBundle();
