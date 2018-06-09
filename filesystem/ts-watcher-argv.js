"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const filename = process.argv[2];
fs.watch(filename, () => { console.log(`File ${filename} changed!`); });
console.log(`Now watching ${filename} for changes...`);
// end
//# sourceMappingURL=ts-watcher-argv.js.map