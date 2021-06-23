// ==UserScript==
// @name        GTFOTrending
// @description Nuke annoying trends, such as celebrity garbage and Dream stan dumbassery, from the Twitter trending sidebar.
// @version     1.1.2
// @author      Lucy
// @copyright   2021, Lucy (absolucy.moe)
// @license     BSD-3-Clause; https://github.com/Absolucy/userscripts/blob/dev/LICENSE.md
// @updateURL   https://cdn.jsdelivr.net/gh/Absolucy/userscripts@dev/scripts/GTFOTrending.user.js
// @downloadURL https://cdn.jsdelivr.net/gh/Absolucy/userscripts@dev/scripts/GTFOTrending.user.js
// @source      https://github.com/Absolucy/userscripts
// @namespace   https://github.com/Absolucy
// @match       *://twitter.com/*
// @match       *://*.twitter.com/*
// @grant       none
// @meta        Trans rights are human rights.
// @meta        If you disagree with that, you have every right to fuck off and not use my scripts :)
// ==/UserScript==

const description_filter_regex = /\b(dream|technoblade|techno|dreamsmp|georgenotfound|minecraft|epicsmp|epic smp|dream smp)\b/gim;
const topic_regex = /\b(celebrity|k-pop)\b/gim;

setInterval(function () {
	let trending = document.querySelector(
		"[aria-label='Timeline: Trending now']"
	).firstChild;
	if (trending) {
		let node = trending.firstChild;
		while (node) {
			let inner_div = node.firstChild?.firstChild;
			if (inner_div) {
				let target;
				let topic = inner_div.children[0]?.children[0]?.children[0];

				if (inner_div.children.length === 5) {
					target = inner_div.children[2];
				} else if (inner_div.children.length === 4) {
					target = inner_div.children[1];
				} else {
					target = inner_div;
				}

				if (
					(target?.textContent && description_filter_regex.test(target.textContent))
					||
					(topic?.textContent && topic_regex.test(topic.textContent))
				) {
					console.log("NUKING: " + target.textContent.toString());
					node.remove();
				}
			}
			node = node.nextSibling;
		}
	}
}, 500);
