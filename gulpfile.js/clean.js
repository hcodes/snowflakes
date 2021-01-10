'use strict';

const del = require('del');

function clean() {
    return del(['dist/*', 'dev-examples/*']);
}

module.exports = clean;
