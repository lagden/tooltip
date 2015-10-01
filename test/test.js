/* global describe, it */

'use strict';

import {jsdom} from 'jsdom';
import Tooltip from '../es6/tooltip';

const window = jsdom('<div id="apenasUmShow">Apenas um show</div><div id="ulala" data-lagden-tip="Awesome!">Tip</div>', {}).defaultView;

describe('Tooltip', () => {
	it('content', () => {
		const el = window.document.querySelector('#apenasUmShow');
		const tip = new Tooltip(el, {
			content: 'Super'
		}, window);
		tip.tooltip.textContent.should.be.exactly('Super');
	});

	it('instance', () => {
		const el = window.document.querySelector('#apenasUmShow');
		const tip = Tooltip.data(el);
		(tip instanceof Tooltip).should.be.true();
	});

	it('data', () => {
		const el = window.document.querySelector('#ulala');
		const tip = new Tooltip(el, {}, window);
		tip.tooltip.textContent.should.be.exactly(el.getAttribute('data-lagden-tip'));
	});
});
