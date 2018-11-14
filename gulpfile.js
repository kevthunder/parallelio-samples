var gulp = require('gulp');
var gls = require('gulp-live-server');
var open = require('gulp-open');
var index = require('gulp-index');
var coffee = require('gulp-coffee');
var sass = require('gulp-sass');


function libSources(){
  return [
    require.resolve('parallelio-dom/dist/parallelio-and-dom.js'),
    require.resolve('parallelio-dom/css/parallelio-dom.css')
  ]
}
gulp.task('copyLib', function() {
  return gulp.src(libSources())
    .pipe(gulp.dest('./public/lib'));
});
gulp.task('watchLib', function() {
  return gulp.watch(libSources(), gulp.series('copyLib'));
});

gulp.task('copyHtml', function() {
  return gulp.src('./samples/**/*.html')
    .pipe(gulp.dest('./public/samples'));
});
gulp.task('watchHtml', function() {
  return gulp.watch(['./samples/**/*.html'], gulp.series('copyHtml','buildIndex'));
});


gulp.task('coffee', function() {
  return gulp.src(['./samples/**/*.coffee'])
    .pipe(coffee({bare: true}))
    .pipe(gulp.dest('./public/samples/'));
});
gulp.task('watchCoffee', function() {
  return gulp.watch(['./samples/**/*.coffee'], gulp.series('coffee'));
});

gulp.task('sass', function () {
  return gulp.src('./samples/**/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/samples/'));
});
gulp.task('watchSass', function() {
  return gulp.watch(['./samples/**/*.sass'], gulp.series('sass'));
});

gulp.task('buildIndex', function() {
  return gulp.src('./public/samples/**/*.html')
    .pipe(index({relativePath: './public/'}))
    .pipe(gulp.dest('./public/'));
});

gulp.task('build', gulp.series('copyLib', 'coffee', 'sass', 'copyHtml', 'buildIndex'));

gulp.task('serve', function(done) {
  var server = gls.static('public');
  server.start();

  var watcher = gulp.watch(['./public/**/*.*']);
  watcher.on('all', function(event,path, stats) {
    console.log('notify',path);
    server.notify({path:path});
  });

  done()
});

gulp.task('open', function(){
  var options = {
    uri: 'http://localhost:3000/index.html'
  };
  return gulp.src(__filename)
  .pipe(open(options));
});

gulp.task('watch', gulp.parallel('watchSass','watchCoffee','watchHtml','watchLib'));

gulp.task('dev', gulp.series('build', 'serve', 'open', 'watch'));