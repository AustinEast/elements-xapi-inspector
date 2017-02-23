import React, { Component, PropTypes } from 'react';
import JSONTree from 'react-json-tree';
import moment from 'moment';
import 'moment-duration-format';
import theme from '../themes/nicinabox';

export default class Statements extends Component {
    constructor(props) {
        super(props);
        this.foundStatement = this.foundStatement.bind(this);
        this.state = { lastUpdated: undefined };
    }

    componentDidMount() {
        chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
            this.foundStatement(message);
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

    foundStatement(message) {
        const { addStatement } = this.props;
        addStatement(message);
    }

    render() {
        const { statements } = this.props;
        const { language } = this.props;
        return (
            <article>
                {statements.map((s, index) => {
                    const name = s && s.actor && s.actor.name || 'Unknown name';
                    const verb = s && s.verb && s.verb.display && s.verb.display[language] || 'Unknown verb';
                    // Look for an object's name. If there is no name, look for description.
                    const object = s && s.object && s.object.definition && s.object.definition && s.object.definition.name &&  s.object.definition.name[language] || s && s.object && s.object.definition && s.object.definition && s.object.definition.description &&  s.object.definition.description[language] || 'Unknown object';
                    const timestamp = moment(s.timestamp);
                    const timeAgo = moment.duration(moment().diff(timestamp)).format('h[h]m[m]s[s] ago');
                    return (

                        <div key={index} className="statement-block">
                            <div className="statement-heading">
                                <h3>{name + ' ' + verb + ' ' + object}</h3>
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
            </article>
        );
    }
}