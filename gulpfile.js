var gulp = require('gulp');
var sass = require('gulp-sass');
var gls = require('gulp-live-server');
var browserSync = require('browser-sync').create();

gulp.task('sass', function(){
	return gulp.src('./scss/**/*.scss')
	.pipe(sass())
	.pipe(gulp.dest('./css'))
	.pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: './'
    },
  })
});

gulp.task('start', ['browserSync','sass'], function() {
  //2. serve at custom port
  var server = gls.static('./', 3000);
  // var server = gls('./', true, 3030);
  server.start();

  //use gulp.watch to trigger server actions(notify, start or stop)
  gulp.watch(['./scss/*.scss', './index.html'], ['sass'], function (file) {
    server.notify.apply(server, [file]);
  });
});
