var gulp = require('gulp');
var browserify = require('gulp-browserify');
var connect = require('gulp-connect');
var replace = require('gulp-replace');
var rimraf = require('rimraf');
var shell = require('gulp-shell');
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

var vendorJS = function(source, dest){
  return gulp.src(source)
    .pipe(browserify())
    .pipe(uglify())
    .pipe(rename('vendor.bundle.min.js'))
    .pipe(gulp.dest(dest))
    .pipe(connect.reload());
};

var appScript = function(source, dest){
  return gulp.src(source)
    .pipe(browserify({
      transform: ['brfs']
    }))
    .pipe(rename('app.bundle.js'))
    .pipe(gulp.dest(dest))
    .pipe(connect.reload());
};

gulp.task('script', function(){
  return appScript('src/js/app.js', 'build/js/')
});

gulp.task('www', ['clean'], function(){
  html('./src', 'build');
});

gulp.task('build', ['clean', 'www', 'script']);

gulp.task('html', ['script'], function () {
  return gulp.src('src/*.html')
    .pipe(connect.reload());
});

gulp.task('watch', ['script'], function() {
  gulp.watch('./src/index.html', function(){
    return html('./src', 'build');
  });
  gulp.watch('./src/**/*', ['script']);
  gulp.watch('./src/*', ['script']);
  gulp.watch('./src/css/*.css', ['html']);
});

var html = function(source, dest){
  return gulp.src(source + '/**/*', { base: source })
    .pipe(replace('__VERSION__', require('./package').version, {skipBinary: true}))
    .pipe(gulp.dest(dest))
    .pipe(connect.reload());
};

gulp.task('clean', function (cb) {
  rimraf('./build', cb);
});

gulp.task('connect', [], function() {
  connect.server({
    root: 'build',
    livereload: true,
    host: 'localhost'
  });
});

gulp.task('default', ['build', 'watch', 'connect']);