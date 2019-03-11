const fs = require('fs');

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

try {
  fs.unlinkSync('./out/base.js');
} catch (e) {
}

try {
  fs.unlinkSync('./out/reg.js');
} catch (e) {
}

try {
  fs.unlinkSync('./out/end.js');
} catch (e) {
}

try {
  fs.unlinkSync('./out/buildconfig.json');
} catch (e) {
}


let maxIdx = 0;
let modulesRegistratorIdx;

fs.readFileSync('./main.jsbundle').toString().split('\n').forEach((line) => {
  let idx = getIdx(line);
  if (idx > maxIdx) {
    maxIdx = idx;
  }

  if (is__rLine(line)) {
    fs.appendFileSync('./out/end.js', line + '\n');
  } else if (isModulesRegistrationLine(line)) {
    modulesRegistratorIdx = idx;
  } else {
    fs.appendFileSync('./out/base.js', line + '\n');
  }
});

// create 'buildconfig.js'
const config = {
  last_base_index: maxIdx
};
fs.appendFileSync('./out/buildconfig.json', JSON.stringify(config));

// create 'reg.js'
let regString = fs.readFileSync('./templates/reg.dmt').toString();
regString = regString.replace('$__REG_INDEX', modulesRegistratorIdx.toString());
fs.appendFileSync('./out/reg.js', regString);


