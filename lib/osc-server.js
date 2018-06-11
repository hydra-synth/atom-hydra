#!/usr/bin/env node
function printMessage(msg) {
    if (msg.oscType === 'bundle') {
        msg.elements.forEach(printMessage);
    }
    else {
        msg.args = msg.args.map((a) => a.value);
        console.log(JSON.stringify(msg));
    }
}
{
    const PORT = process.argv[2] || 57121;

    const dgram = require('dgram');
    const osc = require('osc-min');
    const sock = dgram.createSocket('udp4', (buf) => {
        try {
          printMessage(osc.fromBuffer(buf));
        } catch (e) {
          console.log("ERROR", e)
        }
    });
  //  console.log("opening socket server on port ", PORT)
    sock.bind(PORT);
}
