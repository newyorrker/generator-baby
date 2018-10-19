const gulp 		= require('gulp');
const config  = require('../config');
const replace = require('gulp-replace');
const fs 			= require('fs');


//--------------------------------------------------------------
// INLINING
//--------------------------------------------------------------


gulp.task('inline', function () {
	return gulp.src(config.dest.html + '/**/[^_]*.html')
		.pipe(replace(/<link rel="stylesheet" href="[..\/]*css\/critical.css"[^>]*>/g, function(s) {
      const style = fs.readFileSync(config.dest.html + '/css/critical.css', 'utf8');
      return '<style>\n' + style + '\n</style>';
	  }))
		.pipe(gulp.dest(config.dest.html));
});