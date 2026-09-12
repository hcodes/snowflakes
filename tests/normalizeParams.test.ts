import { expect, test } from '@jest/globals';
import { normalizeParams } from '../src/ts/normalizeParams';

const defaults = Object.freeze({
    container: {} as HTMLElement, color: '#5ECDEF', count: 50, speed: 1,
    stop: false, rotation: true, minOpacity: 0.6, maxOpacity: 1,
    minSize: 10, maxSize: 25, types: 6, width: undefined,
    height: undefined, wind: true, zIndex: 9999, autoResize: true,
});

test('uses defaults without accessing the DOM or mutating inputs', () => {
    const input = Object.freeze({ count: undefined, color: 'red', unknown: 42 });
    expect(normalizeParams(undefined, defaults)).toEqual(defaults);
    expect(normalizeParams(input, defaults)).toEqual({ ...defaults, color: 'red' });
    expect(normalizeParams(undefined, defaults)).not.toBe(defaults);
});

test('replaces non-finite numbers and non-numeric values with defaults', () => {
    for (const key of ['count', 'speed', 'minOpacity', 'maxOpacity', 'minSize', 'maxSize', 'types', 'width', 'height', 'zIndex']) {
        for (const value of [NaN, Infinity, -Infinity, '12', null, true, {}]) {
            expect(normalizeParams({ [key]: value }, defaults)).toEqual(defaults);
        }
    }
});

test('clamps opacity and orders opacity and size bounds', () => {
    const result = normalizeParams({ minOpacity: 2, maxOpacity: -1, minSize: 30, maxSize: 5 }, defaults);
    expect(result.minOpacity).toBe(0);
    expect(result.maxOpacity).toBe(1);
    expect(result.minSize).toBe(5);
    expect(result.maxSize).toBe(30);
});

test('preserves equal bounds, fractional sizes, and zero opacity', () => {
    const input = { minSize: 12.5, maxSize: 12.5, minOpacity: 0, maxOpacity: 0 };
    expect(normalizeParams(input, defaults)).toEqual({ ...defaults, ...input });
});

test('clamps sizes and dimensions to zero and requires positive speed', () => {
    const result = normalizeParams({ minSize: -5, maxSize: -1, width: -30, height: -20, speed: -1 }, defaults);
    for (const key of ['minSize', 'maxSize', 'width', 'height'] as const) expect(result[key]).toBe(0);
    expect(result.speed).toBe(defaults.speed);
    expect(normalizeParams({ speed: 0 }, defaults).speed).toBe(defaults.speed);
});

test('uses non-negative integer counts and types; preserves custom type counts', () => {
    const result = normalizeParams({ count: 3.9, types: 8.5, zIndex: -2.8 }, defaults);
    expect(result.count).toBe(3);
    expect(result.types).toBe(8);
    expect(result.zIndex).toBe(-2);
    expect(normalizeParams({ count: -1, types: -1 }, defaults).count).toBe(0);
    expect(normalizeParams({ types: -1 }, defaults).types).toBe(0);
});

test('preserves valid zero values, dimensions, flags, and fractional speed', () => {
    const input = { count: 0, types: 0, width: 0, height: 0, zIndex: 0, stop: true, wind: false, speed: 0.5 };
    expect(normalizeParams(input, defaults)).toEqual({ ...defaults, ...input });
    expect(normalizeParams({ width: 120.5, height: 50 }, defaults).width).toBe(120.5);
});

test('orders bounds after applying defaults and is idempotent', () => {
    const result = normalizeParams({ minSize: 40, maxOpacity: 0.2 }, defaults);
    expect(result.minSize).toBe(25);
    expect(result.maxSize).toBe(40);
    expect(result.minOpacity).toBe(0.2);
    expect(result.maxOpacity).toBe(0.6);
    expect(normalizeParams(result, defaults)).toEqual(result);
});
