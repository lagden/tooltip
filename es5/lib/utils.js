(function (global, factory) {
	if (typeof define === 'function' && define.amd) {
		define(['exports'], factory);
	} else if (typeof exports !== 'undefined') {
		factory(exports);
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports);
		global.utils = mod.exports;
	}
})(this, function (exports) {
	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	/* global HTMLElement, document */
	'use strict';

	function txt(node, txt, html) {
		if (html) {
			node.insertAdjacentHTML('afterbegin', txt);
		} else {
			node.appendChild(document.createTextNode(txt));
		}
		return node;
	}

	function isElement(obj) {
		if (typeof HTMLElement === 'object') {
			return obj instanceof HTMLElement;
		}
		return obj && typeof obj === 'object' && obj.nodeType === 1 && typeof obj.nodeName === 'string';
	}

	function objectAssign(a, b) {
		var props = Object.getOwnPropertyNames(b);
		props.forEach(function (prop) {
			a[prop] = b[prop];
		});
		return a;
	}

	exports.txt = txt;
	exports.isElement = isElement;
	exports.objectAssign = objectAssign;
});