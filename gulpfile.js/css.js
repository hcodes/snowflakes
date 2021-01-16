'use strict';

const gulp = require('gulp');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const postcssNested = require('postcss-nested');
const autoprefixer = require('autoprefixer');
const postcssInlineSvg = require('postcss-inline-svg');

function css() {
    return gulp.src('src/css/*.css')
        .pipe(postcss([
            postcssNested(),
            postcssInlineSvg(),
            autoprefixer(),
            cssnano()
        ]))
        .pipe(gulp.dest('dist/'));
}

module.exports = css;

