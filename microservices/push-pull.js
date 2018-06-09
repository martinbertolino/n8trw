'use strict';

const zmq = require('zeromq');
const cluster = require('cluster');

const jobCount = 30;
const workerCount = 3;
let workersOnline = 0;

if (cluster.isMaster) {
    console.log('this is the master');

    const push = zmq.socket('push').bind('ipc://push.ipc');
    const pull = zmq.socket('pull').bind('ipc://pull.ipc');

    pull.on('message', (data) => {
        // console.log(data.toString());
        const message = JSON.parse(data);

        if (message.type === 'ready') {
            workersOnline++;
            if (workersOnline === workerCount) {
                console.log('all workers are online');
                for (let j = 0; j < jobCount; j++) {
                    push.send(JSON.stringify({ type: 'job', jobid: j, payload: 'something' }));
                }
            }
        } else if (message.type === 'response') {
            console.log('received response:', message);
        } else {
            console.log('unknown message');
        }
    });

    for (let j = 0; j < workerCount; j++) {
        cluster.fork();
    }
} else {
    console.log('this is the worker');

    const pull = zmq.socket('pull').connect('ipc://push.ipc');
    const push = zmq.socket('push').connect('ipc://pull.ipc');

    pull.on('message', (data) => {
        // console.log(data.toString());

        // const message = JSON.parse(data);
        const response = `message processed by ${process.pid}`;
        // console.log(response);
        push.send(JSON.stringify({ type: 'response', payload: response }));
    });

    push.send(JSON.stringify({ type: 'ready' }));
    console.log('ready sent');
}

console.log('ready');

//  end
