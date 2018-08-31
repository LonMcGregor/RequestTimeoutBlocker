"use strict";

const REDIRECT = {redirectUrl: chrome.runtime.getURL("blocked.html")};

const BLOCKING_MODE = "TIMED";
const HOURS_AVAILABLE = [
    [8, 10],
    [17, 18]
];

export function timeIsAllowed(requestTime, restrictedHours){
    const requestDate = new Date(requestTime);
    const hour = requestDate.getHours();
    for(let i = 0; i < restrictedHours.length; i++){
        if(restrictedHours[i][0] <= hour && hour < restrictedHours[i][1]){
            return true;
        }
    }
    return false;
}

function onBeforeRequest(request){
    return (BLOCKING_MODE==="TIMED" && !timeIsAllowed(request.timeStamp, HOURS_AVAILABLE)) ? REDIRECT : true;
}

const FILTER = {
    urls: [
        "*://*.reddit.com/*",
        "*://*.twitter.com/*"
    ]
};

const EXTRA_INFO = ["blocking"];

chrome.webRequest.onBeforeRequest.addListener(onBeforeRequest, FILTER, EXTRA_INFO);
