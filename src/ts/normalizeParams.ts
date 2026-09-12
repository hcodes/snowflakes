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
    const result = {} as SnowflakesInnerParams;

    Object.keys(defaults).forEach(name => {
        result[name] = params[name] === undefined ? defaults[name] : params[name];
    });

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
