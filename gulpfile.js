var gulp = require('gulp');
var path = require('path');
var gls = require('gulp-live-server');
var open = require('gulp-open');
var index = require('gulp-index');
var coffee = require('gulp-coffee');
var sass = require('gulp-sass');
var linkInfo = require('npm-link-info');
var childProcess = require('child_process');
var clean = require('gulp-clean');

function libSources(){
  return [
    require.resolve('parallelio-dom/dist/parallelio-dom.js'),
    require.resolve('parallelio-dom/css/parallelio-dom.css')
  ]
}

gulp.task('copySharedSass', function() {
  dir = path.dirname(require.resolve('parallelio-dom/sass/parallelio-dom.sass'));
  return gulp.src(dir+'/**',{allowEmpty:true})
    .pipe(gulp.dest('./shared/sass/parallelio-dom'));
});

gulp.task('copyLib', function() {
  return gulp.src(libSources(),{allowEmpty:true})
    .pipe(gulp.dest('./public/lib'));
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

gulp.task('clean', function() {
  return gulp.src(['./public/samples'], {read: false, allowEmpty:true})
  .pipe(clean());
});

gulp.task('build', gulp.series('clean', 'copySharedSass', 'copyLib', 'coffee', 'sass', 'copyHtml', 'buildIndex'));

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

gulp.task('buildLinked', function(done){
  if(linkInfo.isLinked('parallelio-dom')){
    childProcess.spawn('npx', ['gulp','build'], { cwd: linkInfo.baseFolder('parallelio-dom'), stdio: 'inherit' })
      .on('close', done);
  }else{
    done()
  }
});

gulp.task('watchLinked', function(done){
  if(linkInfo.isLinked('parallelio-dom')){
    gulp.watch(libSources(), gulp.series('copySharedSass', 'copyLib')).on('ready',function(...arg){
      childProcess.spawn('npx', ['gulp','watch'], { cwd: linkInfo.baseFolder('parallelio-dom'), stdio: 'inherit' })
      .on('close', done);
    })
  }else{
    done()
  }
});

gulp.task('watch', gulp.parallel('watchSass','watchLinked','watchCoffee','watchHtml'));

gulp.task('dev', gulp.series('buildLinked', 'build', 'serve', 'open', 'watch'));