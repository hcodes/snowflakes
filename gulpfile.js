'use strict';

const
    gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    del = require('del'),
    fs = require('fs'),
    babel = require('rollup-plugin-babel'),
    babelHelpersList = require('babel-helpers').list,
    uglifyOptions = {output: {comments: /^!/}},
    copyright = '/*! Snowflakes | © 2018 Denis Seleznev | MIT License | https://github.com/hcodes/snowflakes/ */\n';

function replaceStyle(tag, filename) {
    return $.replace(tag, fs.readFileSync(filename, 'utf-8').replace(/'/g, '\\\''));
}

gulp.task('js', ['css'], function() {
    return gulp.src('src/js/snowflakes.js')
        .pipe($.rollup({
            allowRealFiles: true,
            input: 'src/js/snowflakes.js',
            format: 'umd',
            name: 'Snowflakes',
            plugins: [babel({
                externalHelpersWhitelist: babelHelpersList.filter(helperName => helperName !== 'asyncGenerator')
            })]
        }))
        .pipe(replaceStyle('{MAIN_STYLE}', 'dist/main.css'))
        .pipe(replaceStyle('{IMAGES_STYLE}', 'dist/images.css'))
        .pipe($.replace(/^/, copyright))
        .pipe(gulp.dest('dist/'));
});

gulp.task('js.min', ['js'], function() {
    return gulp.src('dist/snowflakes.js')
        .pipe($.rename('snowflakes.min.js'))
        .pipe($.uglify(uglifyOptions))
        .pipe(gulp.dest('dist/'));
});

gulp.task('css', ['clean'], function() {
    return gulp.src('src/less/*.less')
        .pipe($.less())
        .pipe($.cleancss())
        .pipe($.autoprefixer({
            browsers: ['ie >= 10', 'Firefox >= 24', 'Chrome >= 26', 'iOS >= 6', 'Safari >= 6', 'Android > 4.0']
        }))
        .pipe(gulp.dest('dist/'));
});

gulp.task('clean', function() {
    return del('dist/*');
});

gulp.task('dev-examples-copy', function() {
    return gulp
        .src('examples/*')
        .pipe(gulp.dest('dev-examples/'));
});

gulp.task('dev-examples', ['dev-examples-copy'], function() {
    return gulp
        .src('dev-examples/*.html')
        .pipe($.replace(/https:\/\/unpkg\.com\/magic-snowflakes\//g, '../'))
        .pipe(gulp.dest('dev-examples/'));
});

gulp.task('watch', function() {
    gulp.watch('src/**/*', ['default']);
});

gulp.task('default', ['js.min', 'dev-examples']);
