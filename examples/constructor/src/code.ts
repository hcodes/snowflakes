import { defaultParams } from '../../../src/ts/defaultParams';
import { SnowflakesInnerParams } from '../../../src/ts/types';

import './code.css';

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

export function updateCode(props: SnowflakesInnerParams) {
    let result = '// Paste the code inside the <body> tag\n<script src="https://unpkg.com/magic-snowflakes/dist/snowflakes.min.js"></script>\n<script>\n    var sf = new Snowflakes(';
    let count = 0;

    Object.keys(defaultParams).forEach((key) => {
        if (typeof defaultParams[key] !== 'undefined' && props[key] !== defaultParams[key]) {
            if (count) {
                result += ',\n';
            } else {
                result += '{\n';
            }

            let value = props[key];
            if (typeof value === 'string') {
                value = '"' + value + '"';
            }

            if (key === 'container') {
                if (value === document.body) {
                    key = '';
                } else {
                    value = 'document.querySelector(".snowflakes-container")';
                }
            }

            if (key) {
                result += `${TAB}${TAB}${key}: ${value}`;
            }

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
