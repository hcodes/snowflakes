'use strict';

const gulp = require('gulp');
const clean = require('./clean');
const css = require('./css');
const js = require('./js').js;
const jsMin = require('./js').jsMin;
const jsLight = require('./js.light').jsLight;
const jsLightMin = require('./js.light').jsLightMin;
const devExamplesCopy = require('./dev-examples').devExamplesCopy;
const devExamples = require('./dev-examples').devExamples;

gulp.task('watch', function() {
    gulp.watch(['src/**/*', 'examples/**/*']);
});

gulp.task('default', gulp.series(
    clean,
    css,
    gulp.parallel(
        gulp.series(js, jsMin),
        gulp.series(jsLight, jsLightMin),
        gulp.series(devExamplesCopy, devExamples)
    )
));
