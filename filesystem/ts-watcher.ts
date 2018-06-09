import * as fs from 'fs';

const filename: string = 'target.txt';

fs.watch(filename, () => { console.log(`File ${filename} changed!`); });

console.log(`Now watching ${filename} for changes...`);

// end
