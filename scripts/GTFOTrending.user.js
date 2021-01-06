// ==UserScript==
// @name        GTFOTrending
// @description Nuke shitty Dream SMP stuff from Twitter's trending sidebar.
// @version     1.0.2
// @author      aspen
// @copyright   2021, aspen (aspenuwu.me)
// @license     BSD-3-Clause; https://github.com/aspenluxxxy/userscripts/blob/master/LICENSE.md
// @updateURL   https://cdn.jsdelivr.net/gh/aspenluxxxy/userscripts@dev/scripts/GTFOTrending.user.js
// @downloadURL https://cdn.jsdelivr.net/gh/aspenluxxxy/userscripts@dev/scripts/GTFOTrending.user.js
// @source      https://github.com/aspenluxxxy/userscripts
// @namespace   https://github.com/aspenluxxxy
// @match       *://twitter.com/*
// @match       *://*.twitter.com/*
// @grant       none
// @meta        Trans rights are human rights.
// @meta        If you disagree with that, you have every right to fuck off and not use my scripts :)
// ==/UserScript==

const minecraft_tuber_regex = /\b(dream|technoblade|techno|dreamsmp|georgenotfound|minecraft)\b/gim;

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
				if (inner_div.children.length === 5) {
					target = inner_div.children[2];
				} else if (inner_div.children.length === 4) {
					target = inner_div.children[1];
				}

				if (
					target?.textContent &&
					minecraft_tuber_regex.test(target.textContent)
				) {
					console.log("NUKING: " + target.textContent.toString());
					node.remove();
				}
			}
			node = node.nextSibling;
		}
	}
}, 500);
