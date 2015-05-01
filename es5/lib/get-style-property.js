(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define([
      'exports',
      'module'
    ], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module);
  } else {
    var mod = { exports: {} };
    factory(mod.exports, mod);
    global.getStyleProperty = mod.exports;
  }
}(this, function (exports, module) {
  'use strict';
  var prefixes = 'Webkit Moz ms Ms O'.split(' ');
  var docElemStyle = document.documentElement.style;
  function getStyleProperty(propName) {
    if (!propName) {
      return;
    }
    if (typeof docElemStyle[propName] === 'string') {
      return propName;
    }
    propName = propName.charAt(0).toUpperCase() + propName.slice(1);
    var prefixed, i, len;
    for (i = 0, len = prefixes.length; i < len; i++) {
      prefixed = prefixes[i] + propName;
      if (typeof docElemStyle[prefixed] === 'string') {
        return prefixed;
      }
    }
  }
  module.exports = getStyleProperty;
}));