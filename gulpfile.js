var gulp = require('gulp');
var gls = require('gulp-live-server');
var open = require('gulp-open');

gulp.task('serve', function(done) {
  var server = gls.static('public');
  server.start();
  done()
});
 
gulp.task('open', gulp.series('serve',function(){
  var options = {
    uri: 'http://localhost:3000/index.html'
  };
  gulp.src(__filename)
  .pipe(open(options));
}));