import { EventEmitter } from 'events';

export class TSLDJClient extends EventEmitter {
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
