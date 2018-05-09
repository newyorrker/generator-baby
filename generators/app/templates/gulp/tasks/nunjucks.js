const gulp 						= require('gulp');
const config       		= require('../config');
const gulpLoadPlugins = require('gulp-load-plugins');
const browserSync 		= require('browser-sync').create();

const $ = gulpLoadPlugins();
const reload = browserSync.reload;


//--------------------------------------------------------------
// NUNJUCKS
//--------------------------------------------------------------

gulp.task('nun-n', function () {
	return console.log($);
});

function renderHTML (onlyChanged) {

	return gulp.src(config.src.templates + '/**/[^_]*.html')
		.pipe($.if(onlyChanged, $.changed(config.dest.html)))
		.pipe($.nunjucksRender({
			path: [config.src.templates],
		}))
		.pipe($.prettify({
				indent_with_tabs: true,
				preserve_newlines: false,
				end_with_newline: true
		}))
		.pipe(gulp.dest(config.dest.html));
}

gulp.task('nun', function () {
	return renderHTML();
});

gulp.task('nun:changed', function() {
    return renderHTML(true);
});

gulp.task('nun:watch', function() {
    gulp.watch([
        config.src.templates + '/**/[^_]*.html'
    ], ['nun:changed']);

    gulp.watch([
        config.src.templates + '/**/_*.html'
    ], ['nun']);
});




//запускаем watch с задачей без changed, но при watch выполняется таск с changed