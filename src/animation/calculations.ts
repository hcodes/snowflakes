import { interpolate } from '../utils/math';

export const SIZE_STEPS = 20;

export function calcSize(innerSize: number, minSize: number, maxSize: number) {
    return Math.floor(interpolate(innerSize, 0, SIZE_STEPS, minSize, maxSize));
}

export function calcOpacity(size: number, minSize: number, maxSize: number, minOpacity: number, maxOpacity: number) {
    return interpolate(size, minSize, maxSize, minOpacity, maxOpacity);
}

function calcBaseDuration(height: number, speed: number) {
    return height / 50 / speed;
}

export function calcDuration(size: number, minSize: number, maxSize: number, height: number, speed: number) {
    const duration = calcBaseDuration(height, speed);
    return interpolate(size, minSize, maxSize, duration, duration / 3);
}

export function calcDelay(random: number, height: number, speed: number) {
    return random * calcBaseDuration(height, speed);
}

export function calcTrajectory(isBody: boolean, height: number, maxSize: number) {
    const overshoot = Math.ceil(maxSize * Math.sqrt(2));
    return {
        fromY: '0px',
        toY: isBody ? `calc(100vh + ${overshoot}px)` : `${height + overshoot}px`,
    };
}
