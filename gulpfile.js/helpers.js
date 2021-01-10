'use strict';

const gulp = require('gulp');
const rollup = require('gulp-rollup');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const fs = require('fs');
const babel = require('rollup-plugin-babel');
const copyright = require('./common').copyright;

function replaceStyle(tag, filename) {
    return replace(tag, filename ? fs.readFileSync(filename, 'utf-8').replace(/'/g, '\\\'') : '');
}

function prepareJs(imagesStyle, outputFile) {
    return gulp.src(['src/**/*.js'])
        .pipe(rollup({
            input: 'src/js/index.js',
            output: {
                format: 'umd',
                name: 'Snowflakes',
            },
            plugins: [babel()]
        }))
        .pipe(replaceStyle('{MAIN_STYLE}', 'dist/main.css'))
        .pipe(replaceStyle('{IMAGES_STYLE}', imagesStyle))
        .pipe(replace(/^/, copyright))
        .pipe(rename(outputFile))
        .pipe(gulp.dest('dist/'));
}

module.exports.prepareJs = prepareJs;
