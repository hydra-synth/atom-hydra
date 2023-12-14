'use babel'

import Main from './main.js'
import { CompositeDisposable } from 'atom'

let packageDefinition = {
  isActive: false,
  subscriptions: null,
  main: null,

  config: {
    audioInputDevice: {
      type: 'string',
      values: [{ value: "default", description: 'Default' }],
      default: "default",
      enumerateDevices: async function() {
        let devices = await navigator.mediaDevices.enumerateDevices()
        let inputDevices = []
        for (const device of devices) {
          if (device.kind == "audioinput") {
            inputDevices.push({value: device.deviceId, description: device.label});
          }
        }
        this.values = inputDevices
        this.enumerateDevices = function() { return this.values }
        return this.values;
      },
      get enum() {
        return this.enumerateDevices()
      }
    }
  },

  activate(state) {
    this.main = new Main()
    // // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
     this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-hydra:toggle': () => this.toggle(),
      'atom-hydra:evalLine': () => this.main.evalLine(),
      'atom-hydra:evalBlock': () => this.main.evalBlock(),
      'atom-hydra:evalCode': () => this.main.evalCode(),
      'atom-hydra:toggleVisibility': () => this.main.toggleVisibility()
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

export default packageDefinition;
