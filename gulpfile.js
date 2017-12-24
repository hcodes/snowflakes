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

gulp.task('js', ['css'], function() {
    const css = fs.readFileSync('dist/snowflakes.css', 'utf8');

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
        .pipe($.replace('{CSS}', css.replace(/'/g, '\\\'')))
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
    return gulp.src('src/less/snowflakes.less')
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

gulp.task('watch', function() {
    gulp.watch('src/**/*', ['default']);
});

gulp.task('default', ['js.min']);
