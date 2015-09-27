'use strict';

import {txt, isElement, objectAssign} from './lib/utils';
import getStyleProperty from 'get-style-property/get-style-property';

const doc = window ? window.document : global;
const qS = el => doc.querySelector(el);
const body = doc.boby || qS('body');
const transform = getStyleProperty('transform');

// Globally unique identifiers
let GUID = 0;

// Internal store of all Tooltip intances
const instances = {};

class Tooltip {
	constructor(target, opts = {}) {
		this.target = isElement(target) ? target : qS(target);

		// Check if element was initialized and return your instance
		const initialized = Tooltip.data(this.target);
		if (initialized instanceof Tooltip) {
			return initialized;
		}

		// Storage current instance
		const id = ++GUID;
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

		const tip = this.options.content || this.target.getAttribute(this.options.attr);
		this.tooltip = txt(doc.createElement('div'), tip, this.options.html);
		this.tooltip.classList.add(this.options.css);
		body.appendChild(this.tooltip);

		this.target.addEventListener('mouseenter', this, false);
		this.target.addEventListener('mouseleave', this, false);
		this.target.addEventListener('click', this, false);
	}

	show() {
		let y;
		const place = this.options.place;
		const tgBounds = this.target.getBoundingClientRect();
		const ttBounds = this.tooltip.getBoundingClientRect();
		const check = tgBounds.top - ttBounds.height;
		const pos = {
			top: ((ttBounds.height + this.options.space).toFixed(0) - '') * -1,
			bottom: ((tgBounds.height + this.options.space).toFixed(0) - '')
		};
		const center = (tgBounds.left +
			((tgBounds.width / 2) - (ttBounds.width / 2))
				).toFixed(0) - '';

		if ((check < 0 || place === 'bottom') && place !== 'top') {
			y = pos.bottom;
			this.tooltip.classList.add('top');
		} else {
			y = pos.top;
			this.tooltip.classList.remove('top');
		}

		this.tooltip.style.top = `${tgBounds.top}px`;
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

		const id = this.target.GUID;
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
			default:
				break;
		}
	}
}

Tooltip.data = el => {
	const id = el && el.GUID;
	return id && instances[id];
};

export default Tooltip;
