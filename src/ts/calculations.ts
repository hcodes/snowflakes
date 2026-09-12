import { interpolation } from './helpers/number';

export const maxInnerSize = 20;

export function calcSize(innerSize: number, minSize: number, maxSize: number) {
    return Math.floor(interpolation(innerSize, 0, maxInnerSize, minSize, maxSize));
}

export function calcOpacity(size: number, minSize: number, maxSize: number, minOpacity: number, maxOpacity: number) {
    return interpolation(size, minSize, maxSize, minOpacity, maxOpacity);
}

function calcBaseDuration(height: number, speed: number) {
    return height / 50 / speed;
}

export function calcDuration(size: number, minSize: number, maxSize: number, height: number, speed: number) {
    const duration = calcBaseDuration(height, speed);
    return interpolation(size, minSize, maxSize, duration, duration / 3);
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

export function getAnimationStyle(gid: number, isBody: boolean, height: number, minSize: number, maxSize: number) {
    const { fromY, toY } = calcTrajectory(isBody, height, maxSize);
    const cssText = [`@keyframes snowflake_gid_${gid}_y{from{transform:translateY(${fromY})}to{transform:translateY(${toY})}}`];
    for (let i = 0; i <= maxInnerSize; i++) {
        const left = calcSize(i, minSize, maxSize) + 'px';
        cssText.push(`@keyframes snowflake_gid_${gid}_x_${i}{from{transform:translateX(0px)}to{transform:translateX(${left})}}`);
    }
    return cssText.join('\n');
}
