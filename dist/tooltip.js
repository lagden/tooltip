(function (global, factory) {
	if (typeof define === 'function' && define.amd) {
		define(['exports', 'module', 'lagden-utils/dist/object-assign', 'lagden-utils/dist/is-element', 'lagden-utils/dist/text-node', 'lagden-utils/dist/qs'], factory);
	} else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
		factory(exports, module, require('lagden-utils/dist/object-assign'), require('lagden-utils/dist/is-element'), require('lagden-utils/dist/text-node'), require('lagden-utils/dist/qs'));
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports, mod, global.objectAssign, global.isElement, global.textNode, global.qS);
		global.tooltip = mod.exports;
	}
})(this, function (exports, module, _lagdenUtilsDistObjectAssign, _lagdenUtilsDistIsElement, _lagdenUtilsDistTextNode, _lagdenUtilsDistQs) {
	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _objectAssign = _interopRequireDefault(_lagdenUtilsDistObjectAssign);

	var _isElement = _interopRequireDefault(_lagdenUtilsDistIsElement);

	var _textNode = _interopRequireDefault(_lagdenUtilsDistTextNode);

	var _qS = _interopRequireDefault(_lagdenUtilsDistQs);

	var doc = undefined;
	var body = undefined;
	var initializedVars = false;

	function setVars() {
		var win = arguments.length <= 0 || arguments[0] === undefined ? window : arguments[0];

		if (initializedVars === false) {
			doc = win.document;
			body = win.document.boby || (0, _qS['default'])('body', doc);
			initializedVars = true;
		}
	}

	// Globally unique identifiers
	var GUID = 0;

	// Internal store of all Tooltip intances
	var instances = {};

	var Tooltip = (function () {
		function Tooltip(target) {
			var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
			var win = arguments.length <= 2 || arguments[2] === undefined ? undefined : arguments[2];

			_classCallCheck(this, Tooltip);

			setVars(win);

			this.target = (0, _isElement['default'])(target) ? target : (0, _qS['default'])(target);

			// Check if element was initialized and return your instance
			var initialized = Tooltip.data(this.target);
			if (initialized instanceof Tooltip) {
				return initialized;
			}

			// Storage current instance
			var id = ++GUID;
			this.target.GUID = id;
			instances[id] = this;

			this.options = {
				attr: 'data-lagden-tip',
				content: '',
				html: false,
				css: 'theTooltip',
				place: 'auto',
				space: 15
			};

			(0, _objectAssign['default'])(this.options, opts);

			var tip = this.options.content || this.target.getAttribute(this.options.attr);
			this.tooltip = (0, _textNode['default'])(doc.createElement('div'), tip, this.options.html);
			this.tooltip.classList.add(this.options.css);
			body.appendChild(this.tooltip);

			this.target.addEventListener('mouseenter', this, false);
			this.target.addEventListener('mouseleave', this, false);
			this.target.addEventListener('click', this, false);
		}

		_createClass(Tooltip, [{
			key: 'show',
			value: function show() {
				var y = undefined;
				var scrollY = window.scrollY !== undefined ? window.scrollY : window.pageYOffset;
				var place = this.options.place;
				var tgBounds = this.target.getBoundingClientRect();
				var ttBounds = this.tooltip.getBoundingClientRect();
				var ttBody = (ttBounds.height + this.options.space).toFixed(0) - '';
				var check = tgBounds.top - ttBody;
				var center = (tgBounds.left + (tgBounds.width / 2 - ttBounds.width / 2)).toFixed(0) - '';

				if ((check < 0 || place === 'bottom') && place !== 'top') {
					y = tgBounds.top + tgBounds.height + scrollY + this.options.space;
					this.tooltip.classList.add('top');
				} else {
					y = tgBounds.top + scrollY - ttBody;
					this.tooltip.classList.remove('top');
				}

				this.tooltip.style.top = y + 'px';
				this.tooltip.style.left = center + 'px';
				this.tooltip.classList.add(this.options.css + '--show');
			}
		}, {
			key: 'hide',
			value: function hide() {
				this.tooltip.classList.remove(this.options.css + '--show');
			}
		}, {
			key: 'destroy',
			value: function destroy() {
				this.target.removeEventListener('mouseenter', this, false);
				this.target.removeEventListener('mouseleave', this, false);
				this.target.removeEventListener('click', this, false);

				body.removeChild(this.tooltip);

				var id = this.target.GUID;
				delete instances[id];
				delete this.target.GUID;
			}
		}, {
			key: 'handleEvent',
			value: function handleEvent(event) {
				switch (event.type) {
					case 'mouseenter':
						this.show(event);
						break;
					case 'mouseleave':
						this.hide(event);
						break;
					case 'click':
						this.hide(event);
						break;
					default:
						break;
				}
			}
		}]);

		return Tooltip;
	})();

	Tooltip.data = function (el) {
		var id = el && el.GUID;
		return id && instances[id];
	};

	module.exports = Tooltip;
});
//# sourceMappingURL=tooltip.js.map
