'use strict';

const fs = require('fs');
const spawn = require('child_process').spawn;
const filename = process.argv[2];

if (!filename) {
    throw Error('A file to watch must be specified');
}

fs.watch(filename, () => {
    console.log(`File ${filename} changed!`);
    const ls = spawn('ls', ['-l', '-h', filename]);
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
