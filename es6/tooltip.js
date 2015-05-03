'use strict';

import {qS, txt, isElement, objectAssign} from './lib/utils';
import getStyleProperty from './lib/get-style-property';

let body = document.boby || qS('body');
let transform = getStyleProperty('transform');

// Globally unique identifiers
let GUID = 0;

// Internal store of all Tooltip intances
let instances = {};

class Tooltip {
  constructor(target, opts = {}) {
    this.target = isElement(target) ? target : qS(target);

    // Check if element was initialized and return your instance
    let initialized = Tooltip.data(this.target);
    if (initialized instanceof Tooltip)
      return initialized;

    // Storage current instance
    let id = ++GUID;
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
    objectAssign(this.options, opts);

    let tip = this.options.content || this.target.getAttribute(this.options.attr);
    this.tooltip = txt(document.createElement('div'), tip, this.options.html);
    this.tooltip.classList.add(this.options.css);
    body.appendChild(this.tooltip);

    this.target.addEventListener('mouseenter', this, false);
    this.target.addEventListener('mouseleave', this, false);
    this.target.addEventListener('click', this, false);

    // Initial position
    let tgBounds, ttBounds, top;
    tgBounds = this.target.getBoundingClientRect();
    ttBounds = this.tooltip.getBoundingClientRect();
    top = (tgBounds.top - ttBounds.top).toFixed(1) - '';
    this.tooltip.style.top = `${top}px`;
  }

  show() {
    let y;
    let place = this.options.place;
    let tgBounds = this.target.getBoundingClientRect();
    let ttBounds = this.tooltip.getBoundingClientRect();
    let check = tgBounds.top - ttBounds.height;
    let pos = {
      'top': ((ttBounds.height + this.options.space).toFixed(1) - '') * -1,
      'bottom': ((tgBounds.height + this.options.space).toFixed(1) - '')
    };
    let center = (tgBounds.left +
        ((tgBounds.width / 2) - (ttBounds.width / 2))).toFixed(1) - '';

    if ((check < 0 || place === 'bottom') && place !== 'top') {
      y = pos.bottom;
      this.tooltip.classList.add('top');
    } else {
      y = pos.top;
      this.tooltip.classList.remove('top');
    }

    this.tooltip.style.left = `${center}px`;
    this.tooltip.style[transform] = `translate(0, ${y}px)`;
    this.tooltip.classList.add(`${this.options.css}--show`);
  }

  hide() {
    this.tooltip.classList.remove(`${this.options.css}--show`);
  }

  destroy() {
    this.target.removeEventListener('mouseenter', this, false);
    this.target.removeEventListener('mouseleave', this, false);
    this.target.removeEventListener('click', this, false);

    body.removeChild(this.tooltip);

    let id = this.target.GUID;
    delete instances[id];
    delete this.target.GUID;
  }

  handleEvent(event) {
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

Tooltip.data = function(el) {
  let id = el && el.GUID;
  return id && instances[id];
};

export default Tooltip;
