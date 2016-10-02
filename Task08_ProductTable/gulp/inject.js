(function() {
	'use strict';

	var path = require('path'),
		gulp = require('gulp'),
		$ = require('gulp-load-plugins')(),
		conf = require('./conf');

	gulp.task('inject', ['copy-css', 'copy-css-libs', 'copy-js-libs', 'copy-js'], function() {
		var injectScripts = gulp.src([
				conf.paths.temp.libs + '/**/jquery.min.js',
				conf.paths.temp.libs + '/**/lodash.min.js',
				conf.paths.temp.js + '/**/helpers.js',
				conf.paths.temp.js + '/**/itemStorage.js',
				conf.paths.temp.js + '/**/deliveryStorage.js',
				conf.paths.temp.js + '/**/render.js',
				conf.paths.temp.js + '/**/validation.js',
				conf.paths.temp.js + '/**/handlers.js',

				conf.paths.temp.js + '/**/*.js'
			]),
			injectStyles = gulp.src([
				conf.paths.temp.root + '/**/*.css',
			]);

		return gulp.src(conf.paths.src + '/*.html')
			.pipe($.inject(injectStyles, {
				ignorePath: conf.paths.temp.root
			}))
			.pipe($.inject(injectScripts, {
				ignorePath: conf.paths.temp.root
			}))
			.pipe(gulp.dest(conf.paths.temp.root));
	});

	gulp.task('copy-css', ['styles'], function() {
		return gulp.src(conf.paths.src + '/css/**/*.css')
			.pipe(gulp.dest(conf.paths.temp.root));
	});

	gulp.task('copy-js', ['scripts'], function() {
		return gulp.src(conf.paths.src + '/js/**/*.js')
			.pipe(gulp.dest(conf.paths.temp.js));
	});

	gulp.task('copy-css-libs', function() {
		return gulp.src(conf.paths.src + '/libs/**/*.min.css')
			.pipe(gulp.dest(conf.paths.temp.libs));
	});

	gulp.task('copy-js-libs', ['scripts'], function() {
		return gulp.src(conf.paths.src + '/libs/**/*.min.js')
			.pipe(gulp.dest(conf.paths.temp.libs));
	});

}());