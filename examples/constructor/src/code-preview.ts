import Snowflakes from '../../../src';
import { NormalizedSnowflakesOptions } from '../../../src/core/options';

import './code-preview.css';

const textareaElement = document.querySelector('.code__textarea') as HTMLTextAreaElement;
textareaElement.onclick = () => {
    textareaElement.select();
};

const copyElement = document.querySelector('.code__copy') as HTMLInputElement;
copyElement.onclick = () => {
    try {
        textareaElement.select();
        document.execCommand('copy');
    } catch {
        // silence
    }
};

const TAB = '    ';

export function updateCode(props: NormalizedSnowflakesOptions) {
    const defaultParams = Snowflakes.defaultParams;
    const layerClass = 'snowflakes-container';
    let result = '// Paste the code inside the <body> tag\n';
    if (props.container !== defaultParams.container) {
        result += `<style>.${layerClass} { position: relative; height: 300px; overflow: hidden; }</style>\n`
            + `<div class="${layerClass}"></div>\n`;
    }
    result += '<script src="https://unpkg.com/magic-snowflakes/dist/snowflakes.min.js"></script>\n<script>\n    var sf = new Snowflakes(';
    let count = 0;

    Object.keys(defaultParams).forEach((key) => {
        const defaultValue = defaultParams[key as keyof NormalizedSnowflakesOptions];
        if (typeof defaultValue !== 'undefined' && key in props && props[key as keyof NormalizedSnowflakesOptions] !== defaultValue) {
            if (count) {
                result += ',\n';
            } else {
                result += '{\n';
            }

            let value = props[key as keyof NormalizedSnowflakesOptions];
            if (key === 'container') {
                value = `document.querySelector(".${layerClass}")`;
            } else if (typeof value === 'string') {
                value = '"' + value + '"';
            }

            result += `${TAB}${TAB}${key}: ${value}`;
            count++;
        }
    });

    if (count) {
        result += `\n${TAB}})`;
    } else {
        result += ')';
    }

    result += ';\n</script>';

    textareaElement.value = result;
}
