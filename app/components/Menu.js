import React, { Component, PropTypes } from 'react';
import ClipboardButton from 'react-clipboard.js';
import theme from '../themes/nicinabox';

export default class Menu extends Component {
    constructor(props) {
        super(props);
        this.clear = this.clear.bind(this);
        this.createLanguage = this.createLanguage.bind(this);
        this.changeLanguage = this.changeLanguage.bind(this);
        this.clickedAutoScroll = this.clickedAutoScroll.bind(this);
    }

    clear() {
        const { clearStatements } = this.props;
        clearStatements();
    }

    createLanguage(language) {
        return ( <option key={ language.id } value={ language.id }>Default Language - { language.name }</option> )
    }

    changeLanguage(event) {
        const { languageSelected } = this.props
        languageSelected(event.target.value);
    }

    clickedAutoScroll() {
        const { autoScroll, toggleAutoScroll } = this.props;
        toggleAutoScroll(autoScroll);
    }

    render() {
        const { language, statements, languages, autoScroll } = this.props;

        const languageOptions = _.map(languages, this.createLanguage);
        const autoScrollEnabled = autoScroll? 'Enabled' : 'Disabled';

        return (
            <header>
                <div className="button-panel">
                    <button onClick={this.clear.bind(this)}>Clear</button>
                    <ClipboardButton data-clipboard-text={JSON.stringify(statements, null, 4)}>Copy Statements</ClipboardButton>
                    <select value = { language } onChange= { this.changeLanguage }>{ languageOptions }</select>
                    <button onClick={this.clickedAutoScroll.bind(this)}>Autoscroll - { autoScrollEnabled }</button>
                </div>
                <div className="button-panel-helper"></div>
            </header>
        );
    }
}
