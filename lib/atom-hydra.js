'use babel'

import Main from './main.js'
import { CompositeDisposable } from 'atom'

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
      'atom-hydra:evalBlock': () => this.main.evalBlock(),
      'atom-hydra:evalCode':() => this.main.evalCode()
    }));
  },

  deactivate() {
  //  this.modalPanel.destroy();
    this.subscriptions.dispose()
    this.main.stop()
  //  this.atomHydraView.destroy();
  },

  serialize() {
    return {
    //  atomHydraViewState: this.atomHydraView.serialize()
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
  }

};
