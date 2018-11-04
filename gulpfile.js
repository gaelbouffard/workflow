var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var autoprefixer = require('gulp-autoprefixer');

var path = {
  root: 'app/',
  html: {
    src: 'src/*.html'
  },
  styles: {
    src: 'src/scss/*.scss',
    dest: 'app/css'
  },
  js: 'app/js'
}

function styles() {
  return gulp
    .src(path.styles.src)
    .pipe(autoprefixer())
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(gulp.dest(path.styles.dest));
};
exports.styles = styles;

function copy() {
  gulp.src(path.html.src)
    .pipe(gulp.dest(path.root))
}
exports.copy = copy;

function serve(){
  browserSync.init([path.styles.dest + '/*.css', path.root + '/*.html', path.js + '/*.js'], {
    server: {
      baseDir : path.root
    }
  })
}

function watch(){
  styles();
  copy();
  gulp.watch(path.styles.src, styles);
  gulp.watch(path.html.src, copy);
}

// exports.styles = styles;
// exports.serve = serve;

var build = gulp.series(gulp.parallel(serve, watch));



gulp.task('default', build);
