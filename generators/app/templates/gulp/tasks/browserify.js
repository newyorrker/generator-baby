const gulp 						= require('gulp');
const config       		= require('../config');
const gulpLoadPlugins = require('gulp-load-plugins');
const buffer          = require('vinyl-buffer');
const browserify 			= require('browserify');
const source 					= require('vinyl-source-stream');
const babelify 				= require('babelify');
const browserSync     = require('browser-sync');

reload = browserSync.reload;
const $ = gulpLoadPlugins();

gulp.task('js:watch', function() {
    gulp.watch(config.src.js + '/**/*.*', ['js']);
});

gulp.task('js', function () {
	return browserify({
    entries: config.src.js + '/main.js'
  })
		.transform(babelify, { presets: ['es2015'] })
    .bundle()
      .pipe(source('main.bundle.js'))
      .pipe(buffer())
    	.pipe($.if(config.dev, $.sourcemaps.init()))
      .pipe($.if(!config.dev, $.uglify()))
      .pipe($.if(config.dev, $.sourcemaps.write()))
      .pipe(gulp.dest(config.dest.js))
      .pipe(reload({stream: true}));
});


