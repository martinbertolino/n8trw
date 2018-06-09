"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const events_1 = require("events");
const ts_ldj_client_1 = require("../lib/ts-ldj-client");
describe('TSLDJClient', () => {
    let stream = null;
    let client = null;
    beforeEach(() => {
        stream = new events_1.EventEmitter();
        client = new ts_ldj_client_1.TSLDJClient(stream);
    });
    it('should emit a message event from a single data event', (done) => {
        client.on('message', (message) => {
            assert.deepEqual(message, { foo: 'bar' });
            done();
        });
        stream.emit('data', '{"foo":"bar"}\n');
    });
    it('should emit a message event from split data events', (done) => {
        client.on('message', (message) => {
            assert.deepEqual(message, { foo: 'bar' });
            done();
        });
        stream.emit('data', '{"foo"');
        process.nextTick(() => stream.emit('data', ':"bar"}\n'));
    });
    it('should emit a message event from split data events by N ms', (done) => {
        client.on('message', (message) => {
            assert.deepEqual(message, { foo: 'bar' });
            done();
        });
        stream.emit('data', '{"foo"');
        setTimeout(() => stream.emit('data', ':"bar"}\n'), 100);
    });
});
//# sourceMappingURL=ts-ldj-client-test.js.map