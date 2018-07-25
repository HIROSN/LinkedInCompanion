'use strict';

const gulp = require('gulp');
const del = require('del');
const jshint = require('gulp-jshint');

gulp.task('lint', () => {
  return gulp.src('edgeextension/manifest/Extension/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('clean', () => {
  return del(['edgeextension/package']);
});

gulp.task('default', ['lint', 'clean']);
