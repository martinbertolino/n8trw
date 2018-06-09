import * as net from 'net';
import { TSLDJClient } from './lib/ts-ldj-client';

const client = TSLDJClient.connect(net.connect({ port: 60300 }));

client.on('message', (data) => {
    // const message = JSON.parse(data);
    //  no need to parsi it because ldjClient emits JSON
    const message = data;
    if (message.type === 'watching') {
        console.log(`Now watching: ${message.file}`);
    } else if (message.type === 'changed') {
        const date = new Date(message.timestamp);
        console.log(`File changed: ${date}`);
    } else {
        console.log(`Unrecognized message type: ${message.type}`);
    }
});

//  end
