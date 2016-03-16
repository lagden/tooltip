'use strict';

import test from 'ava';
import Tooltip from '../src/tooltip';

const el1 = document.querySelector('#apenasUmShow');
const el2 = document.querySelector('#ulala');

test('content', t => {
	const tip = new Tooltip(el1, {content: 'Super'});
	t.same(tip.tooltip.textContent, 'Super');
});

test('instance', t => {
	const tip = Tooltip.data(el1);
	t.true(tip instanceof Tooltip);
});

test('data', t => {
	const tip = new Tooltip(el2);
	t.same(tip.tooltip.textContent, el2.getAttribute('data-lagden-tip'));
});
