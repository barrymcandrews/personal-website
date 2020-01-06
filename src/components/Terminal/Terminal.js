import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';
// import PropTypes from 'prop-types';
// import 'xterm/dist/addons/fit/fit.js';
import {Terminal as XTerm} from 'xterm';
import {FitAddon} from 'xterm-addon-fit';
import {WebLinksAddon} from 'xterm-addon-web-links';


export default class Terminal extends Component {
    // static propTypes = {
    //     socketURL: PropTypes.string.isRequired,
    //     onError: PropTypes.func,
    //     onClose: PropTypes.func,
    //     title: PropTypes.string,
    // };

    constructor(props) {
        super();
        // super(props);
        this.fitAddon = new FitAddon();
        this.webLinksAddon = new WebLinksAddon();
        this.term = new XTerm({
            cursorBlink: true,
            fontFamily: `"Source Code Pro", monospace`,
            convertEol: true,
            fontSize: 12,
            rendererType: 'dom',
            disableStdin: false,

        });
        this.handleResize = this.handleResize.bind(this);
    }

    handleResize() {
        this.fitAddon.fit();
    }

    close() {
        this.term.destroy();
        // this.socket.close();
    }

    // componentWillMount() {
    //     const {onClose, socketURL} = this.props;
    //     if (!socketURL) {
    //         onClose && onClose();
    //         this.close();
    //     }
    // }

    // createSocket(socketURL: string) {
    //     this.socket = new WebSocket(`${socketURL}?dim=${this.cols}|${this.rows}`);
    //     this.socket.onopen = () => {
    //         this.term.write(this.props.title);
    //         this.term.csphereAttach(this.socket);
    //         this.term.fit();
    //     }
    // }

    componentDidMount() {
        const terminalContainer = findDOMNode(this);
        this.term.loadAddon(this.fitAddon);
        this.term.loadAddon(this.webLinksAddon);
        this.term.open(terminalContainer);
        this.fitAddon.fit();
        this.term.write(this.props.title);

        // const {cols, rows} = this.term.proposeGeometry();
        // this.cols = cols;
        // this.rows = rows;
        // this.createSocket(this.props.socketURL);
        window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
        this.close();
        window.removeEventListener('resize', this.handleResize);
    }

    componentWillReceiveProps(nextProps) {
        // const {socketURL} = this.props;
        // if (socketURL !== nextProps.socketURL) {
        //     this.socket.close();
            this.term.reset();
            // this.createSocket(nextProps.socketURL);
        // }
    }

    render() {
        return (
            <div id="terminal-container" />
        );
    }
}

Terminal.defaultProps = {
    title: '\x1b[32mWelcome to use online terminal!\x1b[m\r\n'
};
