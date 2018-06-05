const gulp 						= require('gulp');
const config       		= require('../config');

//--------------------------------------------------------------
// FONTS TASK
//--------------------------------------------------------------

//for custom fonts generate css from transfonter.org
gulp.task('fonts', function () {
  return gulp.src(config.src.fonts + '/**/*.*')
    .pipe(gulp.dest(config.dest.fonts));
});

//копирование будет стоять по умолчанию (т.к. могут и использоваться и др шрифты не из гугл фонтс)