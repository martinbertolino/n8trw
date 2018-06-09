"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const net = require("net");
const ts_ldj_client_1 = require("./lib/ts-ldj-client");
const client = ts_ldj_client_1.TSLDJClient.connect(net.connect({ port: 60300 }));
client.on('message', (data) => {
    // const message = JSON.parse(data);
    //  no need to parsi it because ldjClient emits JSON
    const message = data;
    if (message.type === 'watching') {
        console.log(`Now watching: ${message.file}`);
    }
    else if (message.type === 'changed') {
        const date = new Date(message.timestamp);
        console.log(`File changed: ${date}`);
    }
    else {
        console.log(`Unrecognized message type: ${message.type}`);
    }
});
//  end
//# sourceMappingURL=ts-net-watcher-ldj-client.js.map