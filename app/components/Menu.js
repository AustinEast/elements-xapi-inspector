import React, { Component, PropTypes } from 'react';
import ClipboardButton from 'react-clipboard.js';
import DropdownMenu, { NestedDropdownMenu } from 'react-dd-menu';
import theme from '../themes/nicinabox';

export default class Menu extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            isMenuOpen: false
        };

        this.clear = this.clear.bind(this);
        this.createLanguage = this.createLanguage.bind(this);
        this.createFilter = this.createFilter.bind(this);
        this.changeLanguage = this.changeLanguage.bind(this);
        this.changeFilter = this.changeFilter.bind(this);
        this.clickedAutoScroll = this.clickedAutoScroll.bind(this);
    }

    toggle = () => {
        this.setState({ isMenuOpen: !this.state.isMenuOpen });
    };

    close = () => {
        this.setState({ isMenuOpen: false });
    };

    clear() {
        const { clearStatements } = this.props;
        clearStatements();
    }

    createLanguage(language) {
        return ( <li key={ language.id } ><a onClick={ this.changeLanguage.bind(this, language) }>{ language.name }</a></li> )
    }

    createFilter(filter) {
        return ( <li key={ filter.name } ><a onClick={ this.changeFilter.bind(this, filter) }>{ filter.name }</a></li> )
    }

    changeLanguage(language) {
        const { languageSelected } = this.props
        languageSelected(language);
    }

    changeFilter(filter) {
        const { filterSelected } = this.props
        filterSelected(filter);
    }

    clickedAutoScroll() {
        const { autoScroll, toggleAutoScroll } = this.props;
        toggleAutoScroll(autoScroll);
    }

    render() {
        const { language, languages, filter, filters, statements, autoScroll } = this.props;

        const languageOptions = _.map(languages, this.createLanguage);
        const filterOptions = _.map(filters, this.createFilter);
        const autoScrollEnabled = autoScroll? 'Enabled' : 'Disabled';

        const menuOptions = {
            isOpen: this.state.isMenuOpen,
            close: this.close.bind(this),
            toggle: <span onClick={this.toggle.bind(this)}><i className="icon ion-android-more-vertical"></i></span>,
            align: 'right',
        };

        const nestedLanguages = {
            toggle: <a href="#">Default Language - { language.name }</a>,
            animate: true,
            openOnMouseover: false
        };

        const nestedFilters = {
            toggle: <a href="#">Statement Filter - { filter.name }</a>,
            animate: true,
            openOnMouseover: false
        };

        return (
            <header>
                <div className="button-panel">
                    <img src={require('../riptide-logo.png')}></img>
                    <DropdownMenu {...menuOptions}>
                        <li><button onClick={this.clear.bind(this)}>Clear Statements</button></li>
                        <li><ClipboardButton data-clipboard-text={JSON.stringify(statements, null, 4)}>Copy Statements</ClipboardButton></li>
                        <NestedDropdownMenu {...nestedLanguages}>{ languageOptions }</NestedDropdownMenu>
                        <NestedDropdownMenu {...nestedFilters}>{ filterOptions }</NestedDropdownMenu>
                        <li><button onClick={this.clickedAutoScroll.bind(this)}>Autoscroll - { autoScrollEnabled }</button></li>
                    </DropdownMenu>
                </div>
                <div className="button-panel-helper"></div>
            </header>
        );
    }
}
