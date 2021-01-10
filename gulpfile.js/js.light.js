'use strict';

const gulp = require('gulp');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const prepareJs = require('./helpers').prepareJs;
const uglifyOptions = require('./common').uglifyOptions;

function jsLight() {
    return prepareJs('', 'snowflakes.light.js');
}

function jsLightMin() {
    return gulp.src('dist/snowflakes.light.js')
        .pipe(rename('snowflakes.light.min.js'))
        .pipe(uglify(uglifyOptions))
        .pipe(gulp.dest('dist/'));
}

module.exports.jsLight = jsLight;
module.exports.jsLightMin = jsLightMin;
