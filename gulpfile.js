const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require("browser-sync").create();
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const sourcemaps = require("gulp-sourcemaps");
const del = require('gulp-clean');
const concat = require('gulp-concat');

const paths = {
  root: 'app/',
  src : {
    index : 'app/',
    html : 'app/*.html',
    styles : 'app/styles/*.scss',
    scripts : 'app/scripts/*.js'
  },
  tmp : {
    index : '.tmp/',
    // html : '.tmp/*.html',
    styles : '.tmp/styles/',
    scripts : '.tmp/scripts/'
  },
  dist : {

  }
}

function clean() {
  return gulp.src(paths.tmp.index, {read: false, force: true})
    .pipe(del());
}

function cleanHtml() {
  return gulp.src(paths.tmp.index + '*.html', {read: false, force: true})
    .pipe(del());
}
exports.cleanHtml = cleanHtml;

function cleanScripts() {
  return gulp.src(paths.tmp.scripts + '*.js', {read: false, force: true})
    .pipe(del());
}
exports.cleanScripts = cleanScripts;

function styles() {
  return gulp
    .src(paths.src.styles)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.tmp.styles))
    .pipe(browserSync.stream());
};
exports.styles = styles;

function scripts() {
  cleanScripts();
  return gulp.src(paths.src.scripts)
    .pipe(concat('main.js'))
    .pipe(gulp.dest(paths.tmp.scripts))
}
exports.scripts = gulp.series(cleanScripts, scripts);

function copy() {
  cleanHtml();
  return gulp.src(paths.src.html)
    .pipe(gulp.dest(paths.tmp.index))
    .pipe(browserSync.stream());
}
exports.copy = gulp.series(cleanHtml, copy);


function serve(){
  browserSync.init({
    server: {
      baseDir : ['.tmp', 'app']
    }
  });
  gulp.watch(paths.src.styles, styles);
  gulp.watch(paths.src.html, copy);
  gulp.watch(paths.src.scripts, scripts);
}
exports.serve = gulp.series(styles, scripts, gulp.parallel(cleanHtml, cleanScripts, copy));

// function build(){
// }
// exports.build = build;

exports.serve = gulp.series(clean, gulp.parallel(styles, scripts, copy), serve);
// exports.default = gulp.series(clean, build);


// gulp.task('default', build);
