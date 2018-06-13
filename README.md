### Experimental package for running hydra in atom.
Also includes p5.js, support for OSC channels, and for live coding with javascript in general.

For example usage, see: https://github.com/ojack/hydra-examples

For browser version, see: https://github.com/ojack/hydra


### Running Atom-Hydra
1. restart atom
2. packages > atom-hydra > toggle
3. create a file ending with .js in atom
4. type `osc().out()`
5. ctrl-enter to run block of code
6. shift-enter to run a line of code

### Error: webgl not supported
Try running atom from the command line as follows:
`atom --ignore-gpu-blacklist `

### Error: node not found
Install nodejs

Code for editor styling and osc channels lovingly derived from some other wonderful live coding packages:
* https://atom.io/packages/veda
* https://github.com/tidalcycles/atom-tidalcycles
