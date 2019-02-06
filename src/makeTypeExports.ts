import { getExportList } from './Utils';

const exportList = Object.keys(getExportList()).join(',\n  ');
console.log(`
export {
  ${exportList}
}`);