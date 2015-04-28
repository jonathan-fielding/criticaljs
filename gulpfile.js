var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var header = require('gulp-header');
var jshint = require('gulp-jshint');
var babel = require('gulp-babel');

var pkg = require('./package.json');
var banner = ['/**',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' * @link <%= pkg.homepage %>',
  ' * @license <%= pkg.license %>',
  ' */',
  ''].join('\n');

gulp.task('compile', function() {
    // place code for your default task here

    return gulp.src('./src/criticaljs.es6')
            .pipe(babel())
            .pipe(rename(function (path) {
                path.extname = ".js";
            }))
            .pipe(gulp.dest('./src/'));
});

gulp.task('minify', function() {
    // place code for your default task here

    return gulp.src('./src/criticaljs.js')
            .pipe(babel())
            .pipe(uglify())
            .pipe(header(banner, { pkg : pkg }))
            .pipe(rename('criticaljs.min.js'))
            .pipe(gulp.dest('./dist/'));
});

// Lint Task
gulp.task('lint', function() {
    return gulp.src('./src/criticaljs.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('docs', function() {
    // place code for your default task here

    return gulp.src('./docs/scripts/*.es6')
            .pipe(babel())
            .pipe(rename(function (path) {
                path.extname = ".js";
            }))
            .pipe(gulp.dest('./docs/scripts/'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('./docs/scripts/*.es6', ['docs']);
    gulp.watch('./src/criticaljs.js', ['default']);
});

//CI Tests
gulp.task('travis', ['lint']);
gulp.task('default', ['compile', 'minify']);