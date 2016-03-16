'use strict';

import babel from 'rollup-plugin-babel';
import * as path from 'path';

export default {
	entry: 'src/jquery-tooltip.js',
	format: 'amd',
	dest: 'dist/jquery-tooltip.js',
	external: [
		'jquery',
		path.resolve('./src/tooltip.js')
	],
	plugins: [
		babel()
	]
};
