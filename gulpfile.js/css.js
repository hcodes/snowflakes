'use strict';

const gulp = require('gulp');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const less = require('gulp-less');

function css() {
    return gulp.src('src/less/*.less')
        .pipe(less())
        .pipe(postcss([
            autoprefixer(),
            cssnano()
        ]))
        .pipe(gulp.dest('dist/'));
}

module.exports = css;

