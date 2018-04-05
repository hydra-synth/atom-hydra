#!/usr/bin/env node
{
    const PORT = process.argv[2] || 57121;

    const dgram = require('dgram');
    const osc = require('osc-min');
    const sock = dgram.createSocket('udp4', (buf) => {
        try {
            const msg = osc.fromBuffer(buf);
          //  msg.args = msg.args.map((a) => a.value);
            console.log(JSON.stringify(msg));
        } catch (e) {
          console.log("ERROR", e)
        }
    });
  //  console.log("opening socket server on port ", PORT)
    sock.bind(PORT);
}
