import React, { Component, PropTypes } from 'react';
import ClipboardButton from 'react-clipboard.js';
import DropdownMenu, { NestedDropdownMenu } from 'react-dd-menu';
import JSONTree from 'react-json-tree';
import moment from 'moment';
import classNames from 'classnames';
import 'moment-duration-format';
import theme from '../themes/nicinabox';
import _ from 'lodash';

export default class Statement extends Component {
    constructor(props) {
        super(props);
        this.checkLanguage = this.checkLanguage.bind(this);
        this.constructReadibleStatement = this.constructReadibleStatement.bind(this);
        this.state = { 
            lastUpdated: props.lastUpdated,
            statement: props.statement, 
            status: props.status,
            statusCode: props.statusCode,
            isMenuOpen: false 
        };
    }

    toggle = () => {
        this.setState({ isMenuOpen: !this.state.isMenuOpen });
    };

    close = () => {
        this.setState({ isMenuOpen: false });
    };

    checkLanguage(object) {
        const { language } = this.props;
        if(object) {
            if (object[language.id]) {
                return language.id;
            } else {
                return Object.keys(object)[0];
            }
        }
    }

    // Look for the statement object's name. If there is no name, look for description.
    // If those are found, construct the legible statement. 
    //      Each statement will look to see if it contains the default language. 
    //      If it does, it will use that. If not, it will use the first language described in the object.
    // Otherwise just print the verb ID.
    constructReadibleStatement(statement) {
        if (_.has(statement, 'object.definition.name') || _.has(statement, 'object.definition.description')) {
            const name = _.get(statement, 'actor.name', 'Unknown name');
            const verb = _.get(statement, 'verb.display[' + this.checkLanguage(statement.verb.display) + ']', 'Unknown verb');
            const object = _.get(statement, 'object.definition.name[' + this.checkLanguage(statement.object.definition.name) + ']', _.get(statement, 'object.definition.description[' + this.checkLanguage(statement.object.definition.description) + ']', 'Unknown Object'));

            return name + ' ' + verb + ' ' + object;
        }
        return _.get(statement, 'verb.id','Unknown verb');
    }

    render() {
        const printedStatement = this.constructReadibleStatement(this.state.statement);
        const timestamp = moment(this.state.statement.timestamp);
        const timeAgo = moment.duration(moment().diff(timestamp)).format('h[h]m[m] ago');

        const statusClass = classNames({
            'status-success': (this.props.statusCode >= 200 && this.props.statusCode < 300),
            'status-failure': (this.props.statusCode < 200 || this.props.statusCode >= 300)
        });

        const menuOptions = {
            isOpen: this.state.isMenuOpen,
            close: this.close.bind(this),
            toggle: <span className='options' onClick={this.toggle.bind(this)}><i className="icon ion-android-more-vertical"></i></span>,
            align: 'right',
        };

        return (
            <div className="statement-block">
                <div className={"statement-heading " + statusClass }>
                    <h3>{printedStatement}</h3>
                    <span className='time'>{timeAgo}</span>
                    <DropdownMenu {...menuOptions}>
                        <li><ClipboardButton data-clipboard-text={JSON.stringify(this.state.statement, null, 4)}>Copy Statement</ClipboardButton></li>
                        <li><a href={'https://httpstatuses.com/' + this.state.statusCode } target='blank'>Status Code - { this.state.statusCode }</a></li>
                    </DropdownMenu>
                </div>
                <div className="statement-body">
                    <JSONTree
                        theme={theme}
                        data={this.state.statement}
                        invertTheme={false}
                        hideRoot={true}
                    />
                </div>
            </div>
        );
    }
}