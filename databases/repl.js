'use strict';

const fs = require('fs');
const cheerio = require('cheerio');

const rdf = fs.readFileSync('test/pg132.rdf');

// rdf

const $ = cheerio.load(rdf);

$('dcterms\\:title').text();

$('dcterms\\:hasFormat');
$('dcterms\\:hasFormat').length;

const formats = $('dcterms\\:hasFormat');

formats.length;

formats.toArray()[1];
console.dir(formats.toArray()[1], { depth: 10 });

typeof (formats);
formats;

formats.toArray().forEach((e) => {
    const url = $(e).find('pgterms\\:file');
    console.log('typeof' + typeof (url));
    console.dir(url, { depth: 10 });
    console.log('>>>>>>>>>>>>>' + url + '<<<<<<<<<<<<<<<');
});

let zero = formats.toArray()[0];
zero;

$(zero).text();
$(zero).find('pgterms\\:file');
$(zero).find('pgterms\\:file');
$(zero).find('pgterms\\:file').attr('rdf:about');

$(zero).find('dcterms\\:format').find('rdf\\:value').attr('rdf:datatype');
$(zero).find('dcterms\\:format').find('rdf\\:value').text();

formats.toArray().forEach((e) => {
    const url = $(e).find('pgterms\\:file').attr('rdf:about');
    const format = $(e).find('dcterms\\:format').find('rdf\\:value').text();
    const obj = { url: url, format: format };
    console.log(JSON.stringify(obj));
});

formats.toArray().map((e) => {
    const url = $(e).find('pgterms\\:file').attr('rdf:about');
    const format = $(e).find('dcterms\\:format').find('rdf\\:value').text();
    const obj = { url: url, format: format };
    // console.log(JSON.stringify(obj));
    return obj;
});

[{ a: 1 }].includes({ a: 2 });
[{ a: 1 }].includes({ a: 1 });

//  end
