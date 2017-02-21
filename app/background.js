import _ from 'lodash';

function bufferToString(buffer) {
    return String.fromCharCode.apply(null, new Uint8Array(buffer));
}

chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.windows.create({
        url: chrome.extension.getURL('popup.html'),
        width: 600,
        height: 900,
        type: 'popup'
    });
});

chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        const isPost = details.method === 'POST';
        const hasBody = _.has(details, 'requestBody.raw[0].bytes');
        if (isPost && hasBody) {
            chrome.runtime.sendMessage(bufferToString(details.requestBody.raw[0].bytes));
        }
    },
    { urls: ["*://*/lrs/statements"]},
    ['requestBody']
);
