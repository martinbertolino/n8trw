"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
class TSLDJClient extends events_1.EventEmitter {
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
    static connect(stream) {
        return new TSLDJClient(stream);
    }
}
exports.TSLDJClient = TSLDJClient;
//# sourceMappingURL=ts-ldj-client.js.map