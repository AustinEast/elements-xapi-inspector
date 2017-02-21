require("file?name=[name].[ext]!./icon.png");
require("file?name=[name].[ext]!./popup.html");
require("file?name=[name].[ext]!./manifest.json");
import React from 'react';
import { render } from 'react-dom';

import App from './containers/App';
import './styles.less';

document.addEventListener("DOMContentLoaded", function(event) { 
    render(<App />, document.getElementById('react-root'));
});
