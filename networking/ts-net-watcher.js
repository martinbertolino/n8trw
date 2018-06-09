"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const net = require("net");
const filename = process.argv[2];
if (!filename) {
    throw Error('Error: no filename specified');
}
const endpoint = 60300;
// const endpoint = '/tmp/watcher.sock';
net.createServer((connection) => {
    console.log('Subscriber connected.');
    connection.write(`Now watching '${filename}' for changes...\n`);
    const watcher = fs.watch(filename, () => {
        const message = `File changed: ${new Date()}`;
        console.log(message);
        connection.write(message + '\n');
    });
    connection.on('close', () => {
        console.log('Subscriber disconnected');
        watcher.close();
    });
}).listen(endpoint, () => console.log('Listening for subscribers...'));
//  end
//# sourceMappingURL=ts-net-watcher.js.map