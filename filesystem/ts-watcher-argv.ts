import * as fs from 'fs';

const filename: string = process.argv[2];

fs.watch(filename, () => { console.log(`File ${filename} changed!`); });

console.log(`Now watching ${filename} for changes...`);

// end
