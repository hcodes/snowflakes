'use strict';

const gulp = require('gulp');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const prepareJs = require('./helpers').prepareJs;
const uglifyOptions = require('./common').uglifyOptions;

function js() {
    return prepareJs('dist/images.css', 'snowflakes.js');
}

function jsMin() {
    return gulp.src('dist/snowflakes.js')
        .pipe(rename('snowflakes.min.js'))
        .pipe(uglify(uglifyOptions))
        .pipe(gulp.dest('dist/'));
}

module.exports.js = js;
module.exports.jsMin = jsMin;
