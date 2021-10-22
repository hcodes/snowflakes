const fs = require('fs');

const copyright = `/*! Snowflakes | © ${new Date().getFullYear()} Denis Seleznev | MIT License | https://github.com/hcodes/snowflakes/ */\n`;

const cssMain = fs.readFileSync('./dist/main.css', 'utf-8');
const cssTypes = fs.readFileSync('./dist/types.css', 'utf-8');

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

injectCSS('./dist/snowflakes.js', './dist/snowflakes.light.js', true);
injectCSS('./dist/snowflakes.js', './dist/snowflakes.js', false);
injectCSS('./dist/snowflakes.esm.js', './dist/snowflakes.esm.js', false);
