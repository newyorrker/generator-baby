const gulp 	 					= require('gulp');
const config 					= require('../config');
const watch 					= require('gulp-watch');
const runSequence = require('run-sequence');
const gulpLoadPlugins = require('gulp-load-plugins');

const $ = gulpLoadPlugins();

//--------------------------------------------------------------
// IMAGES
//--------------------------------------------------------------

gulp.task('images', function(){
  return gulp.src(config.src.img + '/*.{png,jpg,jpeg,svg}')
    .pipe($.if(!config.dev,
			$.imagemin({verbose: true},
			{
				interlaced: true,
				progressive: false,
				optimizationLevel: 3,
			})))
		.pipe(gulp.dest(config.dest.img));
});

gulp.task('images:watch', function() {
	return watch(config.src.img + '/*.{png,jpg,jpeg,svg}', function () {
		runSequence('images');
	});
});