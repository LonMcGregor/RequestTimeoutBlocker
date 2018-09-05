"use strict";

import {timeIsAllowed, alwaysAllowed, redirect} from "./background.js";

const d0 = new Date("Jan 1 2018 02:59").getTime();
const d1 = new Date("Jan 1 2018 03:00").getTime();
const d2 = new Date("Jan 1 2018 03:01").getTime();
const d3 = new Date("Jan 1 2018 03:30").getTime();
const d4 = new Date("Jan 1 2018 03:59").getTime();
const d5 = new Date("Jan 1 2018 04:00").getTime();
const d6 = new Date("Jan 1 2018 04:01").getTime();

const d10 = new Date("Jan 1 2018 12:59").getTime();
const d11 = new Date("Jan 1 2018 13:00").getTime();
const d12 = new Date("Jan 1 2018 13:01").getTime();
const d13 = new Date("Jan 1 2018 13:30").getTime();
const d14 = new Date("Jan 1 2018 13:59").getTime();
const d15 = new Date("Jan 1 2018 14:00").getTime();
const d16 = new Date("Jan 1 2018 14:01").getTime();

const t0 = [
    [3, 4]
];
const t1 = [
    [1, 2],
    [13, 14]
];
const t2 = [
    [1, 2],
    [3, 4],
    [13, 14]
];

function expect(expected, actual){
    if(expected===actual){
        document.body.appendChild(document.createTextNode("."));
        return;
    }
    document.body.appendChild(document.createElement("br"));
    document.body.appendChild(document.createTextNode("X "+expected+" !== "+actual));
}

[t0, t2].forEach(x => {
    expect(timeIsAllowed(d0, x), false);
    expect(timeIsAllowed(d1, x), true);
    expect(timeIsAllowed(d2, x), true);
    expect(timeIsAllowed(d3, x), true);
    expect(timeIsAllowed(d4, x), true);
    expect(timeIsAllowed(d5, x), false);
    expect(timeIsAllowed(d6, x), false);
});

[d0, d1, d2, d3, d4, d5, d6].forEach(x => {
    expect(timeIsAllowed(x, t1), false);
});

expect(timeIsAllowed(d10, t0), false);
expect(timeIsAllowed(d11, t0), false);
expect(timeIsAllowed(d12, t0), false);
expect(timeIsAllowed(d13, t0), false);
expect(timeIsAllowed(d14, t0), false);
expect(timeIsAllowed(d15, t0), false);
expect(timeIsAllowed(d16, t0), false);
expect(timeIsAllowed(d10, t2), false);
expect(timeIsAllowed(d11, t2), true);
expect(timeIsAllowed(d12, t2), true);
expect(timeIsAllowed(d13, t2), true);
expect(timeIsAllowed(d14, t2), true);
expect(timeIsAllowed(d15, t2), false);
expect(timeIsAllowed(d16, t2), false);


const a0 = "http://example.com";
const a1 = "http://example.com/index";
const a2 = "http://example.com/index/";
const a3 = "http://example.com/index/subpage";
const a99 = ["http://example.com/index"];
expect(alwaysAllowed(a0, a99), false);
expect(alwaysAllowed(a1, a99), true);
expect(alwaysAllowed(a2, a99), true);
expect(alwaysAllowed(a3, a99), true);

const blockurl=chrome.runtime.getURL("blocked.html");
expect(redirect("").redirectUrl, blockurl+"?block=");
expect(redirect("www.example.com").redirectUrl, blockurl+"?block=www.example.com");
expect(redirect("https://www.example.com/").redirectUrl, blockurl+"?block=https://www.example.com/");
expect(redirect("https://www.example.com/page/stuff/index.html").redirectUrl, blockurl+"?block=https://www.example.com/page/stuff/index.html");
expect(redirect("https://www.example.com/page/stuff/index.html?query=safe&other=stuff").redirectUrl, blockurl+"?block=https://www.example.com/page/stuff/index.html?query=safe&other=stuff");
expect(redirect("https://www.example.com/page/stuff/index.html?block=uh-oh").redirectUrl, blockurl+"?block=https://www.example.com/page/stuff/index.html?block=uh-oh");
