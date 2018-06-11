const gulp        = require('gulp');
const config      = require('../config');
const runSequence = require('run-sequence');
const browserSync = require('browser-sync').create();

gulp.task('serve', function() {
		browserSync.init({
				server: {
						baseDir: "./public"
				}
		});

		browserSync.watch('public/**/*.*').on('change', browserSync.reload);

});

gulp.task('default', function(cb) {
	config.setEnv(true); //задаем окружение dev
	runSequence(
		'watch:dev',
		'serve'
	);
});

gulp.task('production', function(cb) {
	config.setEnv(false); //задаем окружение production
	runSequence(
		'watch',
		'serve'
	);
});