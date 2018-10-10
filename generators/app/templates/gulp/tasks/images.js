const gulp 	 					= require('gulp');
const config 					= require('../config');
const watch 					= require('gulp-watch');
const runSequence 		= require('run-sequence');
const gulpLoadPlugins = require('gulp-load-plugins');
const mozjpeg 				= require('imagemin-mozjpeg');
const pngQuant 				= require('imagemin-pngquant');

const $ = gulpLoadPlugins();

//--------------------------------------------------------------
// IMAGES
//--------------------------------------------------------------

gulp.task('images', function(){
	return gulp.src(config.src.img + '/*.{png,jpg,jpeg,svg}')
		.pipe($.newer(config.dest.img))
		.pipe($.if(!config.dev,
			$.imagemin(
				[
					mozjpeg({quality: 60, progressive: true}),
					pngQuant({quality: 0})
				],
				{verbose: true}
			)))
		.pipe(gulp.dest(config.dest.img));
});

gulp.task('images:watch', function() {
	return watch(config.src.img + '/*.{png,jpg,jpeg,svg}', function () {
		runSequence('images');
	});
});