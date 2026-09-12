import assert from 'node:assert/strict';
import test from 'node:test';
import { normalizeParams } from '../src/ts/normalizeParams.ts';

const defaults = Object.freeze({
    container: {}, color: '#5ECDEF', count: 50, speed: 1,
    stop: false, rotation: true, minOpacity: 0.6, maxOpacity: 1,
    minSize: 10, maxSize: 25, types: 6, width: undefined,
    height: undefined, wind: true, zIndex: 9999, autoResize: true,
});

test('uses defaults without accessing the DOM or mutating inputs', () => {
    const input = Object.freeze({ count: undefined, color: 'red', unknown: 42 });
    assert.deepEqual(normalizeParams(undefined, defaults), defaults);
    assert.deepEqual(normalizeParams(input, defaults), { ...defaults, color: 'red' });
    assert.notEqual(normalizeParams(undefined, defaults), defaults);
});

test('replaces non-finite numbers and non-numeric values with defaults', () => {
    for (const key of ['count', 'speed', 'minOpacity', 'maxOpacity', 'minSize', 'maxSize', 'types', 'width', 'height', 'zIndex']) {
        for (const value of [NaN, Infinity, -Infinity, '12', null, true, {}]) {
            assert.deepEqual(normalizeParams({ [key]: value }, defaults), defaults, `${key}: ${String(value)}`);
        }
    }
});

test('clamps opacity and orders opacity and size bounds', () => {
    const result = normalizeParams({ minOpacity: 2, maxOpacity: -1, minSize: 30, maxSize: 5 }, defaults);
    assert.equal(result.minOpacity, 0);
    assert.equal(result.maxOpacity, 1);
    assert.equal(result.minSize, 5);
    assert.equal(result.maxSize, 30);
});

test('preserves equal bounds, fractional sizes, and zero opacity', () => {
    const input = { minSize: 12.5, maxSize: 12.5, minOpacity: 0, maxOpacity: 0 };
    assert.deepEqual(normalizeParams(input, defaults), { ...defaults, ...input });
});

test('clamps sizes and dimensions to zero and requires positive speed', () => {
    const result = normalizeParams({ minSize: -5, maxSize: -1, width: -30, height: -20, speed: -1 }, defaults);
    for (const key of ['minSize', 'maxSize', 'width', 'height']) assert.equal(result[key], 0);
    assert.equal(result.speed, defaults.speed);
    assert.equal(normalizeParams({ speed: 0 }, defaults).speed, defaults.speed);
});

test('uses non-negative integer counts and types; preserves custom type counts', () => {
    const result = normalizeParams({ count: 3.9, types: 8.5, zIndex: -2.8 }, defaults);
    assert.equal(result.count, 3);
    assert.equal(result.types, 8);
    assert.equal(result.zIndex, -2);
    assert.equal(normalizeParams({ count: -1, types: -1 }, defaults).count, 0);
    assert.equal(normalizeParams({ types: -1 }, defaults).types, 0);
});

test('preserves valid zero values, dimensions, flags, and fractional speed', () => {
    const input = { count: 0, types: 0, width: 0, height: 0, zIndex: 0, stop: true, wind: false, speed: 0.5 };
    assert.deepEqual(normalizeParams(input, defaults), { ...defaults, ...input });
    assert.equal(normalizeParams({ width: 120.5, height: 50 }, defaults).width, 120.5);
});

test('orders bounds after applying defaults and is idempotent', () => {
    const result = normalizeParams({ minSize: 40, maxOpacity: 0.2 }, defaults);
    assert.equal(result.minSize, 25);
    assert.equal(result.maxSize, 40);
    assert.equal(result.minOpacity, 0.2);
    assert.equal(result.maxOpacity, 0.6);
    assert.deepEqual(normalizeParams(result, defaults), result);
});
