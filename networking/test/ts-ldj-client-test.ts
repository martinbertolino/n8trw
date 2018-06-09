import * as assert from 'assert';
import { EventEmitter } from 'events';
import { TSLDJClient } from '../lib/ts-ldj-client'

describe('TSLDJClient', () => {
    let stream = null;
    let client = null;

    beforeEach(() => {
        stream = new EventEmitter();
        client = new TSLDJClient(stream);
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
