# Elements xAPI Inspector
This plugin allows you to view xAPI statements as they are sent to an LRS.

## For Development
Clone this repo, then run `npm install` followed by `npm run dev` for development mode.
In Chrome, enter `chrome://extensions` in your URL bar.
Check the `Developer Mode` checkbox near the top right.
Click the `Load unpacked extension...` button and choose the `dist` folder in this project.
The extension will show up in the toolbar, the icon is a stack of books.

## Usage
To inspect the xAPI statements being sent, click the extension icon in Chrome's toolbar, a new window will appear, as statements are sent to the LRS they will appear in the list.
![Extension screenshot showing xAPI statements](docs/images/screenshot.png?raw=true "Screenshot")
