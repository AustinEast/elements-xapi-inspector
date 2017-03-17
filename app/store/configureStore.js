import { createStore, applyMiddleware, compose } from 'redux';
import { devTools } from 'redux-devtools';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';
import chromeStorageAdapter from './chromeStorageAdapter';
import _ from 'lodash';

import persistState, { mergePersistedState } from 'redux-localstorage';
import filter from 'redux-localstorage-filter';

// Persist our state to LocalStorage
const reducer = compose(
    mergePersistedState()
)(rootReducer);

// Function to create our store with middleware
const finalCreateStore = compose(
    persistState(chromeStorageAdapter(chrome.storage), 'elements-xapi-inspector'),
    applyMiddleware(thunk),
    applyMiddleware(createLogger()),
    devTools()
)(createStore);

export default function configureStore(initialState) {
    const store = finalCreateStore(reducer, initialState);

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers');
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}