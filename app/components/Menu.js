import React, { Component, PropTypes } from 'react';
import ClipboardButton from 'react-clipboard.js';
import theme from '../themes/nicinabox';

export default class Menu extends Component {
    constructor(props) {
        super(props);
        this.clear = this.clear.bind(this);
        this.createLanguage = this.createLanguage.bind(this);
        this.changeLanguage = this.changeLanguage.bind(this)
    }

    clear() {
        const { clearStatements } = this.props;
        clearStatements();
    }

    createLanguage(language) {
        return ( <option key={ language.id } value={ language.id }> { language.name }</option> )
    }

    changeLanguage(event) {
        const { languageSelected } = this.props
        languageSelected(event.target.value);
    }

    render() {
        const { language } = this.props;
        const { statements } = this.props;
        const { languages } = this.props;
        const languageOptions = _.map(languages, this.createLanguage);

        return (
            <header>
                <div className="button-panel">
                    <button onClick={this.clear.bind(this)}>Clear</button>
                    <ClipboardButton data-clipboard-text={JSON.stringify(statements, null, 4)}>Copy Statements</ClipboardButton>
                    <select value = { language } onChange= { this.changeLanguage }>{ languageOptions }</select>
                </div>
                <div className="button-panel-helper"></div>
            </header>
        );
    }
}
