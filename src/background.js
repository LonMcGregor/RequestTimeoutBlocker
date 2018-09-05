"use strict";

const REDIRECT = {redirectUrl: chrome.runtime.getURL("blocked.html")};

const BLOCKING_MODE = "TIMED";
const HOURS_AVAILABLE = [
    [7, 10]
];

/*export */function timeIsAllowed(requestTime, restrictedHours){
    const requestDate = new Date(requestTime);
    const hour = requestDate.getHours();
    for(let i = 0; i < restrictedHours.length; i++){
        if(restrictedHours[i][0] <= hour && hour < restrictedHours[i][1]){
            return true;
        }
    }
    return false;
}

/*export */function alwaysAllowed(requestUrl, allowedUrls){
    for(let i = 0; i < allowedUrls.length; i++){
        if(requestUrl.indexOf(allowedUrls[i]) > -1){
            return true;
        }
    }
    return false;
}

function onBeforeRequest(request){
    if(alwaysAllowed(request.url, ALWAYS_ALLOW)){
        return;
    } else if(BLOCKING_MODE === "TIMED" && !timeIsAllowed(request.timeStamp, HOURS_AVAILABLE)){
        return REDIRECT;
    }
}

const FILTER = {
    urls: [
        "*://*.reddit.com/*",
        "*://*.twitter.com/*"
    ]/*,
    types: [
        "main_frame",
        "sub_frame"
    ]*/
};

const ALWAYS_ALLOW = [
    "https://twitter.com/LonMcGregor/lists/transport"
];

const EXTRA_INFO = ["blocking"];

chrome.webRequest.onBeforeRequest.addListener(onBeforeRequest, FILTER, EXTRA_INFO);
