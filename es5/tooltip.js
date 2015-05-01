(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define([
      'exports',
      'module',
      './lib/utils',
      './lib/get-style-property'
    ], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('./lib/utils'), require('./lib/get-style-property'));
  } else {
    var mod = { exports: {} };
    factory(mod.exports, mod, global.utils, global.getStyleProperty);
    global.tooltip = mod.exports;
  }
}(this, function (exports, module, _libUtils, _libGetStyleProperty) {
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
  var _getStyleProperty = _interopRequire(_libGetStyleProperty);
  'use strict';
  function findCenter(ba, bb) {
    return {
      x: Math.ceil(ba.width / 2 - bb.width / 2),
      y: Math.ceil(ba.height / 2 - bb.height / 2)
    };
  }
  var transform = _getStyleProperty('transform');
  var Tooltip = function () {
    function Tooltip(target) {
      var opts = arguments[1] === undefined ? {} : arguments[1];
      _classCallCheck(this, Tooltip);
      this.target = _libUtils.isElement(target) ? target : _libUtils.qS(target);
      this.options = {
        attr: 'data-title',
        content: '',
        html: false,
        css: 'theTooltip'
      };
      // Object.assign(this.options, opts);
      _libUtils.objectAssign(this.options, opts);
      var tip = this.options.content || this.target.getAttribute(this.options.attr);
      this.tooltip = _libUtils.txt(document.createElement('div'), tip, this.options.html);
      this.tooltip.classList.add(this.options.css);
      this.target.classList.add(this.options.css + '-parent');
      this.target.appendChild(this.tooltip);
      this.target.addEventListener('mouseenter', this, false);
      this.target.addEventListener('mouseleave', this, false);
      this.target.addEventListener('click', this, false);
      window.addEventListener('resize', this, false);
      this.center();
    }
    _createClass(Tooltip, [
      {
        key: 'center',
        value: function center() {
          var center = findCenter(this.target.getBoundingClientRect(), this.tooltip.getBoundingClientRect());
          this.tooltip.style.top = center.y + 'px';
          this.tooltip.style.left = center.x + 'px';
        }
      },
      {
        key: 'show',
        value: function show() {
          var posTop, targBounds, tipBounds, top;
          targBounds = this.target.getBoundingClientRect();
          tipBounds = this.tooltip.getBoundingClientRect();
          top = targBounds.top - tipBounds.height;
          posTop = targBounds.height + tipBounds.height / 2;
          if (top < 0) {
            this.tooltip.classList.add('top');
          } else {
            posTop *= -1;
            this.tooltip.classList.remove('top');
          }
          this.tooltip.style[transform] = 'translate(0, ' + posTop + 'px)';
          this.tooltip.classList.add(this.options.css + '--show');
        }
      },
      {
        key: 'hide',
        value: function hide() {
          this.tooltip.classList.remove(this.options.css + '--show');
        }
      },
      {
        key: 'destroy',
        value: function destroy() {
          this.target.removeEventListener('mouseenter', this, false);
          this.target.removeEventListener('mouseleave', this, false);
          this.target.removeEventListener('click', this, false);
          this.target.removeChild(this.tooltip);
          window.removeEventListener('resize', this, false);
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
          case 'resize':
            this.center(event);
          }
        }
      }
    ]);
    return Tooltip;
  }();
  module.exports = Tooltip;
}));