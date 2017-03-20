import React, { Component, PropTypes } from 'react';
import Scroll from 'react-scroll';
import ClipboardButton from 'react-clipboard.js';
import JSONTree from 'react-json-tree';
import moment from 'moment';
import 'moment-duration-format';
import theme from '../themes/nicinabox';
import _ from 'lodash';

export default class Statements extends Component {
    constructor(props) {
        super(props);
        this.foundStatement = this.foundStatement.bind(this);
        this.checkLanguage = this.checkLanguage.bind(this);
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
        }, 60000);
    }

    componentWillUnmount() {
        clearInterval(this.updateTimer);
    }

    foundStatement(message) {
        const { addStatement, autoScroll } = this.props;
        addStatement(message);
        if (autoScroll) { Scroll.animateScroll.scrollToBottom(); }
    }

    checkLanguage(object) {
        const { language } = this.props;

        if(object) {
            if (object[language]) {
                return language;
            } else {
                return Object.keys(object)[0];
            }
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
                    let printedStatement = _.get(s, 'verb.id','Unknown verb');

                    if (_.has(s, 'object.definition.name') || _.has(s, 'object.definition.description')) {
                        const name = _.get(s, 'actor.name', 'Unknown name');
                        const verb = _.get(s, 'verb.display[' + this.checkLanguage(s.verb.display) + ']', 'Unknown verb');
                        const object = _.get(s, 'object.definition.name[' + this.checkLanguage(s.object.definition.name) + ']', _.get(s, 'object.definition.description[' + this.checkLanguage(s.object.definition.description) + ']', 'Unknown Object'));

                        printedStatement = name + ' ' + verb + ' ' + object;
                    }

                    const timestamp = moment(s.timestamp);
                    const timeAgo = moment.duration(moment().diff(timestamp)).format('h[h]m[m] ago');
                    return (

                        <div key={index} className="statement-block">
                            <div className="statement-heading">
                                <h3>{printedStatement}</h3>
                                <span>{timeAgo}</span>
                                <ClipboardButton data-clipboard-text={JSON.stringify(s, null, 4)}><i className="icon ion-clipboard"></i></ClipboardButton>
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