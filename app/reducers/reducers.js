import * as types from '../actions';
import {actionTypes} from 'redux-localstorage';

export function statements(state = [], action) {
    switch (action.type) {
        case types.ADD_STATEMENT:
            return [
                ...state.concat(JSON.parse(action.statement))
            ]
        case types.CLEAR_STATEMENT:
            return []
        default:
            return state;
    }
}

export function language(state = 'en-us', action) {
    switch (action.type) {
        case types.LANGUAGE_SELECTED:
            return action.language
        default:
            return state;
    }
}
