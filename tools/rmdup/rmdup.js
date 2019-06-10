const fs = require('fs');
const minimist = require('minimist');

const args = minimist(process.argv.slice(2));

const bundle = args['bundle'];
const out = args['out'];

const tmpBase__d = './tmp/base__d.js';

// first of all some cleaning
try {
  fs.unlinkSync(out);
} catch (e) {
}

try {
  fs.unlinkSync(tmpBase__d);
} catch (e) {
}


const baseMap = {}; // func -> idx


function is__dLine(line) {
  return line.startsWith('__d(');
}


function loadBaseMap(base) {
  function __d(func, idx, dependencies) {
    const string = func.toString();
    if (baseMap[string]) {
      fs.appendFileSync(out, string);
    } else {
      baseMap[func.toString()] = idx;
    }
  }

  fs.appendFileSync(tmpBase__d, 'module.exports = function (baseMap, fs, out) {\n');
  fs.appendFileSync(tmpBase__d, __d.toString() + '\n');

  fs.readFileSync(base).toString().split('\n').forEach((line) => {
    if (is__dLine(line)) {
      fs.appendFileSync(tmpBase__d, line + '\n');
    }
  });

  fs.appendFileSync(tmpBase__d, '}');

  require(tmpBase__d)(baseMap, fs, out);
}

loadBaseMap(bundle);




