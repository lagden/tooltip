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
	return obj &&
		typeof obj === 'object' &&
		obj.nodeType === 1 &&
		typeof obj.nodeName === 'string';
}

function objectAssign(a, b) {
	const props = Object.getOwnPropertyNames(b);
	props.forEach(prop => {
		a[prop] = b[prop];
	});
	return a;
}

export {txt, isElement, objectAssign};
