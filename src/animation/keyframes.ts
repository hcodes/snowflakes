import { SIZE_STEPS, calcSize, calcTrajectory } from './calculations';

export function getAnimationStyle(gid: number, isBody: boolean, height: number, minSize: number, maxSize: number) {
    const { fromY, toY } = calcTrajectory(isBody, height, maxSize);
    const cssText = [`@keyframes snowflake_gid_${gid}_y{from{transform:translateY(${fromY})}to{transform:translateY(${toY})}}`];
    for (let i = 0; i <= SIZE_STEPS; i++) {
        const left = calcSize(i, minSize, maxSize) + 'px';
        cssText.push(`@keyframes snowflake_gid_${gid}_x_${i}{from{transform:translateX(0px)}to{transform:translateX(${left})}}`);
    }
    return cssText.join('\n');
}
