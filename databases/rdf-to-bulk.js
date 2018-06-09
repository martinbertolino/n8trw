'use strict';

const dir = require('node-dir');
const parseRDF = require('./lib/parse-rdf');

const dirname = process.argv[2];

const options = {
    match: /\.rdf$/,
    exclude: ['pg0.rdf'],
};

process.stdout.on('error', (error) => {
    // console.error(`in error handler for ${error}`);
    if (error.code === 'EPIPE') {
        process.exit();
    } else {
        throw error;
    }
});

dir.readFiles(dirname, options, (error, content, next) => {
    if (error) throw error;

    const doc = parseRDF(content);
    console.log(JSON.stringify({ index: { _id: `pg${doc.id}` } }));
    console.log(JSON.stringify(doc));
    next();
});
