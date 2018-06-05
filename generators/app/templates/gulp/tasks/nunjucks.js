const gulp 						= require('gulp');
const config       		= require('../config');
const gulpLoadPlugins = require('gulp-load-plugins');
const browserSync 		= require('browser-sync').create();

const $ = gulpLoadPlugins();


//--------------------------------------------------------------
// NUNJUCKS
//--------------------------------------------------------------

gulp.task('nun-n', function () {
	return console.log($);
});

gulp.task('nun:watch', function() {
    gulp.watch([
        config.src.templates + '/**/*.html'
    ], ['nun']);
});

gulp.task('nun', function () {
	return gulp.src(config.src.templates + '/**/[^_]*.html')
		.pipe($.nunjucksRender({
			path: [config.src.templates] // String or Array
		}))
		.pipe($.prettify({
				indent_with_tabs: true,
				preserve_newlines: false,
				end_with_newline: true
		}))
		.pipe(gulp.dest(config.dest.html));
});