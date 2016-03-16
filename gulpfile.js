'use strict';

const gulp = require('gulp');
const stylus = require('gulp-stylus');
const postcss = require('gulp-postcss');

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

gulp.task('style', style);
gulp.task('default', ['style']);
