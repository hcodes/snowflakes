/** @jest-environment jsdom */
import { afterEach, beforeEach, expect, jest, test } from '@jest/globals';
import Snowflakes, { SnowflakesParams } from '../../src/index';
import * as dom from '../../src/utils/dom';

const instances: Snowflakes[] = [];
const injectStyle = dom.injectStyle;

function create(params: SnowflakesParams = {}) {
    const instance = new Snowflakes({ count: 2, ...params });
    instances.push(instance);
    return instance;
}

beforeEach(() => {
    jest.spyOn(dom, 'injectStyle').mockImplementation((css, node) =>
        injectStyle(css.replace(/\{(?:MAIN_STYLE|IMAGES_STYLE)\}/g, ''), node));
});

afterEach(() => {
    instances.splice(0).forEach(instance => instance.destroy());
    document.body.innerHTML = '';
    jest.restoreAllMocks();
});

test('partial updates preserve flakes, omitted options and other instances', () => {
    const instance = create({ color: 'red', zIndex: 12 });
    create({ color: 'blue' });
    const [container, other] = document.querySelectorAll<HTMLElement>('.snowflakes');
    const flake = container.firstChild;
    const styles = Array.from(document.head.querySelectorAll('style'));
    const count = Snowflakes.instanceCounter;

    instance.setParams({ color: 'lime' });
    instance.setParams({ zIndex: 0 });
    instance.setParams({});
    expect(container.style.color).toBe('lime');
    expect(container.style.zIndex).toBe('0');
    expect(container.firstChild).toBe(flake);
    expect(container.children).toHaveLength(2);
    expect(other.style.color).toBe('blue');
    expect(Array.from(document.head.querySelectorAll('style'))).toEqual(styles);
    expect(Snowflakes.instanceCounter).toBe(count);
});

test('updates count, size, opacity, movement and shape options', () => {
    const instance = create();
    const container = document.querySelector('.snowflakes')!;
    const oldFlake = container.firstChild as HTMLElement;
    instance.setParams({ count: 3.9, minSize: 30, maxSize: 30, minOpacity: 0.4,
        maxOpacity: 0.4, wind: false, rotation: false, types: 0, speed: 2 });
    expect(container.children).toHaveLength(3);
    expect(oldFlake.isConnected).toBe(false);
    expect(oldFlake.onanimationend).toBeNull();
    const flake = container.firstChild as HTMLElement;
    expect(flake.style.width).toBe('30px');
    expect(flake.style.opacity).toBe('0.4');
    expect(flake.firstElementChild!.className).toBe('snowflake__inner');
    const duration = parseFloat(flake.style.animationDuration);
    instance.setParams({ speed: 4 });
    expect(parseFloat((container.firstChild as HTMLElement).style.animationDuration)).toBe(duration / 2);
    instance.setParams({ count: 0 });
    expect(container.children).toHaveLength(0);
    instance.setParams({ count: 1 });
    expect(container.children).toHaveLength(1);
});

test('invalid and undefined values retain current settings', () => {
    const instance = create({ speed: 2, color: 'red', minSize: 20, maxSize: 20 });
    const flake = document.querySelector('.snowflake')!;
    instance.setParams({ count: NaN, speed: -1, minSize: Infinity, color: undefined });
    expect(document.querySelectorAll('.snowflake')).toHaveLength(2);
    expect(document.querySelector('.snowflake')).toBe(flake);
    expect((document.querySelector('.snowflakes') as HTMLElement).style.color).toBe('red');
});

test('a single range bound cannot change an omitted or undefined bound', () => {
    const instance = create({ count: 1, minSize: 10, maxSize: 25, minOpacity: 0.4, maxOpacity: 0.8 });
    instance.setParams({ minSize: 40, maxSize: undefined, maxOpacity: 0.2 });
    let flake = document.querySelector('.snowflake') as HTMLElement;
    expect(flake.style.width).toBe('25px');
    expect(flake.style.opacity).toBe('0.4');

    instance.setParams({ minSize: 10, maxSize: 25, minOpacity: 0.4, maxOpacity: 0.8 });
    instance.setParams({ maxSize: 5, minOpacity: 0.9 });
    flake = document.querySelector('.snowflake') as HTMLElement;
    expect(flake.style.width).toBe('10px');
    expect(flake.style.opacity).toBe('0.8');
});

test('unrelated or omitted settings do not resize an instance implicitly', () => {
    const target = document.createElement('div');
    document.body.appendChild(target);
    let height = 300;
    Object.defineProperty(target, 'offsetHeight', { get: () => height });
    const instance = create({ container: target, autoResize: false });
    const flake = target.querySelector('.snowflake') as HTMLElement;
    const animation = document.head.querySelectorAll('style')[1];
    const style = flake.style.cssText;
    const keyframes = animation.textContent;
    height = 600;
    instance.setParams({});
    instance.setParams({ height: undefined, width: undefined, color: 'red' });
    expect(flake.style.cssText).toBe(style);
    expect(animation.textContent).toBe(keyframes);
    instance.setParams({ count: 3 });
    expect(flake.style.cssText).toBe(style);
    expect(animation.textContent).toBe(keyframes);
    instance.resize();
    expect(flake.style.animationDuration).not.toBe('');
    expect(flake.style.cssText).not.toBe(style);
    expect(animation.textContent).toContain('translateY(661px)');
});

test('speed and opacity update existing flakes and scale timing without rerandomizing', () => {
    const instance = create({ speed: 2, minSize: 20, maxSize: 20 });
    const flakes = Array.from(document.querySelectorAll<HTMLElement>('.snowflake'));
    const styles = flakes.map(flake => ({
        left: flake.style.left,
        delay: flake.style.animationDelay,
        duration: parseFloat(flake.style.animationDuration),
        innerDelay: (flake.firstElementChild as HTMLElement).style.animationDelay,
    }));
    const inject = jest.mocked(dom.injectStyle);
    inject.mockClear();

    instance.setParams({ speed: 4, minOpacity: 0.3, maxOpacity: 0.3 });
    flakes.forEach((flake, index) => {
        expect(document.querySelectorAll('.snowflake')[index]).toBe(flake);
        expect(flake.style.animationDuration).toBe(styles[index].duration / 2 + 's');
        expect(flake.style.opacity).toBe('0.3');
        expect(flake.style.left).toBe(styles[index].left);
        expect(parseFloat(flake.style.animationDelay)).toBeCloseTo(parseFloat(styles[index].delay) / 2);
        expect((flake.firstElementChild as HTMLElement).style.animationDelay).toBe(styles[index].innerDelay);
    });
    expect(inject).not.toHaveBeenCalled();
});

test('wind, rotation and shape changes only update inner classes', () => {
    const instance = create({ wind: true, rotation: true });
    const flake = document.querySelector('.snowflake') as HTMLElement;
    const inner = flake.firstElementChild as HTMLElement;
    const outerStyle = flake.style.cssText;
    const innerStyle = inner.style.cssText;
    instance.setParams({ wind: false, rotation: false, types: 0 });
    expect(document.querySelector('.snowflake')).toBe(flake);
    expect(flake.firstElementChild).toBe(inner);
    expect(inner.className).toBe('snowflake__inner');
    instance.setParams({ wind: true, rotation: true, types: 1 });
    expect(inner.classList.contains('snowflake__inner_wind')).toBe(true);
    expect(inner.classList.contains('snowflake__inner_type_0')).toBe(true);
    expect(Array.from(inner.classList).filter(name => name.startsWith('snowflake__inner_rotation'))).toHaveLength(1);
    expect(flake.style.cssText).toBe(outerStyle);
    expect(inner.style.cssText).toBe(innerStyle);
    instance.setParams({ types: 2 });
    expect(Array.from(inner.classList).filter(name => name.startsWith('snowflake__inner_type_'))).toHaveLength(1);
});

test('count changes add or remove only the difference and keep size order', () => {
    const instance = create();
    const container = document.querySelector('.snowflakes')!;
    const original = Array.from(container.children) as HTMLElement[];
    const styles = original.map(flake => flake.style.cssText);
    const insert = jest.spyOn(container, 'insertBefore');
    instance.setParams({ count: 5 });
    expect(container.children).toHaveLength(5);
    expect(insert).toHaveBeenCalledTimes(3);
    insert.mock.calls.forEach(([node]) => expect(original).not.toContain(node));
    original.forEach((flake, index) => {
        expect(flake.parentNode).toBe(container);
        expect(flake.style.cssText).toBe(styles[index]);
    });
    const expanded = Array.from(container.children) as HTMLElement[];
    const sizes = expanded.map(flake => parseFloat(flake.style.width));
    expect(sizes).toEqual([...sizes].sort((a, b) => a - b));
    instance.setParams({ count: 3 });
    expect(Array.from(container.children)).toEqual(expanded.slice(0, 3));
    expanded.slice(3).forEach(flake => {
        expect(flake.isConnected).toBe(false);
        expect(flake.onanimationend).toBeNull();
    });
    instance.setParams({ count: 0 });
    expect(container.children).toHaveLength(0);
});

test('new flakes use simultaneously updated settings while existing ones are retained', () => {
    const instance = create({ minSize: 20, maxSize: 20 });
    const original = document.querySelector('.snowflake') as HTMLElement;
    instance.setParams({ count: 4, speed: 3, minOpacity: 0.2, maxOpacity: 0.2,
        wind: false, rotation: false, types: 0 });
    expect(original.isConnected).toBe(true);
    document.querySelectorAll<HTMLElement>('.snowflake').forEach(flake => {
        expect(flake.style.animationDuration).toBe(original.style.animationDuration);
        expect(flake.style.opacity).toBe('0.2');
        expect(flake.firstElementChild!.className).toBe('snowflake__inner');
    });
});

test('preserves visibility and pause unless stop is explicitly supplied', () => {
    const instance = create({ stop: true });
    const container = document.querySelector('.snowflakes')!;
    instance.start();
    instance.setParams({ count: 3 });
    expect(container.classList.contains('snowflakes_paused')).toBe(false);
    instance.stop();
    instance.hide();
    instance.setParams({ count: 4 });
    expect(container.classList.contains('snowflakes_paused')).toBe(true);
    expect(container.classList.contains('snowflakes_hidden')).toBe(true);
    instance.setParams({ stop: false });
    expect(container.classList.contains('snowflakes_paused')).toBe(false);
    expect(container.classList.contains('snowflakes_hidden')).toBe(true);
    instance.setParams({ stop: true });
    expect(container.classList.contains('snowflakes_paused')).toBe(true);
});

test('moves the same container and refreshes animation and resize behavior', () => {
    const instance = create();
    const container = document.querySelector('.snowflakes')!;
    const flake = container.firstChild as HTMLElement;
    const delay = flake.style.animationDelay;
    const target = document.createElement('div');
    document.body.appendChild(target);
    instance.setParams({ container: target, height: 300, autoResize: false });
    expect(target.firstChild).toBe(container);
    expect(container.classList.contains('snowflakes_body')).toBe(false);
    const style = document.head.querySelectorAll('style')[1];
    expect(style.textContent).toContain('translateY(336px)');
    const initialDuration = parseFloat(flake.style.animationDuration);
    instance.setParams({ height: 600 });
    expect(style.textContent).toContain('translateY(636px)');
    expect(parseFloat(flake.style.animationDuration)).toBe(initialDuration * 2);
    const duration = flake.style.animationDuration;
    instance.setParams({ width: 400 });
    expect(container.firstChild).toBe(flake);
    expect(flake.style.animationDuration).toBe(duration);
    expect(parseFloat(flake.style.animationDelay)).toBeCloseTo(parseFloat(delay) * 600 / window.innerHeight);

    const resize = jest.spyOn(instance, 'resize');
    window.dispatchEvent(new Event('resize'));
    expect(resize).not.toHaveBeenCalled();
    instance.setParams({ autoResize: true });
    window.dispatchEvent(new Event('resize'));
    expect(resize).toHaveBeenCalledTimes(1);
    instance.setParams({ container: document.body });
    expect(container.parentNode).toBe(document.body);
    expect(container.classList.contains('snowflakes_body')).toBe(true);
});

test('updates after destruction do not recreate resources', () => {
    const instance = create();
    instance.setParams({ count: 3 });
    instance.destroy();
    const count = Snowflakes.instanceCounter;
    instance.setParams({ count: 4, color: 'red' });
    expect(document.querySelector('.snowflakes')).toBeNull();
    expect(document.head.querySelectorAll('style')).toHaveLength(0);
    expect(Snowflakes.instanceCounter).toBe(count);
});
