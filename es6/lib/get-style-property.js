'use strict';

let prefixes = 'Webkit Moz ms Ms O'.split(' ');
let docElemStyle = document.documentElement.style;

function getStyleProperty(propName) {
  if (!propName)
    return;

  if (typeof docElemStyle[propName] === 'string')
    return propName;

  propName = propName.charAt(0).toUpperCase() + propName.slice(1);

  let prefixed, i, len;
  for (i = 0, len = prefixes.length; i < len; i++) {
    prefixed = prefixes[i] + propName;
    if (typeof docElemStyle[prefixed] === 'string')
      return prefixed;
  }
}

export default getStyleProperty;
