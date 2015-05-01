'use strict';

import {qS, txt, isElement, objectAssign} from './lib/utils';
import getStyleProperty from './lib/get-style-property';

function findCenter(ba, bb) {
  return {
    x: Math.ceil((ba.width / 2) - (bb.width / 2)),
    y: Math.ceil((ba.height / 2) - (bb.height / 2))
  };
}

let transform = getStyleProperty('transform');

class Tooltip {
  constructor(target, opts = {}) {
    this.target = isElement(target) ? target : qS(target);
    this.options = {
      attr: 'data-title',
      content: '',
      html: false,
      css: 'theTooltip'
    };

    // Object.assign(this.options, opts);
    objectAssign(this.options, opts);

    let tip = this.options.content || this.target.getAttribute(this.options.attr);
    this.tooltip = txt(document.createElement('div'), tip, this.options.html);
    this.tooltip.classList.add(this.options.css);
    this.target.classList.add(this.options.css + "-parent");
    this.target.appendChild(this.tooltip);

    this.target.addEventListener('mouseenter', this, false);
    this.target.addEventListener('mouseleave', this, false);
    this.target.addEventListener('click', this, false);
    window.addEventListener('resize', this, false);

    this.center();
  }

  center() {
    let center = findCenter(
      this.target.getBoundingClientRect(),
      this.tooltip.getBoundingClientRect()
    );
    this.tooltip.style.top = center.y + "px";
    this.tooltip.style.left = center.x + "px";
  }

  show() {
    let posTop, targBounds, tipBounds, top;
    targBounds = this.target.getBoundingClientRect();
    tipBounds = this.tooltip.getBoundingClientRect();
    top = targBounds.top - tipBounds.height;
    posTop = targBounds.height + (tipBounds.height / 2);
    if (top < 0) {
      this.tooltip.classList.add('top');
    } else {
      posTop *= -1;
      this.tooltip.classList.remove('top');
    }
    this.tooltip.style[transform] = "translate(0, " + posTop + "px)";
    this.tooltip.classList.add(this.options.css + "--show");
  }

  hide() {
    this.tooltip.classList.remove(this.options.css + "--show");
  }

  destroy() {
    this.target.removeEventListener('mouseenter', this, false);
    this.target.removeEventListener('mouseleave', this, false);
    this.target.removeEventListener('click', this, false);
    this.target.removeChild(this.tooltip);
    window.removeEventListener('resize', this, false);
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
      case 'resize':
        this.center(event);
    }
  }
}

export default Tooltip;
