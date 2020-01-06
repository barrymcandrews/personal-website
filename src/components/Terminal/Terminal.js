import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';
// import './Terminal.module.scss';
import 'xterm/css/xterm.css'
import styles from './Terminal.module.scss'
import {Terminal as XTerm} from 'xterm';
import {FitAddon} from 'xterm-addon-fit';
import {WebLinksAddon} from 'xterm-addon-web-links';


export default class Terminal extends Component {

    constructor(props) {
        super(props);
        this.fitAddon = new FitAddon();
        this.webLinksAddon = new WebLinksAddon();
        this.term = new XTerm({
            cursorBlink: true,
            fontFamily: `"Source Code Pro", monospace`,
            convertEol: true,
            fontSize: 12,
            rendererType: 'dom',

            theme: {
                background: "#2F2F2F",
                cursorAccent: "#2F2F2F",
                foreground: "#9D9D9D",
                cursor: "#9D9D9D",
            },
        });
        this.input = '';
    }

    onData(data) {
        const code = data.charCodeAt(0);
        if (code === 13) { // CR
            this.term.write("\r\ncommand not found: " + this.input + "\r\n");
            this.term.write("$ ");
            this.input = "";
        } else if (code < 32 || code === 127) { // Control
            return;
        } else { // Visible
            this.term.write(data);
            this.input += data;
        }
    }

    componentDidMount() {
        const terminalContainer = findDOMNode(this);
        this.term.loadAddon(this.fitAddon);
        this.term.loadAddon(this.webLinksAddon);
        this.term.open(terminalContainer);
        this.fitAddon.fit();
        this.term.write("$ ");
        this.term.onData((d) => this.onData(d));
        window.addEventListener('resize',  this.fitAddon.fit());
    }

    componentWillUnmount() {
        this.term.dispose();
        window.removeEventListener('resize',  this.fitAddon.fit());
    }

    render() {
        return (
            <div className={styles.terminalContainer} id="terminal-container" />
        );
    }
}
