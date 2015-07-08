(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define([
      'exports',
      'module',
      './lib/utils',
      'get-style-property/get-style-property'
    ], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('./lib/utils'), require('get-style-property/get-style-property'));
  } else {
    var mod = { exports: {} };
    factory(mod.exports, mod, global.utils, global.getStyleProperty);
    global.tooltip = mod.exports;
  }
}(this, function (exports, module, _libUtils, _getStylePropertyGetStyleProperty) {
  'use strict';
  var _interopRequire = function (obj) {
    return obj && obj.__esModule ? obj['default'] : obj;
  };
  var _classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  };
  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ('value' in descriptor) {
          descriptor.writable = true;
        }
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function (Constructor, protoProps, staticProps) {
      if (protoProps) {
        defineProperties(Constructor.prototype, protoProps);
      }
      if (staticProps) {
        defineProperties(Constructor, staticProps);
      }
      return Constructor;
    };
  }();
  var _getStyleProperty = _interopRequire(_getStylePropertyGetStyleProperty);
  'use strict';
  var doc = window ? window.document : global;
  var body = doc.boby || _libUtils.qS('body');
  var transform = _getStyleProperty('transform');
  // Globally unique identifiers
  var GUID = 0;
  // Internal store of all Tooltip intances
  var instances = {};
  var Tooltip = function () {
    function Tooltip(target) {
      var opts = arguments[1] === undefined ? {} : arguments[1];
      _classCallCheck(this, Tooltip);
      this.target = _libUtils.isElement(target) ? target : _libUtils.qS(target);
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
        attr: 'data-title',
        content: '',
        html: false,
        css: 'theTooltip',
        place: 'auto',
        space: 15
      };
      // Object.assign(this.options, opts);
      _libUtils.objectAssign(this.options, opts);
      var tip = this.options.content || this.target.getAttribute(this.options.attr);
      this.tooltip = _libUtils.txt(doc.createElement('div'), tip, this.options.html);
      this.tooltip.classList.add(this.options.css);
      body.appendChild(this.tooltip);
      this.target.addEventListener('mouseenter', this, false);
      this.target.addEventListener('mouseleave', this, false);
      this.target.addEventListener('click', this, false);
    }
    _createClass(Tooltip, [
      {
        key: 'show',
        value: function show() {
          var y;
          var place = this.options.place;
          var tgBounds = this.target.getBoundingClientRect();
          var ttBounds = this.tooltip.getBoundingClientRect();
          var check = tgBounds.top - ttBounds.height;
          var pos = {
            top: ((ttBounds.height + this.options.space).toFixed(0) - '') * -1,
            bottom: (tgBounds.height + this.options.space).toFixed(0) - ''
          };
          var center = (tgBounds.left + (tgBounds.width / 2 - ttBounds.width / 2)).toFixed(0) - '';
          if ((check < 0 || place === 'bottom') && place !== 'top') {
            y = pos.bottom;
            this.tooltip.classList.add('top');
          } else {
            y = pos.top;
            this.tooltip.classList.remove('top');
          }
          this.tooltip.style.top = '' + tgBounds.top + 'px';
          this.tooltip.style.left = '' + center + 'px';
          this.tooltip.style[transform] = 'translate(0, ' + y + 'px)';
          this.tooltip.classList.add('' + this.options.css + '--show');
        }
      },
      {
        key: 'hide',
        value: function hide() {
          this.tooltip.classList.remove('' + this.options.css + '--show');
        }
      },
      {
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
      },
      {
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
          }
        }
      }
    ]);
    return Tooltip;
  }();
  Tooltip.data = function (el) {
    var id = el && el.GUID;
    return id && instances[id];
  };
  module.exports = Tooltip;
}));