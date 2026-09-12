import type { SnowflakesInnerParams, SnowflakesParams } from './types';

function finiteNumber<T extends number | undefined>(value: unknown, fallback: T): number | T {
    return typeof value === 'number' && isFinite(value) ? value : fallback;
}

/** Normalize numeric options without reading the DOM or changing the inputs. */
export function normalizeParams(
    rawParams: SnowflakesParams | undefined,
    defaults: SnowflakesInnerParams,
): SnowflakesInnerParams {
    const params = rawParams || {};
    const result: SnowflakesInnerParams = {
        container: params.container === undefined ? defaults.container : params.container,
        color: params.color === undefined ? defaults.color : params.color,
        stop: params.stop === undefined ? defaults.stop : params.stop,
        rotation: params.rotation === undefined ? defaults.rotation : params.rotation,
        wind: params.wind === undefined ? defaults.wind : params.wind,
        autoResize: params.autoResize === undefined ? defaults.autoResize : params.autoResize,
        count: defaults.count,
        types: defaults.types,
        speed: defaults.speed,
        minOpacity: defaults.minOpacity,
        maxOpacity: defaults.maxOpacity,
        minSize: defaults.minSize,
        maxSize: defaults.maxSize,
        zIndex: defaults.zIndex,
    };

    result.count = Math.max(0, Math.floor(finiteNumber(params.count, defaults.count)));
    result.types = Math.max(0, Math.floor(finiteNumber(params.types, defaults.types)));
    result.speed = finiteNumber(params.speed, defaults.speed);
    if (result.speed <= 0) {
        result.speed = defaults.speed;
    }

    result.minOpacity = Math.max(0, Math.min(1, finiteNumber(params.minOpacity, defaults.minOpacity)));
    result.maxOpacity = Math.max(0, Math.min(1, finiteNumber(params.maxOpacity, defaults.maxOpacity)));
    result.minSize = Math.max(0, finiteNumber(params.minSize, defaults.minSize));
    result.maxSize = Math.max(0, finiteNumber(params.maxSize, defaults.maxSize));

    if (result.minOpacity > result.maxOpacity) {
        [result.minOpacity, result.maxOpacity] = [result.maxOpacity, result.minOpacity];
    }
    if (result.minSize > result.maxSize) {
        [result.minSize, result.maxSize] = [result.maxSize, result.minSize];
    }

    const width = finiteNumber(params.width, defaults.width);
    const height = finiteNumber(params.height, defaults.height);
    result.width = width === undefined ? undefined : Math.max(0, width);
    result.height = height === undefined ? undefined : Math.max(0, height);

    const zIndex = finiteNumber(params.zIndex, defaults.zIndex);
    result.zIndex = zIndex < 0 ? Math.ceil(zIndex) : Math.floor(zIndex);

    return result;
}
