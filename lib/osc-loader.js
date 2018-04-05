'use babel'

import * as path from 'path';
import { spawn } from 'child_process';
import { ChildProcess } from 'child_process';
import { EventEmitter } from 'events';

export default class OscLoader extends EventEmitter {

    constructor(port) {
        super();
        console.log("listening on port", port)
        this.port = port;
        this.server = spawn(
            'node',
            [path.resolve(__dirname, 'osc-server.js'), this.port.toString()],
            {
                cwd: path.resolve(__dirname, '..'),
            },
        );
        this.server.stdout.on('data', this.stdout);
        this.server.stderr.on('data', this.stderr);
        this.server.on('exit', this.exit);
    }

    destroy() {
        try {
            this.server.kill();
        } catch (e) {
            console.error(e);
        }
    }

    stdout = (output) => {

        const s = output.toString().trim();
      //  console.log("output", s)


        s.split('\n').forEach(line => {
            let msg;
            try {
                msg = JSON.parse(line);
            } catch (e) { console.log("error", e)}

            if (msg) {
                // msg.address =
                //     'osc_' + msg.address.replace(/^\//, '').replace('/', '_');
                // this.emit('message', msg);
                this.emit('message', msg)

                //tidal specific
                let type = msg.elements[0].args[7]
              //  console.log(type)
                this.emit(type.value)
                // If the address is never used before,
                // VEDA have to reload the last shader to use the texture
                // if (!this.addresses[msg.address]) {
                //     this.addresses[msg.address] = true;
                //     this.emit('reload');
                // }
            } else {
              //  console.log(line);
            }
        });
    };

    stderr = (output) => {
        console.error(output.toString());
    };

    exit = (code) => {
        console.log('[VEDA] OSC server exited with code', code);
    };
}
