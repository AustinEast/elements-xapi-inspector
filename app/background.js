import _ from 'lodash';

const requestObjects = [];

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
            requestObjects.push({
                requestId: details.requestId,
                data: bufferToString(details.requestBody.raw[0].bytes)
            });
        }
    },
    { urls: ['<all_urls>']},
    ['requestBody']
);

chrome.webRequest.onSendHeaders.addListener(
    function(details) {
        if (details.method === 'POST') {
            const foundId = _.findIndex(requestObjects, function(requestObject) { return details.requestId == requestObject.requestId; });
            // If the matched requestObject doesnt have the correct headers, remove it from the array
            // Need to check for lower case header name (Firefox support)
            const hasHeader = _.some(details.requestHeaders, function(header) { return header.name.toLowerCase() === 'x-experience-api-version'; });
            if (foundId != -1 && !hasHeader) {
                requestObjects.splice(foundId, 1);
            }
        }
    },
    { urls: ['<all_urls>']},
    ['requestHeaders']
);

chrome.webRequest.onCompleted.addListener(
    function(details) {
        if (details.method === 'POST') {
            const foundId = _.findIndex(requestObjects, function(requestObject) { return details.requestId == requestObject.requestId; });
            if (foundId != -1) {
                requestObjects[foundId].statusCode = details.statusCode;
                chrome.runtime.sendMessage(requestObjects[foundId]);
                requestObjects.splice(foundId, 1);
            }
        }
    },
    { urls: ['<all_urls>']},
    ['responseHeaders']
);
