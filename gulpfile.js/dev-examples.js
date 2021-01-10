'use strict';

const gulp = require('gulp');
const replace = require('gulp-replace');

function devExamplesCopy() {
    return gulp
        .src('examples/*')
        .pipe(gulp.dest('dev-examples/'));
}

function devExamples() {
    return gulp
        .src('dev-examples/*.html')
        .pipe(replace(/https:\/\/unpkg\.com\/magic-snowflakes\//g, '../'))
        .pipe(gulp.dest('dev-examples/'));
}

module.exports.devExamplesCopy = devExamplesCopy;
module.exports.devExamples = devExamples;
