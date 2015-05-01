'use strict'

let qS = el => document.querySelector(el);

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
  } else {
    return obj &&
      typeof obj === 'object' &&
      obj.nodeType === 1 &&
      typeof obj.nodeName === 'string';
  }
}

function objectAssign(a, b) {
  let prop;
  for (prop in b) {
    a[prop] = b[prop];
  }
  return a;
}

export {qS, txt, isElement, objectAssign};
