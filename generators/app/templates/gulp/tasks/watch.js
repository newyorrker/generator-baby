var gulp        	= require('gulp');
var config      	= require('../config');
const runSequence = require('run-sequence');


//--------------------------------------------------------------
// WATCH TASK
//--------------------------------------------------------------

gulp.task('watch', function () {
	config.setEnv(false);
	console.log('Start watch files in production mode!');
	runSequence('build', ['sass:watch', 'images:watch', 'js:watch', 'nun:watch']);
});

gulp.task('watch:dev', function () {
	config.setEnv(true);
	console.log('Start watch files in development mode!');
	runSequence(
		['build:dev'],
		['sass:watch', 'images:watch', 'js:watch', 'nun:watch']
	);
});