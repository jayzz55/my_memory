var gulp = require('gulp');
var uncss = require('gulp-uncss');
var connect = require('gulp-connect');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('server', function(){
  connect.server({
    livereload: true  
  });
});

gulp.task('html', function() {
  gulp.src('./*.html')
    .pipe(connect.reload());
});

gulp.task('sass', function() {
  gulp.src('./css/*.scss')
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulp.dest('css'))
    .pipe(connect.reload());
});

gulp.task('watch', function() {
  gulp.watch(['./*.html'],['html']);
  gulp.watch(['./css/*.scss'],['sass']);
});
 
gulp.task('uncss', function() {
  return gulp.src('./css/bootstrap.min.css')
      .pipe(uncss({
          html: ['index.html']
      }))
      .pipe(gulp.dest('./css/out'));
});

gulp.task('default', ['server','watch']);
