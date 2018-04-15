'use babel'

import {desktopCapturer} from 'electron'
//import Audio from './audio'
//import Hydra from 'hydra-synth'
import Hydra from '../../hydra-synth'
import OscLoader from './osc-loader'
const loop = require('raf-loop')
//{$} = require 'atom'

const PORT = 57121

export default class Main {

  constructor() {
    hydra = null
    osc = null
    audio = null
  }

  evalBlock() {
    let editor
    if (editor = atom.workspace.getActiveTextEditor()) {
      var range = this.getCurrentParagraphIncludingComments(editor);
      var expression = editor.getTextInBufferRange(range);
      eval(expression)
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
            var editor = this.getEditor();
            var marker = editor.markBufferRange(range, {
                invalidate: 'touch'
            });

            var decoration = editor.decorateMarker(
                marker, {
                    type: 'line',
                    class: 'eval-flash'
                });

            // return fn to flash error / success and destroy the flash
            return function (cssClass) {
                decoration.setProperties({
                    type: 'line',
                    class: cssClass
                });
                var destroy = function () {
                    marker.destroy();
                };
                setTimeout(destroy, 120);
            };
        }

  evalLine () {
    let editor
    console.log("eval", atom.workspace.getActiveTextEditor())
    if (editor = atom.workspace.getActiveTextEditor()) {

      let selection = editor.getSelectedText()
        // evaluate selection, if selection is less than 1, evaluate entire line
      if(selection.length < 1){
        let pt = editor.getCursorBufferPosition()
        selection = editor.lineTextForBufferRow(pt.row)
      //  editor.selectLinesContainingCursors()
      //  selection = editor.getSelectedText()

      }
      console.log("evalling", selection)
      eval(selection)
    }
  }

  start() {
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

    // this.audioCanvas = document.createElement('canvas')
    // this.audioCanvas.style.position = 'absolute'
    // this.audioCanvas.style.right = '0px'
    // this.audioCanvas.style.bottom = '0px'
    // this.audioCanvas.style.backgroundColor = 'transparent'
    // this.audioCanvas.setAttribute('id', 'audio-canvas')

    document.body.classList.add('hydra-enabled')
    this.element.appendChild(this.canvas)
    //this.element.appendChild(this.audioCanvas)
    console.log('AtomHydra was toggled!', atom.workspace.element)
    atom.workspace.element.appendChild(this.element)


    this.hydra = new Hydra ({
      canvas: this.canvas,
      autoLoop: false
    })

    // hijack source init screen event because doesn't work in Electron
    this.hydra.s.forEach((source) => {
      source.initScreen = (index) =>  desktopCapturer.getSources({types: ['window', 'screen']}, (error, sources) => {
          if (error) throw error
          console.log(sources)
          if (sources.length > index) {
            navigator.mediaDevices.getUserMedia({
              audio: false,
              video: {
                mandatory: {
                  chromeMediaSource: 'desktop',
                  chromeMediaSourceId: sources[index].id,
                  minWidth: 1280,
                  maxWidth: 1280,
                  minHeight: 720,
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

  //   desktopCapturer.getSources({types: ['window', 'screen']}, (error, sources) => {
  //     if (error) throw error
  //     console.log(sources)
  //
  //   for (let i = 0; i < sources.length; ++i) {
  //
  //     if (sources[i].name === 'Electron') {
  //       navigator.mediaDevices.getUserMedia({
  //         audio: false,
  //         video: {
  //           mandatory: {
  //             chromeMediaSource: 'desktop',
  //             chromeMediaSourceId: sources[i].id,
  //             minWidth: 1280,
  //             maxWidth: 1280,
  //             minHeight: 720,
  //             maxHeight: 720
  //           }
  //         }
  //       })
  //       .then((stream) => handleStream(stream))
  //       .catch((e) => handleError(e))
  //       return
  //     }
  //   }
  // })

    // this.audio = new Audio({
    // })
  //  window.a = this.audio
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
    // if (this.osc) {
    //       this.osc.destroy();
    //   }
  }

}
