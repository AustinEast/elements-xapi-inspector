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

    checkLanguage(object) {
        const { language } = this.props;

        if (object[language]) {
            return language;
        } else {
            return Object.keys(obj)[0];
        }
    }

    render() {
        const { statements } = this.props;

        return (
            <article>
                {statements.map((s, index) => {
                    // Look for the statement object's name. If there is no name, look for description.
                    // If those are found, construct the legible statement. 
                    //      Each statement will look to see if it contains the default language. 
                    //      If it does, it will use that. If not, it will use the first language described in the object.
                    // Otherwise just print the verb ID.
                    let printedStatement = s && s.verb && s.verb.id || 'Unknown verb';
                    if (s && s.object && s.object.definition && s.object.definition && s.object.definition.name &&  s.object.definition.name[this.checkLanguage(s.object.definition.name)] 
                    || s && s.object && s.object.definition && s.object.definition && s.object.definition.description &&  s.object.definition.description[this.checkLanguage(s.object.definition.description)]) {
                        const name = s && s.actor && s.actor.name || 'Unknown name';
                        const verb = s && s.verb && s.verb.display && s.verb.display[this.checkLanguage(s.verb.display)] || 'Unknown verb';
                        const object = s && s.object && s.object.definition && s.object.definition && s.object.definition.name &&  s.object.definition.name[this.checkLanguage(s.object.definition.name)] 
                        || s && s.object && s.object.definition && s.object.definition && s.object.definition.description &&  s.object.definition.description[this.checkLanguage(s.object.definition.description)];

                        printedStatement = name + ' ' + verb + ' ' + object;
                    }

                    const timestamp = moment(s.timestamp);
                    const timeAgo = moment.duration(moment().diff(timestamp)).format('h[h]m[m]s[s] ago');
                    return (

                        <div key={index} className="statement-block">
                            <div className="statement-heading">
                                <h3>{printedStatement}</h3>
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