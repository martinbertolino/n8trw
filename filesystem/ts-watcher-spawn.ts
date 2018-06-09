import * as fs from 'fs';
import { spawn } from 'child_process';

const filename: string = process.argv[2];

if (!filename) {
    throw Error('A file to watch must be specified');
}

fs.watch(filename, () => {
    console.log(`File ${filename} changed!`);
    const ls = spawn('ls', ['-l', '-h', filename]);
    ls.stdout.pipe(process.stdout);
});

console.log(`Now watching ${filename} for changes...`);

//  end
