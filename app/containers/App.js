import React, { Component, PropTypes } from 'react';
import JSONTree from 'react-json-tree';
import ClipboardButton from 'react-clipboard.js';
import moment from 'moment';
import 'moment-duration-format';
import theme from '../themes/nicinabox';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statements: [],
            lastUpdated: undefined
        };
    }

    componentDidMount() {
        chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
            this.setState({
                statements: this.state.statements.concat(JSON.parse(message))
            });
        });

        this.updateTimer = setInterval(() => {
            // Force an update
            this.setState({
                lastUpdated: moment()
            });
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.updateTimer);
    }

    clear() {
        this.setState({
            statements: []
        });
    }

    render() {
        return (
            <div>
                <div className="button-panel">
                    <button onClick={this.clear.bind(this)}>Clear</button>
                    <ClipboardButton data-clipboard-text={JSON.stringify(this.state.statements, null, 4)}>Copy Statements</ClipboardButton>
                </div>
                {this.state.statements.map((s, index) => {
                    const verbId = s && s.verb && s.verb.id || 'Unknown verb';
                    const timestamp = moment(s.timestamp);
                    const timeAgo = moment.duration(moment().diff(timestamp)).format('h[h]m[m]s[s] ago');
                    return (
                        <div key={index} className="statement-block">
                            <div className="statement-heading">
                                <h3>{verbId}</h3>
                                <span>{timeAgo}</span>
                            </div>
                            <JSONTree
                                theme={theme}
                                data={s}
                                invertTheme={false}
                                hideRoot={true}
                            />
                        </div>
                    );
                })}
            </div>
        );
    }
}
