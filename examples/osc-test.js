// listening for osc messages on channel 57121

r1 = 0
r2 = 100
msg.on("bd", () => {
  r1 = 0.4
  r2 = 4
})
msg.on("sn", () => {
  r1 = 10
  r2 = 3
})
//
//
shape(
  () => (r2)
)
//  .repeatX(()=>(r1))
//  .rotate(0, 0.4)
  .out()
