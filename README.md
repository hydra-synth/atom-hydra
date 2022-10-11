## Experimental package for running hydra in atom text editor.
Also includes p5.js, support for OSC channels, and for live coding with javascript in general.

For example usage, see: https://github.com/ojack/hydra-examples

For browser version, see: https://github.com/ojack/hydra

## Installing atom-hydra !UPDATED!
### NOTE: Atom text editor is being deprecated! However, this package should still work.
This package will continue to be sporadically maintained for the time being. In the future, it will hopefully work with community forks of atom.

It is no longer possible to publish packages to the atom package registry. Instead, you must update atom hydra manually. Here are the steps for doing that:

1. Make sure that `apm` (atom package manager) is installed. On linux and windows, it should be automatically installed with atom. On OSX, go to the 'Atom' menu, and click 'Install Shell Commands'. 
2. Download this repository `git clone https://github.com/hydra-synth/atom-hydra.git`
3. Enter the atom directory `cd atom-hydra`
4. Load this package `apm link .`
5. Restart atom 

## Running atom-hydra
1. restart atom
2. packages > atom-hydra > toggle
3. create a file ending with .js in atom
4. type `osc().out()`
5. ctrl-enter to run block of code
6. shift-enter to run a line of code
7. ctrl-h to show and hide code

### Error: camera and mic not working on OSX
See the instructions and thread at: https://github.com/hydra-synth/atom-hydra/issues/35#issuecomment-941006156

### Error: webgl not supported
Try running atom from the command line as follows:
`atom --ignore-gpu-blacklist `

### Error: node not found
Install nodejs

Code for editor styling and osc channels lovingly derived from some other wonderful live coding packages:
* https://atom.io/packages/veda
* https://github.com/tidalcycles/atom-tidalcycles
