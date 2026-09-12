import fs from 'node:fs';
import postcss from 'postcss';
import postcssConfig from '../postcss.config.mjs';

const target = process.argv[2] || 'lib';
if (target !== 'lib' && target !== 'examples') {
    throw new Error('Expected CSS injection target: lib or examples');
}

async function compileStyle(file) {
    const result = await postcss(postcssConfig.plugins).process(fs.readFileSync(file, 'utf-8'), {
        from: file,
        map: false,
    });
    return result.css;
}

const copyright = `/*! Snowflakes | © ${new Date().getFullYear()} Denis Seleznev | MIT License | https://github.com/hcodes/snowflakes/ */\n`;

const cssMain = target === 'lib'
    ? fs.readFileSync('./dist/main.css', 'utf-8')
    : await compileStyle('./src/styles/base.css');
const cssTypes = target === 'lib'
    ? fs.readFileSync('./dist/types.css', 'utf-8')
    : await compileStyle('./src/styles/shapes.css');

const encodeQuotes = (content) => {
    return content.replace(/'/g, '\\\'');
}

const injectCSS = (source, dest, isLight) => {
    const content = fs.readFileSync(source, 'utf-8')
        .replace(/\{MAIN_STYLE\}/, encodeQuotes(cssMain))
        .replace(/\{IMAGES_STYLE\}/, encodeQuotes(isLight ? '' : cssTypes))
        .replace(/^/, copyright);

    fs.writeFileSync(dest, content, 'utf-8');
}

if (target === 'lib') {
    injectCSS('./dist/snowflakes.js', './dist/snowflakes.light.js', true);
    injectCSS('./dist/snowflakes.js', './dist/snowflakes.js', false);
    injectCSS('./dist/snowflakes.auto.js', './dist/snowflakes.auto.js', false);
    injectCSS('./dist/snowflakes.esm.js', './dist/snowflakes.esm.js', false);
} else {
    injectCSS('./examples/constructor/dist/index.js', './examples/constructor/dist/index.js', false);
}
