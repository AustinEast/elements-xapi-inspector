import _ from 'lodash';

let requestObj = {
    requestId: '',
    data: ''
};

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
            requestObj = {
                requestId: details.requestId,
                data: bufferToString(details.requestBody.raw[0].bytes)
            }
        }
    },
    { urls: ['<all_urls>']},
    ['requestBody']
);

chrome.webRequest.onSendHeaders.addListener(
    function(details) {
        if (details.method === 'POST') {
            const hasId = details.requestId == requestObj.requestId;
            // Need to check for lower case header name (Firefox support)
            const hasHeader = _.some(details.requestHeaders, function(header) { return header.name.toLowerCase() === 'x-experience-api-version'; });
            if (hasId && hasHeader) {
                chrome.runtime.sendMessage(requestObj.data);
            }
        }
    },
    { urls: ['<all_urls>']},
    ['requestHeaders']
);
