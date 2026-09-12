/** @jest-environment jsdom */
import { afterEach, beforeEach, expect, jest, test } from '@jest/globals';
import Snowflakes from '../src/ts/index';
import * as dom from '../src/ts/helpers/dom';

const instances: Snowflakes[] = [];
const injectStyle = dom.injectStyle;

beforeEach(() => {
    // CSS placeholders are replaced by the build; omit them when testing TypeScript directly.
    jest.spyOn(dom, 'injectStyle').mockImplementation((css, node) =>
        injectStyle(css.replace(/\{(?:MAIN_STYLE|IMAGES_STYLE)\}/g, ''), node));
});

afterEach(() => {
    instances.splice(0).forEach(instance => instance.destroy());
    document.head.innerHTML = '';
    jest.restoreAllMocks();
});

test('each instance passes its configured color down to its snowflakes', () => {
    instances.push(new Snowflakes({ count: 1 }), new Snowflakes({ count: 1, color: 'red' }));
    const flakes = document.querySelectorAll('.snowflake__inner');
    expect(getComputedStyle(flakes[0]).color).toBe('rgb(94, 205, 239)');
    expect(getComputedStyle(flakes[1]).color).toBe('rgb(255, 0, 0)');
});

test('a stylesheet can override a snowflake color without changing the instance', () => {
    const style = document.createElement('style');
    style.textContent = '.snowflake { color: lime; }';
    document.head.appendChild(style);
    instances.push(new Snowflakes({ count: 1, color: 'red' }));
    const flake = document.querySelector('.snowflake__inner')!;
    expect(getComputedStyle(flake).color).toBe('rgb(0, 255, 0)');
});
