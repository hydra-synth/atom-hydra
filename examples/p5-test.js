

// initialize p5 canvas
p1 = new P5() // {width: window.innerWidth, height:window.innerHeight, mode: 'P2D'}


img = p1.loadImage(atom.project.getPaths()[0]+'/examples/A-gray-kitten-meowing.jpg')
//
p1.draw = () => {
//  x += 1
  p1.clear()
  p1.fill( 255, 0, 255)
  //p1.background(255, 0, 0)
  //p1.rect(p1.mouseX, p1.mouseY, 100, 200)
  p1.image(img, p1.mouseX, p1.mouseY, 600, 400)
}

p1.hide()

log("testing log")
// put p5 canvas in front
p1.show()

// remove canvas
p1.remove()

s0.initScreen(2)

s0.init({src: p1.canvas})
//
src(s0)
 .rotate(0, 0.1)
  .color(2, 1.0, 1.0)
  .hue(0.01)
  .out()
