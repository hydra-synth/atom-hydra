// listening for osc messages on channel 57121

// define variables
r1 = 1
r2 = 0.1
//

//
// use variables in hydra
osc(100, 0.2,0.3)
  .rotate(() => r1)
  .modulate(osc(100).rotate(() => r2))
  .out()

gradient().color(0, 0, 0).out()

// update port to listen to osc messages
msg.setPort(51000)

freq = 10

msg.on('/test', (args) => {
  console.log('test', args)
  freq = args[0]
})

msg.on('*', (args) => {
  console.log("ALLL")
})



osc(() => freq).out()

a.hide()
a.show()
fadeOut(0, 0.01)
osc(f0(1, 100)).out()
osc(1, 1, 3).out()

// wild feedback
s0.initScreen(0)
src(s0)
.modulateHue(o0, 10)
//.pixelate(1000, 10)
.scrollX(({time}) => (Math.sin(time* 0.4) * 0.08), 0.00)
.scale(1.1)
.rotate(0.0001, 0.00001)
.saturate(1.2)
.hue(0.01)
//.modulate(osc(1000), 0.01)
.out()

osc().out()












osc(10, 1, -1).out()
