'use strict';

const cluster = require('cluster');
const fs = require('fs');
const zmq = require('zeromq');

const numWorkers = require('os').cpus().length;

if (cluster.isMaster) {
    const router = zmq.socket('router').bind('tcp://127.0.0.1:60401');
    const dealer = zmq.socket('dealer').bind('ipc://filer-dealer.ipc');

    router.on('message', (...frames) => dealer.send(frames));
    dealer.on('message', (...frames) => router.send(frames));

    cluster.on('online', (worker) => console.log(`Worker ${worker.process.pid} is online`));

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} exited/ended with code:${code} or signal:${signal}, re-forking`);
        cluster.fork();
    });

    for (let i = 0; i < numWorkers; i++) {
        cluster.fork();
    }
} else {
    const responder = zmq.socket('rep').connect('ipc://filer-dealer.ipc');

    responder.on('message', (data) => {
        const request = JSON.parse(data);
        console.log(`${process.pid} received request for: ${request.path}`);
        fs.readFile(request.path, (error, content) => {
            if (error) {
                const message = `error ${error} reading ${request.path}`;
                console.log(message);
                responder.send(JSON.stringify({error: message}));
            } else {
                console.log(`${process.pid} sending response`);
                responder.send(JSON.stringify({
                    content: content.toString(),
                    timestamp: Date.now(),
                    pid: process.pid,
                }));
            }
        });
    });
}

//  end
