// ==UserScript==
// @name        crates.io documentation button
// @description Adds a documentation button to every crate in the crates.io search!
// @version     1.0.0
// @author      Lucy
// @copyright   2022, Lucy (absolucy.moe)
// @license     BSD-3-Clause; https://github.com/Absolucy/userscripts/blob/dev/LICENSE.md
// @downloadURL https://cdn.jsdelivr.net/gh/Absolucy/userscripts@dev/scripts/CratesIoDocumentation.user.js
// @updateURL   https://cdn.jsdelivr.net/gh/Absolucy/userscripts@dev/scripts/CratesIoDocumentation.user.js
// @source      https://github.com/Absolucy/userscripts
// @namespace   https://github.com/Absolucy
// @match       *://crates.io/search
// @grant       none
// @run-at      document-end
// @meta        Trans rights are human rights.
// @meta        If you disagree with that, you have every right to fuck off and not use my scripts :)
// ==/UserScript==

const CRATE_SELECTOR = 'a[href^="/crates/"]';
const QUICK_LINKS_SELECTOR = 'ul[class^="_quick-links"]';

// We need to wait until the search page loads.
let interval_id = setInterval(() => {
	let crates = document.querySelectorAll(CRATE_SELECTOR);
	if (crates.length > 0) {
		clearInterval(interval_id);
	}
	crates.forEach((crate) => {
		let base = crate?.parentElement?.parentElement?.parentElement;
		if (!base) return;
		let crate_name = crate.innerText.trim();
		let quick_links = base.querySelector(QUICK_LINKS_SELECTOR);
		if (!quick_links) return;
		let new_link = document.createElement("li");
		let new_link_a = document.createElement("a");
		new_link_a.href = `https://docs.rs/${crate_name}/*`;
		new_link_a.innerText = "Documentation";
		new_link_a.target = "_blank";
		new_link.appendChild(new_link_a);
		quick_links.appendChild(new_link);
	});
}, 100);
