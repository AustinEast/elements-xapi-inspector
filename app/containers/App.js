import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import JSONTree from 'react-json-tree';
import { languages } from '../data/languages';
import * as actions from '../actions';

import Menu from '../components/Menu.js';
import Statements from '../components/Statements.js'

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <main>
                <Menu languages={languages} {...this.props} />
                <Statements {...this.props} />
            </main>
        );
    }
}

function mapStateToProps(state) {
    return {
        statements: state.statements,
        language: state.language,
        autoScroll: state.autoScroll
    };
}

export default connect(mapStateToProps, {
    addStatement: actions.addStatement,
    clearStatements: actions.clearStatements,
    languageSelected: actions.languageSelected,
    toggleAutoScroll: actions.toggleAutoScroll
})(App);
