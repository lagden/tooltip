'use strict';

const gulp = require('gulp');
const babel = require('gulp-babel');
const xo = require('gulp-xo');

const scriptSource = ['src/*.js'];
const babelOptions = {
	plugins: [
		'transform-es2015-modules-amd'
	]
};

function errorHandler() {
	this.emit('end');
}

function script() {
	return gulp
		.src(scriptSource)
		.pipe(xo().on('error', errorHandler))
		.pipe(babel(babelOptions))
		.pipe(gulp.dest('dist'));
}

function watch() {
	gulp.watch(scriptSource, ['script']);
}

gulp.task('script', script);
gulp.task('default', ['script']);
gulp.task('watch', ['default'], watch);
