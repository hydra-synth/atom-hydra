### VERY EXPERIMENTAL UNSTABLE PACKAGE FOR RUNNING HYDRA IN ATOM
note: do not use :)

#### Installing package in atom
From terminal:
1.  Download the atom-hydra repo: `git clone https://github.com/ojack/atom-hydra.git`
2. enter package directory: `cd atom-hydra`
3. add as package to atom: `apm link .`
4. install dependencies: `apm install`

### Running Atom-Hydra
1. restart atom
2. ctrl-alt-o to toggle the atom-hydra package
3. create a file ending with .js in atom
4. type `osc().out()`
3. ctrl-alt-enter to run block of code (no other key commands currently work)

### Receiving messages from Tidal/SuperDirt
1. Open ./examples/forwad-osc.sc in SUperCollider, and run. (this forwards Tidal messages to other OSC port)
2. Start atom-hydra using instructions above
3. open examples/osc-test.js in atom
4. Ctrl + Alt + Enter to run hydra code
5. run a tidal pattern that includes samples 'sd' and 'bd'
