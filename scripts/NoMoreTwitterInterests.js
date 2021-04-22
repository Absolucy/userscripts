// ==UserScript==
// @name        NoMoreTwitterInterests
// @description Gets rid of the stupid "interests" on your Twitter for Web timeline (the "Follow Topic" crap)
// @version     1.0.0
// @author      aspen
// @copyright   2021, aspen (aspenuwu.me)
// @license     BSD-3-Clause; https://github.com/aspenluxxxy/userscripts/blob/master/LICENSE.md
// @updateURL   https://cdn.jsdelivr.net/gh/aspenluxxxy/userscripts@dev/scripts/NoMoreTwitterInterests.user.js
// @downloadURL https://cdn.jsdelivr.net/gh/aspenluxxxy/userscripts@dev/scripts/NoMoreTwitterInterests.user.js
// @source      https://github.com/aspenluxxxy/userscripts
// @namespace   https://github.com/aspenluxxxy
// @match       *://twitter.com/*
// @match       *://*.twitter.com/*
// @grant       none
// @meta        Trans rights are human rights.
// @meta        If you disagree with that, you have every right to fuck off and not use my scripts :)
// ==/UserScript==

setInterval(function () {
	let elements = document.querySelectorAll('span');
	for (e in elements) {
		let node = elements[e]
		if (node?.textContent === "Follow Topic" && node?.children?.length === 0) {
			var p = node.parentElement;
			while (p.parentElement != null && p.tagName.toLowerCase() !== "article") {
				p = p.parentElement;
			}
			if (p.tagName.toLowerCase() === "article") {
				console.log("NUKING TOPIC: " + node.textContent);
				p.remove();
			}
		}
	}
}, 500);
