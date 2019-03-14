// copy jsbundle to base.js as-is
// treat js-modules

const fs = require('fs');
const fsExtra = require('fs-extra');
const minimist = require('minimist');

const args = minimist(process.argv.slice(2));

const bundle = args['bundle'];
const jsModulesDir = args['js-modules-dir'];
const outDir = args['out'];
const jsModulesOutDir = `${outDir}/js-modules`;

try {
  fs.unlinkSync(`${outDir}/base_ram.js`);
} catch (e) {
}

try {
  fs.unlinkSync(`${outDir}/buildconfig.json`);
} catch (e) {
}

if (!fs.existsSync(jsModulesOutDir)){
  fs.mkdirSync(jsModulesOutDir);
} else {
  fsExtra.emptyDirSync(jsModulesOutDir);
}



