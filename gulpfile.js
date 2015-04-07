var browserify = require('gulp-browserify');
var connect = require('gulp-connect');
var replace = require('gulp-replace');
var rimraf = require('rimraf');
var shell = require('gulp-shell');
var clean = require('gulp-clean');

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

gulp.task('html', ['mobile-script'], function () {
  return gulp.src('src/*.html')
    .pipe(connect.reload());
});

var html = function(source, dest){
  return gulp.src(source + '/**/*', { base: source })
    .pipe(gulp.dest(dest))
    .pipe(connect.reload());
};

gulp.task('desktop-clean', function (cb) {
  rimraf('./build', cb);
});

gulp.task('connect', [], function() {
  connect.server({
    root: 'build',
    livereload: true,
    host: 'localhost'
  });
});