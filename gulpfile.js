var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var header = require('gulp-header');
var jshint = require('gulp-jshint');

var pkg = require('./package.json');
var banner = ['/**',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' * @link <%= pkg.homepage %>',
  ' * @license <%= pkg.license %>',
  ' */',
  ''].join('\n');

gulp.task('default', function() {
    // place code for your default task here

    return gulp.src('./src/criticaljs.js')
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