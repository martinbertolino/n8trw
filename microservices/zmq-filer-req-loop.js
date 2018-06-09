'use strict';

const zmq = require('zeromq');

const filename = process.argv[2];

const requester = zmq.socket('req');

requester.on('message', (data) => {
    const response = JSON.parse(data);
    console.log('Received response:', response);
});

requester.connect('tcp://localhost:60401');

for (let i = 0; i < 16; i++) {
    console.log(`Sending request ${i} for ${filename}`);
    requester.send(JSON.stringify({ path: filename }));
}

setTimeout(() => requester.disconnect('tcp://localhost:60401'), 5000);
