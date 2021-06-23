// ==UserScript==
// @name        Aternos anti-anti adblock
// @description Kills Aternos' annoying full-page + timeout anti-adblock.
// @version     1.0.3
// @author      Lucy
// @copyright   2021, Lucy (absolucy.moe)
// @license     BSD-3-Clause; https://github.com/Absolucy/userscripts/blob/dev/LICENSE.md
// @downloadURL https://cdn.jsdelivr.net/gh/Absolucy/userscripts@dev/scripts/AternosAntiAntiAdblock.user.js
// @updateURL   https://cdn.jsdelivr.net/gh/Absolucy/userscripts@dev/scripts/AternosAntiAntiAdblock.user.js
// @source      https://github.com/Absolucy/userscripts
// @namespace   https://github.com/Absolucy
// @match       *://aternos.org/*
// @grant       none
// @inject-into page
// @run-at      document-start
// @meta        Trans rights are human rights.
// @meta        If you disagree with that, you have every right to fuck off and not use my scripts :)
// ==/UserScript==

const regex = /function ([A-Za-z]+)\(\)\s+\{\s+([A-Za-z]+)\s+\=\s*true\s*;\s*([A-Za-z]+)\(\)\s*;\s*}\s*let\s*[a-zA-Z],\s*[a-zA-Z]\s*;/;

(function () {
	"use strict";
	let old_atob = unsafeWindow.atob;
	unsafeWindow.atob = function (i) {
		let out = old_atob(i);
		unsafeWindow.console.log("Decoded: " + out);
		let find_function = regex.exec(out);
		if (find_function) {
			let function_name = find_function[1];
			unsafeWindow.console.log(
				"Patching " + function_name + " to 'Function.prototype'"
			);
			out = out.replace(function_name, "Function.prototype");
			unsafeWindow.console.log("Patched: " + out);
		}
		return out.replace(
			".addClass('fa-sad-tear');",
			".addClass('fa-sad-tear'); return true;"
		);
	};
})();
