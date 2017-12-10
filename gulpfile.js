'use strict';

const
    gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    cleancss = require('gulp-cleancss'),
    del = require('del'),
    fs = require('fs'),
    less = require('gulp-less'),
    rename = require('gulp-rename'),
    replace = require('gulp-replace'),
    uglify = require('gulp-uglify');

gulp.task('js', ['css'], function() {
    const css = fs.readFileSync('dist/snowflakes.css', 'utf8');

    return gulp.src('src/snowflakes.js')
        .pipe(replace('{CSS}', css.replace(/'/g, '\\\'')))
        .pipe(gulp.dest('dist/'));
});

gulp.task('js.min', ['js'], function() {
    return gulp.src('dist/snowflakes.js')
        .pipe(rename('snowflakes.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/'));
});

gulp.task('css', ['clean'], function() {
    return gulp.src('src/snowflakes.less')
        .pipe(less())
        .pipe(cleancss())
        .pipe(autoprefixer({
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
