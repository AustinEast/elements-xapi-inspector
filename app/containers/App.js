import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import JSONTree from 'react-json-tree';
import { languages } from '../data/languages';
import { filters } from '../data/filters';
import * as actions from '../actions';
import Scroll from 'react-scroll';

import Menu from '../components/Menu.js';
import List from '../components/List.js';
import Footer from '../components/Footer.js';

class App extends Component {
    constructor(props) {
        super(props);
        this.foundStatement = this.foundStatement.bind(this);
    }

    componentDidMount() {
        chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
            _.forEach(JSON.parse(message.data), function(statement) {
                this.foundStatement({statement , statusCode: message.statusCode});
            }.bind(this));
        });
    }

    foundStatement(message) {
        const { addStatement, autoScroll } = this.props;
        addStatement(message);
        if (autoScroll) { Scroll.animateScroll.scrollToBottom(); }
    }

    render() {
        return (
            <main>
                <Menu languages={languages} filters={filters} {...this.props} />
                <List {...this.props} />
                <Footer />
            </main>
        );
    }
}

function mapStateToProps(state) {
    return {
        statements: state.statements,
        language: state.language,
        filter: state.filter,
        autoScroll: state.autoScroll
    };
}

export default connect(mapStateToProps, {
    addStatement: actions.addStatement,
    clearStatements: actions.clearStatements,
    languageSelected: actions.languageSelected,
    filterSelected: actions.filterSelected,
    toggleAutoScroll: actions.toggleAutoScroll
})(App);
