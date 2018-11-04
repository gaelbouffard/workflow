var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

var path = {
  root: 'app/',
  styles: {
    src: 'src/scss/*.scss',
    dest: 'app/css'
  },
  js: 'app/js'
}






function styles() {
  return gulp
    .src(path.styles.src)
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(gulp.dest(path.styles.dest));
};
exports.styles = styles;

function serve(){
  browserSync.init([path.styles.dest + '/*.css', path.root + '/*.html', path.js + '/*.js'], {
    server: {
      baseDir : path.root
    }
  })
}

function watch(){
  styles();
  gulp.watch(path.styles.src, styles);
}

// exports.styles = styles;
// exports.serve = serve;

var build = gulp.series(gulp.parallel(serve, watch));



gulp.task('default', build);
