import { getExportList } from './Utils';

const exp = getExportList(false);
const keys = Object.keys(exp);
const exportList = keys.map((name) => {
  return name + '$1 as ' + name;
}).join(',\n  ');

const exportVars = keys.map((name) => {
  return 'var ' + name + '$1 = window[\'' + name + '\'];';
}).join('\n');

console.log(exportVars);
console.log(`
export {
  ${exportList}
}`);