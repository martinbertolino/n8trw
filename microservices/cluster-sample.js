'use strict';

const cluster = require('cluster');

if (cluster.isMaster) {
    console.log(`this is the master ${process.pid}`);
    for (let i = 0; i < 3; i++) {
        cluster.fork();
    }
} else {
    //  the worker
    const wait = 10000;
    console.log(`this is the worker ${process.pid}`);
    setTimeout(() => {
        console.log(`this is the worker ${process.pid} after ${wait} ms`);
        process.exit(0);
    }, wait);
}

cluster.on('online', (worker) => {
    console.log(`Worker ${worker.process.pid} is online`);
});

cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} exited/ended with code:${code} or signal:${signal}`);
});

//  end
