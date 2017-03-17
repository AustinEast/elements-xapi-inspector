require("file?name=[name].[ext]!./icon.png");
require("file?name=[name].[ext]!./popup.html");
require("file?name=[name].[ext]!./manifest.json");
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

import App from './containers/App';
import './styles.less';

const store = configureStore();

document.addEventListener("DOMContentLoaded", function(event) { 
    render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('react-root')
    );
});
