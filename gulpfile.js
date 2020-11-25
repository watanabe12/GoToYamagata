const gulp = require('gulp');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');

gulp.task('sass', function() {
  return gulp.src('./sass/*.scss')
  .pipe(plumber({errorHandler: notify.onError(
    "Error: <%= error.message %>")}))
  .pipe(sass({outputStyle: 'expanded'}))
  .pipe(gulp.dest('./public/stylesheets'));
});

gulp.task('sass:watch', function() {
  gulp.watch('./sass/*.scss', gulp.task('sass'));
});