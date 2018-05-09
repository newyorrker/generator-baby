const gulp 						= require('gulp');
const config       		= require('../config');
const gulpLoadPlugins = require('gulp-load-plugins');

const $ = gulpLoadPlugins();

gulp.task('js:watch', function() {
    gulp.watch(config.src.js + '/**/*.*', ['js']);
});

gulp.task('js', function () {
	return gulp.src(config.src.js + '/*.js')
		.pipe($.if(config.dev, $.sourcemaps.init()))
		.pipe($.if(!config.dev, $.uglify()))
		.pipe($.if(config.dev, $.sourcemaps.write()))
		.pipe(gulp.dest(config.dest.js));
});