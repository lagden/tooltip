'use strict';

const gulp = require('gulp');
const stylus = require('gulp-stylus');
const postcss = require('gulp-postcss');
const jade = require('gulp-jade');

function style() {
	return gulp
		.src('stylus/*.styl')
		.pipe(stylus({
			compress: true
		}))
		.pipe(postcss([
			require('autoprefixer')({browsers: 'last 2 versions'})
		]))
		.pipe(gulp.dest('dist'));
}

function template() {
	gulp
		.src('demo/index.jade')
		.pipe(jade())
		.pipe(gulp.dest('build'));
}

function cp() {
	gulp
		.src('dist/**/*')
		.pipe(gulp.dest('build/dist'));
}

gulp.task('style', style);
gulp.task('template', template);
gulp.task('demo', ['template'], cp);
gulp.task('default', ['style', 'template'], cp);
