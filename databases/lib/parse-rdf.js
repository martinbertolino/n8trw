'use strict';

const cheerio = require('cheerio');

module.exports = (rdf) => {
    const $ = cheerio.load(rdf);

    const book = {};

    book.id = +$('pgterms\\:ebook').attr('rdf:about').replace('ebooks/', '');
    book.title = $('dcterms\\:title').text();
    book.authors = $('pgterms\\:agent pgterms\\:name')
        .toArray().map((e) => $(e).text());
    book.subjects = $('[rdf\\:resource$="/LCSH"]')
        .parent().find('rdf\\:value').toArray().map((e) => $(e).text());
    book.lcc = $('[rdf\\:resource$="/LCC"]')
        .parent().find('rdf\\:value').text();
    book.formats = $('dcterms\\:hasFormat').toArray().map((e) => {
        const url = $(e).find('pgterms\\:file').attr('rdf:about');
        const format = $(e).find('dcterms\\:format').find('rdf\\:value').text();
        const obj = { url: url, format: format };
        // console.log(JSON.stringify(obj));
        return obj;
    });

    return book;
};
