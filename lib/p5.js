'use babel'

import p5lib from 'p5'
import 'p5/lib/addons/p5.dom'

export default class P5 extends p5lib{
  constructor ({
    width = window.innerWidth,
    height = window.innerHeight,
    mode = 'P2D'
  } = {}) {

    super(( p ) => {
      p.setup = () => { p.createCanvas(width, height, p[mode]) }
      p.draw = () => { }
    })
    this.width = width
    this.height = height
    this.mode = mode
    this.canvas.style.position = "absolute"
    this.canvas.style.top = "0px"
    this.canvas.style.left = "0px"
    this.canvas.style.zIndex = -1
    console.log('p5', this)
  //  return this.p5
  }

  show() {
    this.canvas.style.zIndex = -1
  }

  hide() {
    this.canvas.style.zIndex = -10
  }


}
