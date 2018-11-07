var gulp = require('gulp');
var gls = require('gulp-live-server');
var open = require('gulp-open');
var index = require('gulp-index');

gulp.task('copyLib', function() {
  return gulp.src(require.resolve('parallelio-dom/dist/parallelio-and-dom.js'))
    .pipe(gulp.dest('./public/lib'));
});

gulp.task('copyHtml', function() {
  return gulp.src('./samples/**/*.html')
    .pipe(gulp.dest('./public/samples'));
});

gulp.task('buildIndex', function() {
  return gulp.src('./public/samples/**/*.html')
    .pipe(index({relativePath: './public/'}))
    .pipe(gulp.dest('./public/'));
});

gulp.task('serve', function(done) {
  var server = gls.static('public');
  server.start();
  done()
});
 
gulp.task('build', gulp.series('copyLib', 'copyHtml', 'buildIndex'));

gulp.task('open', gulp.series('build', 'serve', function(){
  var options = {
    uri: 'http://localhost:3000/index.html'
  };
  gulp.src(__filename)
  .pipe(open(options));
}));