'use strict';

const events = require('events');

/**
 * Buffer data events into messages
 */
class LDJClient extends events.EventEmitter {
    /**
     * @param {?} stream sort of stream
    */
    constructor(stream) {
        super();
        let buffer = '';
        stream.on('data', (data) => {
            buffer += data;
            let boundary = buffer.indexOf('\n');
            while (boundary !== -1) {
                const input = buffer.substring(0, boundary);
                buffer = buffer.substring(boundary + 1);
                this.emit('message', JSON.parse(input));
                boundary = buffer.indexOf('\n');
            }
        });
    }

    /**
     * @param {?} stream a stream
     * @return {LDJClient} The created LDJClient
     */
    static connect(stream) {
        return new LDJClient(stream);
    }
}

module.exports = LDJClient;
