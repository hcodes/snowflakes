import { expect, test } from '@jest/globals';
import { calcSize, calcOpacity, calcDuration, calcDelay, calcTrajectory } from '../../src/animation/calculations';
import { getAnimationStyle } from '../../src/animation/keyframes';

test('size and opacity preserve endpoints, interpolate and equal bounds', () => {
    expect(calcSize(0, 10, 25)).toBe(10);
    expect(calcSize(20, 10, 25)).toBe(25);
    expect(calcSize(10, 10, 25)).toBe(17);
    expect(calcSize(0, 20.5, 20.5)).toBe(20);
    expect(calcOpacity(10, 10, 20, 0.2, 1)).toBe(0.2);
    expect(calcOpacity(15, 10, 20, 0.2, 1)).toBeCloseTo(0.6);
    expect(calcOpacity(20, 20, 20, 0, 1)).toBe(0);
});

test('duration depends on height, speed and size; equal sizes remain finite', () => {
    expect(calcDuration(10, 10, 20, 600, 2)).toBe(6);
    expect(calcDuration(20, 10, 20, 600, 2)).toBe(2);
    expect(calcDuration(20, 20, 20, 600, 2)).toBe(6);
    expect(calcDelay(0.5, 600, 2)).toBe(3);
});

test('trajectory and keyframes preserve body and custom container behavior', () => {
    expect(calcTrajectory(true, 300, 25)).toEqual({ fromY: '0px', toY: 'calc(100vh + 36px)' });
    expect(calcTrajectory(false, 300, 25)).toEqual({ fromY: '0px', toY: '336px' });
    const css = getAnimationStyle(7, false, 300, 10, 25);
    expect(css).toMatch(/snowflake_gid_7_y.*translateY\(336px\)/);
    expect(css).toMatch(/snowflake_gid_7_x_20.*translateX\(25px\)/);
    expect(css.split('\n').length).toBe(22);
});
