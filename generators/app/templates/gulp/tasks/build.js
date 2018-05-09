var gulp        	= require('gulp');
var config      	= require('../config');
const runSequence = require('run-sequence');

gulp.task('build', function () {
	config.setEnv(false);
	runSequence(['sass', 'fonts', 'images', 'js', 'nun']);
});

gulp.task('build:dev', function () {
	config.setEnv(true);
	runSequence(['sass', 'fonts', 'images', 'js', 'nun']);
});