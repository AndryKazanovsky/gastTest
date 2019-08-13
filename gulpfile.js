var browserSync = require('browser-sync').create();
var cssMqpacker = require('css-mqpacker');
var cssNano = require('cssnano');
var discardComments = require('postcss-discard-comments');
var gulp = require('gulp');
var htmlHint = require('gulp-htmlhint');
var postcss = require('gulp-postcss');
var precss = require('precss');
var uglify = require('gulp-uglify');

gulp.task('default', ['server'], function() {
  gulp.run('html');
  gulp.run('postcss');
  gulp.run('js');
  gulp.run('images');
  gulp.run('fonts');

  gulp.watch('src/html/**', function(event) {
    gulp.run('html');
  });
  gulp.watch('src/css/**', function(event) {
    gulp.run('postcss');
  });
  gulp.watch('src/js/**', function(event) {
    gulp.run('js');
  });
  gulp.watch('src/images/**/*', function(event) {
    gulp.run('images');
  });
  gulp.watch('src/fonts/**', function(event) {
    gulp.run('fonts');
  });
});

// HTML

gulp.task('html', function() {
  gulp
    .src('src/html/**/*.html')
    .pipe(htmlHint())
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.reload({ stream: true }));
});

// PostCSS

gulp.task('postcss', function() {
  var processors = [precss, cssMqpacker, discardComments, cssNano];
  return gulp
    .src('src/css/*.css')
    .pipe(postcss(processors))
    .pipe(gulp.dest('dist/css/'))
    .pipe(browserSync.reload({ stream: true }));
});

// JavaScript

gulp.task('js', function() {
  return gulp
    .src('src/js/*')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.reload({ stream: true }));
});

// Image files

gulp.task('images', function() {
  gulp
    .src(['src/images/**/*'])
    .pipe(gulp.dest('dist/images'))
    .pipe(browserSync.reload({ stream: true }));
});

// Fonts files

gulp.task('fonts', function(cb) {
  gulp
    .src(['src/fonts/*'])
    .pipe(gulp.dest('dist/fonts'))
    .pipe(browserSync.reload({ stream: true }));
});

// Server

gulp.task('server', function() {
  browserSync.init({
    server: {
      baseDir: 'dist',
    },
    open: false,
  });
});
