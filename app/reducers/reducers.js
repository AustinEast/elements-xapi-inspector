import * as types from '../actions';
import {actionTypes} from 'redux-localstorage';

export function statements(state = [], action) {
    switch (action.type) {
        case types.ADD_STATEMENT:
            return [
                ...state.concat(action.statement)
            ]
        case types.CLEAR_STATEMENT:
            return []
        default:
            return state;
    }
}

export function language(state = { name: 'English', id: 'en-us' }, action) {
    switch (action.type) {
        case types.LANGUAGE_SELECTED:
            return action.language
        default:
            return state;
    }
}

export function filter(state = { name: 'All', check: function(statusCode) { return true } }, action) {
    switch (action.type) {
        case types.FILTER_SELECTED:
            return action.filter
        default:
            return state;
    }
}

export function autoScroll(state = true, action) {
    switch (action.type) {
        case types.AUTOSCROLL_TOGGLED:
            return action.autoScroll
        default:
            return state;
    }
}
