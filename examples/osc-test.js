// listening for osc messages on channel 57121

// define variables
r1 = 1
r2 = 0.1
//
// change value of variables based on messages received from Tidal
msg.on("bd", () => {
  r1 = r1 + 2
})
//
msg.on("sn", () => {
  r2 = Math.random()*4
//  r2 = 4
})
//
// use variables in hydra
osc(10, 0.2,0.3)
  .rotate(() => r1)
  .modulate(osc(100).rotate(() => r2))
  .out()
