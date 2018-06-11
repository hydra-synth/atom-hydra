'use babel'

import {desktopCapturer} from 'electron'
var MessagePanelView = require('atom-message-panel').MessagePanelView
var PlainMessageView = require('atom-message-panel').PlainMessageView

//import Audio from './audio'
import Hydra from 'hydra-synth'
//import Hydra from '../../hydra-synth'
import OscLoader from './osc-loader'
import SourceClips from './source-clips'
const loop = require('raf-loop')
import P5 from './p5'
//import 'p5/lib/addons/p5.sound'
//import 'p5/lib/addons/p5.dom'
//{$} = require 'atom'

const PORT = 57101

export default class Main {

  constructor() {
    hydra = null
    osc = null
    audio = null
    messages = null
    clips = null
  //  console.log('p5', P5)
    window.P5 = P5
    window.log = this.log.bind(this)
  }

  _eval(code) {

    var success = true
    try {
      eval(code)
    } catch (e) {
      success = false
      console.log(e, e.name, e.lineNumber, e.columnNumber, e.stack)
      // this.messages.add(new PlainMessageView({
      //     message: e.message,
      //     className: 'text-error'
      // }))
      this.log(e.message, 'text-error')
    }
    if(success) {
      this.log(code, 'text-muted')
      // this.messages.add(new PlainMessageView({
      //     message: code,
      //     className: 'text-muted'
      // }))
    }
  }

  log(msg, _class) {
    this.messages.clear()
    this.messages.add(new PlainMessageView({
        message: msg,
        className: _class
    }))
  }

  evalBlock() {
    let editor
    if (editor = atom.workspace.getActiveTextEditor()) {
      var range = this.getCurrentParagraphIncludingComments(editor);
      this.evalFlash(range)
      var expression = editor.getTextInBufferRange(range);
      this._eval(expression)
    }

  }

  getCurrentParagraphIncludingComments(editor) {
          var cursor = editor.getLastCursor();
          var startRow = endRow = cursor.getBufferRow();
          var lineCount = editor.getLineCount();

          // lines must include non-whitespace characters
          // and not be outside editor bounds
          while (/\S/.test(editor.lineTextForBufferRow(startRow)) && startRow >= 0) {
              startRow--;
          }
          while (/\S/.test(editor.lineTextForBufferRow(endRow)) && endRow < lineCount) {
              endRow++;
          }
          return {
              start: {
                  row: startRow + 1,
                  column: 0
              },
              end: {
                  row: endRow,
                  column: 0
              },
          };
      }

      evalFlash(range) {
        console.log('evalFlash', range)
        let editor
      //  console.log("eval", atom.workspace.getActiveTextEditor())
        if (editor = atom.workspace.getActiveTextEditor()) {
          //  var editor = this.getEditor();
            var marker = editor.markBufferRange(range, {
                invalidate: 'touch'
            });

            var decoration = editor.decorateMarker(
                marker, {
                    type: 'line',
                    class: 'hydra-flash'
                });

            setTimeout(() => {
                marker.destroy();
            }, 200)

          }
        }

  evalLine () {
    let editor
  //  console.log("eval", atom.workspace.getActiveTextEditor())
    if (editor = atom.workspace.getActiveTextEditor()) {
      var range
      let selection = editor.getSelectedText()
      range = editor.getSelectedBufferRange()
        // evaluate selection, if selection is less than 1, evaluate entire line
      if(selection.length < 1){
        let pt = editor.getCursorBufferPosition()
        selection = editor.lineTextForBufferRow(pt.row)
        range ={ start: pt, end: pt }
      //  editor.selectLinesContainingCursors()
      //  selection = editor.getSelectedText()

      }
  //    console.log("evalling", selection)
      this._eval(selection)
      this.evalFlash(range)
    }
  }

  start() {
    this.clips = new SourceClips()
    this.messages = new MessagePanelView({ title: 'hydra >>'})
    this.messages.attach()
    this.messages.toggle()
    //  if (editor = atom.workspace.getActiveTextEditor()) {
    atom.workspace.element.oncontextmenu = function(event) {
      if(event.preventDefault != undefined) event.preventDefault()
      if(event.stopPropagation != undefined) event.stopPropagation()
    }
    //  }

    const editor = atom.workspace.getActiveTextEditor()
    this.element = document.createElement('div')
    this.element.classList.add('hydra')
    this.canvas = document.createElement('canvas')
    this.canvas.width = 1280
    this.canvas.height = 720

    document.body.classList.add('hydra-enabled')
    this.element.appendChild(this.canvas)
    //this.element.appendChild(this.audioCanvas)
    console.log('Hydra was toggled!', atom.workspace.element)
    atom.workspace.element.appendChild(this.element)


    this.hydra = new Hydra ({
      canvas: this.canvas,
      autoLoop: false
    })

    // hijack source init screen event because doesn't work in Electron
    this.hydra.s.forEach((source) => {
      source.initScreen = (index) =>  desktopCapturer.getSources({types: ['window', 'screen']}, (error, sources) => {
          if (error) throw error
          this.log(sources)
          if (sources.length > index) {
            navigator.mediaDevices.getUserMedia({
              audio: false,
              video: {
                mandatory: {
                  chromeMediaSource: 'desktop',
                  chromeMediaSourceId: sources[index].id,
                //  minWidth: 1280,
                  maxWidth: 1280,
              //    minHeight: 720,
                  maxHeight: 720
                }
              }
            }).then((stream) => {
              const video = document.createElement('video')
              video.src = window.URL.createObjectURL(stream)
              video.addEventListener('loadedmetadata', () => {
                video.play().then(() => {
                  source.src = video
                  source.tex = source.regl.texture(source.src)
                })
              })
            })
          }
        })
    })

    const oscLoader = new OscLoader(PORT);
    this.osc = oscLoader;
    window.msg = this.osc
    oscLoader.on('message', this.onOsc)

    var self = this
    var engine = loop(function(dt) {
        // delta time in milliseconds
        self.hydra.tick(dt)
    //    self.audio.tick()
    }).start()
  }
    // osc().out()

  onOsc(msg) {
  //  console.log("OSC", msg)

  }

  stop() {
  //  this.isActive = false
    this.hydra.regl.destroy()
    document.body.classList.remove('hydra-enabled')
    atom.workspace.element.removeChild(this.element)
    this.osc.destroy()
    this.messages.close()
    // if (this.osc) {
    //       this.osc.destroy();
    //   }
  }

}
