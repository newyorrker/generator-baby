const gulp 						= require('gulp');
const config       		= require('../config');
const runSequence 		= require('run-sequence');
const watch 					= require('gulp-watch');
const googleWebFonts 	= require('gulp-google-webfonts');

var options = {
	fontsDir: '../fonts',
	cssDir: '../../src/sass/',
	cssFilename: '_g-fonts.scss'
};

//--------------------------------------------------------------
// FONTS TASK
//--------------------------------------------------------------

gulp.task('fonts', function(cb) {
    runSequence('google-fonts', 'font-copy');
});

gulp.task('google-fonts', function () {
	return gulp.src(config.src.fonts + '/fonts.list')
	.pipe(googleWebFonts(options))
	.pipe(gulp.dest(config.dest.fonts));
});

//for custom fonts generate css from transfonter.org
gulp.task('font-copy', function () {
  return gulp.src(config.src.fonts + '/**/*[^.list]')
    .pipe(gulp.dest(config.dest.fonts));
});

//копирование будет стоять по умолчанию (т.к. могут и использоваться и др шрифты не из гугл фонтс)