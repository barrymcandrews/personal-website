import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';
import 'xterm/css/xterm.css'
import styles from './Terminal.module.scss'
import {Terminal as XTerm} from 'xterm';
import {FitAddon} from 'xterm-addon-fit';
import {WebLinksAddon} from 'xterm-addon-web-links';
import * as Ascii from '../../shell/Ascii';
import sh from '../../shell/commands/sh';
import {init} from '../../shell/proc';


export default class Terminal extends Component {
    fitAddon = new FitAddon();
    webLinksAddon = new WebLinksAddon();
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
        this.connectShell();
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

    private async connectShell(sendCopyrightCommand: boolean = true) {
        let shell = init(sh);

        shell.env.put("ROWS", this.term.rows.toString());
        shell.env.put("COLS", this.term.cols.toString());

        // Connect shell to terminal
        this.term.onData((d) => shell.stdin.write(d));
        shell.stdout.onWrite(d => this.term.write(d));

        window.addEventListener('resize',  () => {
            this.fitAddon.fit();
            shell.env.put("ROWS", this.term.rows.toString());
            shell.env.put("COLS", this.term.cols.toString());
        });
        shell.start(['sh', '--login', '-i']);
        if (sendCopyrightCommand) {
            let command = 'cat copyright.txt' + Ascii.CR;
            command.split('').forEach(char => shell.stdin.write(char));
        }

        await shell.wait();
        await this.connectShell(false);
    }
}
