(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define([
      'exports',
      'jquery',
      './tooltip'
    ], factory);
  } else if (typeof exports !== 'undefined') {
    factory(exports, require('jquery'), require('./tooltip'));
  } else {
    var mod = { exports: {} };
    factory(mod.exports, global.$, global.Tooltip);
    global.jqueryTooltip = mod.exports;
  }
}(this, function (exports, _jquery, _tooltip) {
  'use strict';
  var _interopRequire = function (obj) {
    return obj && obj.__esModule ? obj['default'] : obj;
  };
  var _$ = _interopRequire(_jquery);
  var _Tooltip = _interopRequire(_tooltip);
  _$.fn.theTooltip = function (options) {
    this.each(function () {
      if (!_$.data(this, 'Tooltip')) {
        _$.data(this, 'Tooltip', new _Tooltip(this, options));
      }
    });
  };
}));