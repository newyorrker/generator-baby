var gulp            = require('gulp');
var config          = require('./config');
var postcss         = require('gulp-postcss');
var autoprefixer    = require('autoprefixer');
var mqpacker        = require('css-mqpacker');
var browserSync     = require('browser-sync').create();
var sass            = require('gulp-sass');
var sourcemaps      = require('gulp-sourcemaps');
var nunjucksRender  = require('gulp-nunjucks-render');
var prettify        = require('gulp-prettify');
var merge           = require('merge-stream');
var spritesmith     = require('gulp.spritesmith');
var imagemin        = require('gulp-imagemin');
var buffer 					= require('vinyl-buffer');

//--------------------------------------------------------------
// PRODUCTION
//--------------------------------------------------------------

var processors = [
		autoprefixer({
				browsers: ['last 4 versions'],
				cascade: false
		}),
		mqpacker({
				sort: sortMediaQueries
		})
];

gulp.task('prod', function () {
	return gulp.src(config.src.sass + '/*.scss')
		.pipe(sass({outputStyle: "compressed"}).on('error', sass.logError))
		.pipe(postcss(processors))
		.pipe(gulp.dest(config.dest.css));
});

//--------------------------------------------------------------
// SASS
//--------------------------------------------------------------

gulp.task('sass', function () {
	return gulp.src(config.src.sass + '/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass(config.sass).on('error', sass.logError))
		.pipe(postcss(processors))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(config.dest.css));
});

//--------------------------------------------------------------
// IMAGE-COPY
//--------------------------------------------------------------

gulp.task('img-copy', function () {
	return gulp.src(config.src.img + '/*.{png,jpg,svg}')
		.pipe(imagemin({verbose: true},
		{
			interlaced: true,
			progressive: false,
			optimizationLevel: 3,
		}))
		.pipe(gulp.dest(config.dest.img));
});

//--------------------------------------------------------------
// SCRIPT-COPY
//--------------------------------------------------------------

gulp.task('js-copy', function () {
	return gulp.src(config.src.js + '/*.js')
		.pipe(gulp.dest(config.dest.js));
});

//--------------------------------------------------------------
// NUNJUCKS
//--------------------------------------------------------------

gulp.task('nun', function () {
	return gulp.src(config.src.templates + '/**/[^_]*.html')
		.pipe(nunjucksRender({
			path: [config.src.templates] // String or Array
		}))
		.pipe(prettify({
				indent_with_tabs: true,
				preserve_newlines: false,
				end_with_newline: true
		}))
		.pipe(gulp.dest(config.dest.html));
});


//--------------------------------------------------------------
// SPRITES
//--------------------------------------------------------------

gulp.task('sprite', function () {
	var spriteData = gulp.src(config.src.icons + '/*.png').pipe(spritesmith({
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
		.pipe(imagemin({
			optimizationLevel: 3
		}))
		.pipe(gulp.dest(config.dest.img));

	var cssStream = spriteData.css
		.pipe(gulp.dest(config.src.sass));

	return merge(imgStream, cssStream);

});


//--------------------------------------------------------------
// START SERVER
//--------------------------------------------------------------

gulp.task('default', ['sass', 'nun', 'js-copy', 'serve'], function () {
		gulp.watch("./src/sass/*.scss", ['sass']);
		gulp.watch("./src/templates/**/*.html", ['nun']);
		gulp.watch("./src/js/**/*.js", ['js-copy']);
		gulp.watch("./src/img/**/*.{png,jpg,svg}", ['img-copy']);
});

gulp.task('serve', function() {
		browserSync.init({
				server: {
						baseDir: "./public"
				}
		});

		browserSync.watch('public/**/*.*').on('change', browserSync.reload);

});


function isMax(mq) {
		return /max-width/.test(mq);
}

function isMin(mq) {
		return /min-width/.test(mq);
}

function sortMediaQueries(a, b) {
		A = a.replace(/\D/g, '');
		B = b.replace(/\D/g, '');

		if (isMax(a) && isMax(b)) {
				return B - A;
		} else if (isMin(a) && isMin(b)) {
				return A - B;
		} else if (isMax(a) && isMin(b)) {
				return 1;
		} else if (isMin(a) && isMax(b)) {
				return -1;
		}

		return 1;
}