const gulp 	 					= require('gulp');
const config 					= require('../config');
const buffer 					= require('vinyl-buffer');
const merge           = require('merge-stream');
const gulpLoadPlugins = require('gulp-load-plugins');

const $ = gulpLoadPlugins();

gulp.task('sprite', function () {
	var spriteData = gulp.src(config.src.icons + '/*.png').pipe($.spritesmith({
		imgName: 'sprite.png',
		cssName: '_sprite.scss',
		imgPath: '/images/sprite.png',
		padding: 1,
		cssFormat: 'scss',
		cssOpts: {
			// for remove prefix icon-
			cssSelector: function (sprite) {
				return '.' + sprite.name;
			},
			algorithmOpts: {sort: true}
		}
	}));

	var imgStream = spriteData.img
		.pipe(buffer())
		.pipe($.imagemin({
			optimizationLevel: 3
		}))
		.pipe(gulp.dest(config.dest.img));

	var cssStream = spriteData.css
		.pipe(gulp.dest(config.src.sass));

	return merge(imgStream, cssStream);

});