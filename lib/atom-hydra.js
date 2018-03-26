'use babel'

//import AtomHydraView from './atom-hydra-view';\

import Main from './main.js'
import { CompositeDisposable } from 'atom'
import {desktopCapturer} from 'electron'

export default {
  isActive: false,
  subscriptions: null,
  main: null,

  activate(state) {
    this.main = new Main()
    // // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
     this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-hydra:toggle': () => this.toggle(),
      'atom-hydra:evalLine': () => this.main.evalLine(),
      'atom-hydra:evalBlock': () => this.main.evalBlock()
    }));
  },

  deactivate() {
  //  this.modalPanel.destroy();
    this.subscriptions.dispose()
  //  this.atomHydraView.destroy();
  },

  serialize() {
    return {
      atomHydraViewState: this.atomHydraView.serialize()
    };
  },




  toggle() {
    if(this.isActive) {
      this.isActive = false
      return this.main.stop()
    } else {
      this.isActive = true
      return this.main.start()
    }

    // return (
    //
    //
    //   this.modalPanel.isVisible() ?
    //   this.modalPanel.hide() :
    //   this.modalPanel.show()
    // );
  }

};
