'use babel'
import path from 'path'
const { lstatSync, readdirSync } = require('fs')
const { join, basename } = require('path')
const isImage = require('is-image')

export default class SourceClips {

  constructor() {
    const isDirectory = source => lstatSync(source).isDirectory()
    const getClipDirectory = source =>
      readdirSync(source).filter((name) => name == 'clips').map(name => join(source, name)).filter(isDirectory)

      const getDirectories = source =>
        readdirSync(source).map(name => join(source, name)).filter(isDirectory)

    var clips = getClipDirectory(atom.project.getPaths()[0])
    if(clips.length > 0) {
      this.path = clips[0]
      this.clips = {}

      const loadImages = path => readdirSync(path).map(name => join(path, name)).filter(source => isImage(source))

      getDirectories(this.path).forEach((dir) => {
        this.clips[path.basename(dir)] = {
          path: dir,
          images: loadImages(dir)
        }
        console.log('clips', this.clips)
      })
    //  console.log("IMAGE_DIR", imageDirs)
    }
  }

  evalBlock() {

  }

}
