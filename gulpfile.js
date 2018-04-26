'use strict';

const
    gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    del = require('del'),
    fs = require('fs'),
    babel = require('rollup-plugin-babel'),
    babelHelpersList = require('babel-helpers').list,
    uglifyOptions = {output: {comments: /^!/}},
    browsers = ['ie >= 10', 'Firefox >= 24', 'Chrome >= 26', 'iOS >= 6', 'Safari >= 6', 'Android > 4.0'],
    copyright = '/*! Snowflakes | © 2018 Denis Seleznev | MIT License | https://github.com/hcodes/snowflakes/ */\n';

function replaceStyle(tag, filename) {
    return $.replace(tag, filename ? fs.readFileSync(filename, 'utf-8').replace(/'/g, '\\\'') : '');
}

function js(imagesStyle, outputFile) {
    return gulp.src('src/js/snowflakes.js')
        .pipe($.rollup({
            allowRealFiles: true,
            input: 'src/js/snowflakes.js',
            output: {
                format: 'umd',
                name: 'Snowflakes',
            },
            plugins: [babel({
                externalHelpersWhitelist: babelHelpersList.filter(helperName => helperName !== 'asyncGenerator')
            })]
        }))
        .pipe(replaceStyle('{MAIN_STYLE}', 'dist/main.css'))
        .pipe(replaceStyle('{IMAGES_STYLE}', imagesStyle))
        .pipe($.replace(/^/, copyright))
        .pipe($.rename(outputFile))
        .pipe(gulp.dest('dist/'));
}

gulp
    .task('js', ['css'], function() {
        return js('dist/images.css', 'snowflakes.js');
    })
    .task('js.min', ['js'], function() {
        return gulp.src('dist/snowflakes.js')
            .pipe($.rename('snowflakes.min.js'))
            .pipe($.uglify(uglifyOptions))
            .pipe(gulp.dest('dist/'));
    })
    .task('js.light', ['css'], function() {
        return js('', 'snowflakes.light.js');
    })
    .task('js.light.min', ['js.light'], function() {
        return gulp.src('dist/snowflakes.light.js')
            .pipe($.rename('snowflakes.light.min.js'))
            .pipe($.uglify(uglifyOptions))
            .pipe(gulp.dest('dist/'));
    })
    .task('css', ['clean'], function() {
        return gulp.src('src/less/*.less')
            .pipe($.less())
            .pipe($.cleancss())
            .pipe($.autoprefixer({ browsers }))
            .pipe(gulp.dest('dist/'));
    })
    .task('clean', function() {
        return del('dist/*');
    })
    .task('dev-examples-copy', function() {
        return gulp
            .src('examples/*')
            .pipe(gulp.dest('dev-examples/'));
    })
    .task('dev-examples', ['dev-examples-copy'], function() {
        return gulp
            .src('dev-examples/*.html')
            .pipe($.replace(/https:\/\/unpkg\.com\/magic-snowflakes\//g, '../'))
            .pipe(gulp.dest('dev-examples/'));
    })
    .task('watch', function() {
        gulp.watch(['src/**/*', 'examples/**/*']);
    })
    .task('default', ['js.min', 'js.light.min', 'dev-examples']);
