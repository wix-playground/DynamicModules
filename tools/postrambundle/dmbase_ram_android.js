const fs = require('fs');
const fsExtra = require('fs-extra');
const path = require('path');
const minimist = require('minimist');

const args = minimist(process.argv.slice(2));

const bundle = args['bundle'];
const jsModulesDir = args['js-modules-dir'];
const outDir = args['out'];
const jsModulesOutDir = `${outDir}/js-modules`;

function prepare() {
  try {
    fs.unlinkSync(`${outDir}/base_ram.js`);
  } catch (e) {
  }

  try {
    fs.unlinkSync(`${outDir}/buildconfig.json`);
  } catch (e) {
  }

  if (!fs.existsSync(jsModulesOutDir)) {
    fs.mkdirSync(jsModulesOutDir);
  } else {
    fsExtra.emptyDirSync(jsModulesOutDir);
  }
}

function createBase() {
  fsExtra.copySync(bundle, `${outDir}/base_ram.js`);
}

function createJsModules() {
  const result = {
    last_base_index: 0,
    reg_index: 0
  };

  fsExtra.copySync(`${jsModulesDir}/UNBUNDLE`, `${jsModulesOutDir}/UNBUNDLE`);

  const files = fs.readdirSync(jsModulesDir);
  const jsFiles = files.filter((file) => {
    return path.extname(file) === '.js';
  });

  for (let jsFile of jsFiles) {
    const content = fs.readFileSync(`${jsModulesDir}/${jsFile}`);
    let idx;
    if (isModulesRegistrationLine(content)) {
      idx = path.basename(jsFile, '.js');
      createRegFile(idx);
      result.reg_index = parseInt(idx);
    } else {
      const fileName = path.basename(jsFile);
      fsExtra.copySync(`${jsModulesDir}/${jsFile}`, `${jsModulesOutDir}/${fileName}`);
      idx = path.basename(jsFile, '.js');
    }

    if (idx > result.last_base_index) {
      result.last_base_index = parseInt(idx);
    }
  }

  return result;
}

function createConfig(config) {
  fs.appendFileSync(`${outDir}/buildconfig.json`, JSON.stringify(config));
}

function createRegFile(idx) {
  let content = fs.readFileSync('./templates/reg.dmt').toString();
  content = content.replace('$__REG_INDEX', idx);
  fs.appendFileSync(`${jsModulesOutDir}/${idx}.js`, content);
}

function isModulesRegistrationLine(line) {
  return line.includes('.moduleRegistrar=function()');
}


prepare();
createBase();
const config = createJsModules();
createConfig(config);
