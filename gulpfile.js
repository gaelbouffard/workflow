var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var autoprefixer = require('gulp-autoprefixer');
var clean = require('gulp-clean');

var path = {
  root: 'app/',
  html: {
    src: 'src/*.html'
  },
  styles: {
    src: 'src/scss/*.scss',
    dest: 'app/css'
  },
  js: {
    src: 'src/js/*.js',
    dest: 'app/js'
  }
}

function cleanHtml() {
  return gulp.src(path.root + '*.html', {read: false, force: true})
    .pipe(clean());
}
exports.cleanHtml = cleanHtml;

function cleanScripts() {
  return gulp.src(path.js.dest + '/*.js', {read: false, force: true})
    .pipe(clean());
}
exports.cleanScripts = cleanScripts;

function styles() {
  return gulp
    .src(path.styles.src)
    .pipe(autoprefixer())
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(gulp.dest(path.styles.dest));
};
exports.styles = styles;

function scripts() {
  cleanScripts();
  return gulp.src(path.js.src)
    .pipe(gulp.dest(path.js.dest))
}

function copy() {
  cleanHtml();
  return gulp.src(path.html.src)
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

  gulp.series(styles, scripts, gulp.parallel(cleanHtml, cleanScripts, copy));
  gulp.watch(path.styles.src, styles);
  gulp.watch(path.html.src, copy);
  gulp.watch(path.js.src, scripts);
}

// exports.styles = styles;
// exports.serve = serve;

var build = gulp.series(gulp.parallel(serve, watch));



gulp.task('default', build);
