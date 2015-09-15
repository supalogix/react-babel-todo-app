// gulpfile.js

var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var runSequence = require('run-sequence');
var jasmine = require('gulp-jasmine');

gulp.task('build', function() {
   return browserify({
      entries: 'src/Main.jsx',
      extensions: ['.jsx'],
      debug: true
   })
   .transform(babelify)
   .bundle()
   .pipe(source('bundle.js'))
   .pipe(gulp.dest('app'));
});

gulp.task('test', function() {
   return gulp.src('test/*.spec.js')
      .pipe(jasmine());
});

gulp.task('default', function() {
   runSequence( 'build', 'test' );
});
