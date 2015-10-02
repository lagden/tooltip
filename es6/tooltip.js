'use strict';

import objectAssign from 'lagden-utils/dist/object-assign';
import isElement from 'lagden-utils/dist/is-element';
import textNode from 'lagden-utils/dist/text-node';
import qS from 'lagden-utils/dist/qs';

let doc;
let body;
let initializedVars = false;

function setVars(win = window) {
	if (initializedVars === false) {
		doc = win.document;
		body = win.document.boby || qS('body', doc);
		initializedVars = true;
	}
}

// Globally unique identifiers
let GUID = 0;

// Internal store of all Tooltip intances
const instances = {};

class Tooltip {
	constructor(target, opts = {}, win = undefined) {
		setVars(win);

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
			attr: 'data-lagden-tip',
			content: '',
			html: false,
			css: 'theTooltip',
			place: 'auto',
			space: 15
		};

		objectAssign(this.options, opts);

		const tip = this.options.content || this.target.getAttribute(this.options.attr);
		this.tooltip = textNode(doc.createElement('div'), tip, this.options.html);
		this.tooltip.classList.add(this.options.css);
		body.appendChild(this.tooltip);

		this.target.addEventListener('mouseenter', this, false);
		this.target.addEventListener('mouseleave', this, false);
		this.target.addEventListener('click', this, false);
	}

	show() {
		let y;
		const scrollY = window.scrollY !== undefined ? window.scrollY : window.pageYOffset;
		const place = this.options.place;
		const tgBounds = this.target.getBoundingClientRect();
		const ttBounds = this.tooltip.getBoundingClientRect();
		const ttBody = (ttBounds.height + this.options.space).toFixed(0) - '';
		const check = tgBounds.top - ttBody;
		const center = (tgBounds.left + ((tgBounds.width / 2) - (ttBounds.width / 2))).toFixed(0) - '';

		if ((check < 0 || place === 'bottom') && place !== 'top') {
			y = tgBounds.top + tgBounds.height + scrollY + this.options.space;
			this.tooltip.classList.add('top');
		} else {
			y = tgBounds.top + scrollY - ttBody;
			this.tooltip.classList.remove('top');
		}

		this.tooltip.style.top = `${y}px`;
		this.tooltip.style.left = `${center}px`;
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
