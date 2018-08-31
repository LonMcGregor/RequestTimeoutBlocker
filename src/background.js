const REDIRECT = {redirectUrl: chrome.runtime.getURL("blocked.html")};

function onBeforeRequest(request){
    return REDIRECT;
    // if request is on list of filters
    // if request has been visited too recently
    // block
}

const FILTER = {
    urls: [
        "*://*.reddit.com/*",
        "*://*.twitter.com/*"
    ]
};

const EXTRA_INFO = ["blocking"];

chrome.webRequest.onBeforeRequest.addListener(onBeforeRequest, FILTER, EXTRA_INFO);
