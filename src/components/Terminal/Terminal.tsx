import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';
import 'xterm/css/xterm.css'
import styles from './Terminal.module.scss'
import {Terminal as XTerm} from 'xterm';
import {FitAddon} from 'xterm-addon-fit';
import {WebLinksAddon} from 'xterm-addon-web-links';
import Shell from '../../shell/Shell';
import * as Ascii from '../../shell/Ascii';


export default class Terminal extends Component {
    fitAddon = new FitAddon();
    webLinksAddon = new WebLinksAddon();
    shell = new Shell();
    term = new XTerm({
        cursorBlink: true,
        fontFamily: `"Source Code Pro", monospace`,
        fontWeight: '500',
        convertEol: true,
        fontSize: 12,
        rendererType: 'dom',
        bellStyle: 'sound',
        theme: {
            background: "#212121",
            cursorAccent: "#212121",
            foreground: "#9D9D9D",
            cursor: "#9D9D9D",
        },
    });

    componentDidMount() {
        const terminalContainer = findDOMNode(this) as HTMLElement;
        this.term.loadAddon(this.fitAddon);
        this.term.loadAddon(this.webLinksAddon);
        this.term.open(terminalContainer);
        this.fitAddon.fit();
        this.term.write("$ ");

        // Connect shell to terminal
        this.term.onData((d) => this.shell.handleData(d));
        this.shell.onWrite((d) => this.term.write(d));

        window.addEventListener('resize',  () => this.fitAddon.fit());
        this.shell.handleString('cat copyright.txt' + Ascii.CR);

    }

    componentWillUnmount() {
        this.term.dispose();
        window.removeEventListener('resize',  () => this.fitAddon.fit());
    }

    render() {
        return (
            <div className={styles.terminalContainer} id="terminal-container" />
        );
    }
}
