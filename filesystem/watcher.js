'use strict';

const fs = require('fs');
const filename = 'target.txt';

fs.watch(filename, () => {
    console.log(`File ${filename} changed!`);
});

console.log(`Now watching ${filename} for changes...`);

//  end
