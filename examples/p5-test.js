osc().modulateScale(osc(2).rotate(1.59), -10).color(-0.2, 0, 0.3).out()

console.log(osc)

// one time use; initialize p5 canvas
p1 = new P5(( p ) => {
  p.setup = () => { p.createCanvas(p.windowWidth, p.windowHeight) }
  p.draw = () => { }
})
// p1.drawContext
p1.canvas.style.position = "absolute"
p1.canvas.style.top = "0px"
p1.canvas.style.left = "0px"
p1.canvas.style.zIndex = -10
//
//myp5 = new P5(sketch)
p1.canvas.style.display = 'block'

x = 1

p1.fill(0, 100, 100)

p1.remove()

p1.canvas.style.display = 'block'

console.log(p1)

p1.clear()

p1.fill( 0, 0, 255)
p1.rect(p1.random(0, p1.width), p1.random(0, p1.height), 100, 200)






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



s0.init({src: p1.canvas})0

src(s0)
//.rotate(0, 0.1)
  .color(2, 1.0, 1.0)
  .hue(0.01)
//  .blend(o0, 0.99)
  .diff(o0, [0.99].fast(2))
    .modulatePixelate(src(o0), 10, 8, 1, 4)
    .scale(0.999, 1.001)
    .scrollX(0.002)
   .hue(0.01)
    .saturate(1.1)
  //.hue(sin(1))
  .out()
