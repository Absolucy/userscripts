// ==UserScript==
// @name        NoMoreTwitterInterests
// @description Gets rid of the stupid "interests" on your Twitter for Web timeline (the "Follow Topic" crap)
// @version     1.0.2
// @author      Lucy
// @copyright   2021, Lucy (absolucy.moe)
// @license     BSD-3-Clause; https://github.com/Absolucy/userscripts/blob/dev/LICENSE.md
// @updateURL   https://cdn.jsdelivr.net/gh/Absolucy/userscripts@dev/scripts/NoMoreTwitterInterests.user.js
// @downloadURL https://cdn.jsdelivr.net/gh/Absolucy/userscripts@dev/scripts/NoMoreTwitterInterests.user.js
// @source      https://github.com/Absolucy/userscripts
// @namespace   https://github.com/Absolucy
// @match       *://twitter.com/*
// @match       *://*.twitter.com/*
// @grant       none
// @meta        Trans rights are human rights.
// @meta        If you disagree with that, you have every right to fuck off and not use my scripts :)
// ==/UserScript==

const TOPIC_PATH="M18.265 3.314c-3.45-3.45-9.07-3.45-12.52 0-3.45 3.44-3.45 9.06 0 12.51 1.5 1.49 3.43 2.38 5.51 2.56v4.14c0 .31.2.6.5.7.08.03.17.05.25.05.22 0 .44-.1.59-.29l6.49-8.11c2.63-3.49 2.27-8.47-.82-11.56zm-10.56 7.87c0-.41.33-.75.75-.75h4.05c.41 0 .75.34.75.75s-.34.75-.75.75h-4.05c-.42 0-.75-.34-.75-.75zm8.6-3.24c0 .42-.34.75-.75.75h-7.1c-.42 0-.75-.33-.75-.75 0-.41.33-.75.75-.75h7.1c.41 0 .75.34.75.75z";

setInterval(function () {
	let elements = document.querySelectorAll('svg.r-1janqcz.r-10ptun7');
	for (e in elements) {
		let node = elements[e]
		if (node?.querySelector('path')?.getAttribute("d") === TOPIC_PATH) {
			var p = node.parentElement;
			while (p.parentElement != null && p.tagName.toLowerCase() !== "article") {
				p = p.parentElement;
			}
			if (p.tagName.toLowerCase() === "article") {
				console.log("NUKING TOPIC: " + p.textContent.toString());
				p.remove();
			}
		}
	}
}, 500);
