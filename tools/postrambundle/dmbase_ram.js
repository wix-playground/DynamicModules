const fs = require('fs');
const minimist = require('minimist');
const RamBundle = require('./RamBundle');

const args = minimist(process.argv.slice(2));

const bundle = args['bundle'];
const outDir = args['out-dir'];

try {
  fs.unlinkSync(`${outDir}/header`);
} catch (e) {
}

try {
  fs.unlinkSync(`${outDir}/body`);
} catch (e) {
}


const buffer = fs.readFileSync(bundle);
const ramBundle = new RamBundle(buffer);

const numModules = ramBundle.getNumModules();
for (let i = 0; i < numModules; i++) {
  const line = ramBundle.getModule(i);
  if (isModulesRegistrationLine(line)) {
    ramBundle.replaceModule(i, `__d(function(g,r,i,a,m,e,d){r(${numModules});},${i},[]);`);
    let regString = fs.readFileSync('./templates/reg.dmt').toString();
    regString = regString.replace('$__REG_INDEX', numModules.toString());
    let {header, body} = ramBundle.addModule(regString);
    fs.appendFileSync(`${outDir}/header`, header);
    fs.appendFileSync(`${outDir}/body`, body);
    break;
  }
}

function isModulesRegistrationLine(line) {
  return line.includes('.moduleRegistrar=function()');
}
