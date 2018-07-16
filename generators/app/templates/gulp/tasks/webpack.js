const gulp 						= require('gulp');
const config       		= require('../config');
const webpackConfig   = require('../../webpack.config');
const gulpLoadPlugins = require('gulp-load-plugins');
const webpackStream 	= require('webpack-stream');
const uglify 					= require('gulp-uglify-es').default;

const $ = gulpLoadPlugins();

gulp.task('js:watch', function() {
    gulp.watch(config.src.js + '/**/*.*', ['js']);
});

gulp.task('js', function() {
		if (config.dev) {
			webpackConfig.devtool = 'source-map';
		}
    return gulp.src(config.src.js + '/main.js')
    .pipe(webpackStream(webpackConfig))
    .pipe($.if(!config.dev, uglify()))
    .pipe(gulp.dest(config.dest.js));
});