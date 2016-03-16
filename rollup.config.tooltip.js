'use strict';

import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';

export default {
	entry: 'src/tooltip.js',
	format: 'amd',
	dest: 'dist/tooltip.js',
	plugins: [
		nodeResolve({
			jsnext: true,
			main: true
		}),
		babel()
	]
};
