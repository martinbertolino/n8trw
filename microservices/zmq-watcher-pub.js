'use strict';

const fs = require('fs');
const zmq = require('zeromq');

const filename = process.argv[2];

//  create the publisher enpoint
const publisher = zmq.socket('pub');

fs.watch(filename, () => {
    //  send a message to any and all subscribers
    publisher.send(JSON.stringify({
        type: 'changed',
        file: filename,
        timestamp: Date.now(),
    }));
});

publisher.bind('tcp://*:60400', (error) => {
    if (error) {
        throw error;
    }
    console.log('listening for zmq subscribers');
});

//  end
