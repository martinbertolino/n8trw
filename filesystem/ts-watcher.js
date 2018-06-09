"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const filename = 'target.txt';
fs.watch(filename, () => { console.log(`File ${filename} changed!`); });
console.log(`Now watching ${filename} for changes...`);
// end
//# sourceMappingURL=ts-watcher.js.map