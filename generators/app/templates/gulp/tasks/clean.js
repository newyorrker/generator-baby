const gulp   	= require('gulp');
const config  = require('../config');
const del    	= require('del');

gulp.task('clean', function(cb) {
    return del([
        config.dest.root
    ])
});