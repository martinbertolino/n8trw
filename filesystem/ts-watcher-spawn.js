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
    ls.stdout.pipe(process.stdout);
});
console.log(`Now watching ${filename} for changes...`);
//  end
//# sourceMappingURL=ts-watcher-spawn.js.map