'use babel';

class ConsoleView {
    constructor(serializeState) {
        this.tidalConsole = null;
        this.log = null;
    }

    initUI() {
        if (this.tidalConsole) return;
        this.tidalConsole = document.createElement('div');
        this.tidalConsole.setAttribute('tabindex', -1);
        this.tidalConsole.classList.add('tidalcycles', 'console', 'native-key-bindings');

        this.log = document.createElement('div');
        this.tidalConsole.appendChild(this.log);

        atom.workspace.addBottomPanel({
            item: this.tidalConsole
        });
    }

    serialize() {

    }

    destroy() {
        this.tidalConsole.remove();
    }

    logStdout(text) {
        this.logText(text);
    }

    logStderr(text) {
        this.logText(text, "error");
    }
    logText(text,className) {
        if (!text) return;
        this.tidalConsole.scrollTop = this.tidalConsole.scrollHeight;
        var textNode = document.createElement("span");
        if(className){
          textNode.className = className;
        }
        textNode.innerHTML = text.replace('\n', '<br/>');
        this.log.appendChild(textNode);
    }
}

export default ConsoleView;
