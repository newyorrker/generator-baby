const gulp 						= require('gulp');
const config       		= require('../config');
const gulpLoadPlugins = require('gulp-load-plugins');
const autoprefixer 		= require('autoprefixer');
const mqpacker        = require('css-mqpacker');
const csso 						= require('postcss-csso');

const $ = gulpLoadPlugins();

// postcss processors

let mq = mqpacker({sort: sortMediaQueries})
let processors = [
	autoprefixer({
			browsers: ['last 4 versions'],
			cascade: false
	}),
	mq,
	csso
];

//--------------------------------------------------------------
// SASS TASK
//--------------------------------------------------------------

gulp.task('sass', function () {
	return gulp.src(config.src.sass + '/*.scss')
		.pipe($.if(config.dev, $.sourcemaps.init()))
		.pipe($.if(config.dev,
			$.sass(config.sass.expanded).on('error', $.sass.logError),
			$.sass(config.sass).on('error', $.sass.logError)))
		.pipe($.if(config.dev,
			$.postcss([mq]),
			$.postcss(processors)))
		.pipe($.if(config.dev, $.sourcemaps.write()))
		.pipe(gulp.dest(config.dest.css));
});

gulp.task('sass:watch', function() {
	gulp.watch(config.src.sass + '/**/*.{scss,sass}', ['sass']);
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