var gulp = require('gulp');
var sass = require('gulp-sass');




function styles() {
  return gulp.src('src/scss/app.scss')
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(gulp.dest('app/css'));
};

exports.styles = styles;

var build = gulp.series(gulp.parallel(styles));

gulp.task('default', build);
