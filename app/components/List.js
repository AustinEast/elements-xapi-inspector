import React, { Component, PropTypes } from 'react';
import Statement from './Statement.js'
import moment from 'moment';
import 'moment-duration-format';
import _ from 'lodash';

export default class List extends Component {
    constructor(props) {
        super(props);
        this.state = { lastUpdated: undefined };
        this.isFunction = this.isFunction.bind(this);
    }

    componentDidMount() {
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

    isFunction(functionToCheck) {
        var getType = {};
        return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
    }

    render() {
        const { statements, filter } = this.props;

        return (
            <article>
                {statements.map((s, index) => {
                    if (!this.isFunction(filter.check) || filter.check(s.statusCode)) {
                        return (<Statement key={index} statement={ s.statement } statusCode={ s.statusCode } {...this.props}/>);
                    }
                })}
            </article>
        );
    }
}