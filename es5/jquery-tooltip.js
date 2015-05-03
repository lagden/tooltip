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
  var pluginName = 'theTooltip';
  function Plugin() {
    var option = arguments[0] === undefined ? {} : arguments[0];
    var namespace = 'lagden.' + pluginName;
    return this.each(function () {
      var instance = _$.data(this, namespace);
      if (instance) {
        if (typeof option === 'string' && /destroy/.test(option)) {
          _$.removeData(this, namespace);
          instance[option]();
          instance = null;
        }
      } else if (typeof option !== 'string') {
        instance = new _Tooltip(this, option);
        _$.data(this, namespace, instance);
      }
    });
  }
  var old = _$.fn[pluginName];
  _$.fn[pluginName] = Plugin;
  _$.fn[pluginName].Constructor = _Tooltip;
  _$.fn[pluginName].noConflict = function () {
    _$.fn[pluginName] = old;
    return this;
  };
}));