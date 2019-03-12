const fs = require('fs');
const minimist = require('minimist');

// copy 'main.jsbundle' to 'out/base.js' line by line
// exclude reg line (use it to build 'out/reg.js' from template 'reg.dmt')
// exclude __r(... lines (save them into 'out/end.js')

function isModulesRegistrationLine(line) {
  return line.includes('.moduleRegistrar=function()');
}

function is__rLine(line) {
  return line.startsWith('__r(');
}

function getIdx(line) {
  if (!line.startsWith('__d(')) {
    return -1;
  }

  let end = line.lastIndexOf('[');
  end = line.lastIndexOf(',', end);
  let start = line.lastIndexOf(',', end - 1) + 1;
  let str = line.substring(start, end).trim();
  return parseInt(str);
}

const args = minimist(process.argv.slice(2));

const bundle = args['bundle'];//'../main.jsbundle';
const outDir = args['out'];//'./out';

try {
  fs.unlinkSync(`${outDir}/base.js`);
} catch (e) {
}

try {
  fs.unlinkSync(`${outDir}/reg.js`);
} catch (e) {
}

try {
  fs.unlinkSync(`${outDir}/end.js`);
} catch (e) {
}

try {
  fs.unlinkSync(`${outDir}buildconfig.json`);
} catch (e) {
}


let maxIdx = 0;
let modulesRegistratorIdx;

fs.readFileSync(bundle).toString().split('\n').forEach((line) => {
  let idx = getIdx(line);
  if (idx > maxIdx) {
    maxIdx = idx;
  }

  if (is__rLine(line)) {
    fs.appendFileSync(`${outDir}/end.js`, line + '\n');
  } else if (isModulesRegistrationLine(line)) {
    modulesRegistratorIdx = idx;
  } else {
    fs.appendFileSync(`${outDir}/base.js`, line + '\n');
  }
});

// create 'buildconfig.js'
const config = {
  last_base_index: maxIdx
};
fs.appendFileSync(`${outDir}/buildconfig.json`, JSON.stringify(config));

// create 'reg.js'
let regString = fs.readFileSync('./templates/reg.dmt').toString();
regString = regString.replace('$__REG_INDEX', modulesRegistratorIdx.toString());
fs.appendFileSync(`${outDir}/reg.js`, regString);


