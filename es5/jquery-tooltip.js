(function (global, factory) {
	if (typeof define === 'function' && define.amd) {
		define(['exports', 'jquery', './tooltip'], factory);
	} else if (typeof exports !== 'undefined') {
		factory(exports, require('jquery'), require('./tooltip'));
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports, global.$, global.Tooltip);
		global.jqueryTooltip = mod.exports;
	}
})(this, function (exports, _jquery, _tooltip) {
	'use strict';

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

	var _$ = _interopRequire(_jquery);

	var _Tooltip = _interopRequire(_tooltip);

	var pluginName = 'theTooltip';

	function Plugin() {
		var option = arguments[0] === undefined ? {} : arguments[0];

		var namespace = 'lagden.' + pluginName;
		return this.each(function (idx, el) {
			var instance = _$.data(el, namespace);
			if (instance) {
				if (typeof option === 'string' && /destroy/.test(option)) {
					_$.removeData(el, namespace);
					instance[option]();
					instance = null;
				}
			} else if (typeof option !== 'string') {
				instance = new _Tooltip(el, option);
				_$.data(el, namespace, instance);
			}
		});
	}

	var old = _$.fn[pluginName];

	_$.fn[pluginName] = Plugin;
	_$.fn[pluginName].Constructor = _Tooltip;

	function noConflictTheTooltip() {
		_$.fn[pluginName] = old;
		return this;
	}

	_$.fn[pluginName].noConflict = noConflictTheTooltip;
});