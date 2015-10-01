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

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _$ = _interopRequireDefault(_jquery);

	var _Tooltip = _interopRequireDefault(_tooltip);

	var pluginName = 'theTooltip';

	function Plugin() {
		var option = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

		var namespace = 'lagden.' + pluginName;
		return this.each(function (idx, el) {
			var instance = _$['default'].data(el, namespace);
			if (instance) {
				if (typeof option === 'string' && /destroy/.test(option)) {
					_$['default'].removeData(el, namespace);
					instance[option]();
					instance = null;
				}
			} else if (typeof option === 'object') {
				instance = new _Tooltip['default'](el, option);
				_$['default'].data(el, namespace, instance);
			}
		});
	}

	var old = _$['default'].fn[pluginName];

	_$['default'].fn[pluginName] = Plugin;
	_$['default'].fn[pluginName].Constructor = _Tooltip['default'];

	function noConflictTheTooltip() {
		_$['default'].fn[pluginName] = old;
		return this;
	}

	_$['default'].fn[pluginName].noConflict = noConflictTheTooltip;
});
//# sourceMappingURL=jquery-tooltip.js.map
