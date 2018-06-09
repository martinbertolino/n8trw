"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const child_process_1 = require("child_process");
const filename = process.argv[2];
if (!filename) {
    throw Error('A file to watch must be specified');
}
fs.watch(filename, () => {
    console.log(`File ${filename} changed!`);
    const ls = child_process_1.spawn('ls', ['-l', '-h', filename]);
    let output = '';
    //  eslint did not like not having () around a single parameter
    ls.stdout.on('data', (chunk) => output += chunk);
    ls.on('close', () => {
        const parts = output.split(/\s+/);
        console.log(output);
        console.log(parts);
        console.log([parts[0], parts[4], parts[8]]);
    });
});
console.log(`Now watching ${filename} for changes...`);
//  end
//# sourceMappingURL=ts-watcher-spawn-parse.js.map