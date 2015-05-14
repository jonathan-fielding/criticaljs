var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var minifycss = require('gulp-minify-css');
var sass = require('gulp-sass');


gulp.task('styles', function(){
  gulp.src(['sass/**/*.scss'])
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(sass())
    .pipe(autoprefixer('last 2 versions'))
    .pipe(gulp.dest('styles/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('styles/'))
});

gulp.task('scripts', function(){
  return gulp.src('scripts/**/*.js')
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(babel())
    .pipe(gulp.dest('scripts/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('scripts/'))
});

gulp.task('default', function(){
  gulp.watch("sass/**/*.scss", ['styles']);
  gulp.watch("scripts/**/*.js", ['scripts']);
});