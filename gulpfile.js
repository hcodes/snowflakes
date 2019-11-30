'use strict';

const
    gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    cssnano = require('cssnano'),
    del = require('del'),
    fs = require('fs'),
    babel = require('rollup-plugin-babel'),
    uglifyOptions = {output: {comments: /^!/}},
    copyright = '/*! Snowflakes | © 2019 Denis Seleznev | MIT License | https://github.com/hcodes/snowflakes/ */\n';

function replaceStyle(tag, filename) {
    return $.replace(tag, filename ? fs.readFileSync(filename, 'utf-8').replace(/'/g, '\\\'') : '');
}

function js(imagesStyle, outputFile) {
    return gulp.src(['src/**/*.js'])
        .pipe($.rollup({
            input: 'src/js/index.js',
            output: {
                format: 'umd',
                name: 'Snowflakes',
            },
            plugins: [babel()]
        }))
        .pipe(replaceStyle('{MAIN_STYLE}', 'dist/main.css'))
        .pipe(replaceStyle('{IMAGES_STYLE}', imagesStyle))
        .pipe($.replace(/^/, copyright))
        .pipe($.rename(outputFile))
        .pipe(gulp.dest('dist/'));
}

gulp.task('clean', function() {
    return del('dist/*');
});

gulp.task('css', function() {
    return gulp.src('src/less/*.less')
        .pipe($.less())
        .pipe(postcss([
            autoprefixer(),
            cssnano()
        ]))
        .pipe(gulp.dest('dist/'));
});

gulp.task('js', function() {
    return js('dist/images.css', 'snowflakes.js');
});

gulp.task('js.min', function() {
    return gulp.src('dist/snowflakes.js')
        .pipe($.rename('snowflakes.min.js'))
        .pipe($.uglify(uglifyOptions))
        .pipe(gulp.dest('dist/'));
});

gulp.task('js.light', function() {
    return js('', 'snowflakes.light.js');
});

gulp.task('js.light.min', function() {
    return gulp.src('dist/snowflakes.light.js')
        .pipe($.rename('snowflakes.light.min.js'))
        .pipe($.uglify(uglifyOptions))
        .pipe(gulp.dest('dist/'));
});

gulp.task('dev-examples-copy', function() {
    return gulp
        .src('examples/*')
        .pipe(gulp.dest('dev-examples/'));
});

gulp.task('dev-examples', function() {
    return gulp
        .src('dev-examples/*.html')
        .pipe($.replace(/https:\/\/unpkg\.com\/magic-snowflakes\//g, '../'))
        .pipe(gulp.dest('dev-examples/'));
});

gulp.task('watch', function() {
    gulp.watch(['src/**/*', 'examples/**/*']);
});

gulp.task('default', gulp.series(
    'clean',
    'css',
    'js',
    'js.min',
    'js.light',
    'js.light.min',
    'dev-examples-copy',
    'dev-examples'
));
