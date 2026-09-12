export type SnowflakesParams = Partial<NormalizedSnowflakesOptions>;

export interface NormalizedSnowflakesOptions {
    container: HTMLElement; // Default: document.body
    count: number; // Default: 50
    color: string; // Default: "#5ECDEF"
    minOpacity: number; // Default: 0.6
    maxOpacity: number; // Default: 1
    minSize: number; // Default: 10
    maxSize: number; // Default: 25
    rotation: boolean; // Default: true
    speed: number; // Default: 1
    stop: boolean; // Default: false
    types: number; // Default: 6
    width?: number; // Default: width of container
    height?: number; // Default: height of container
    wind: boolean; // Default: true
    zIndex: number; // Default: 9999
    autoResize: boolean; // Default: true
}


export function getDefaultOptions(): NormalizedSnowflakesOptions {
    return {
        color: '#5ECDEF',
        container: document.body,
        count: 50,
        speed: 1,
        stop: false,
        rotation: true,
        minOpacity: 0.6,
        maxOpacity: 1,
        minSize: 10,
        maxSize: 25,
        types: 6,
        width: undefined,
        height: undefined,
        wind: true,
        zIndex: 9999,
        autoResize: true,
    };
}


function finiteNumber<T extends number | undefined>(value: unknown, fallback: T): number | T {
    return typeof value === 'number' && isFinite(value) ? value : fallback;
}

/** Normalize numeric options without reading the DOM or changing the inputs. */
export function normalizeOptions(
    rawParams: SnowflakesParams | undefined,
    defaults: NormalizedSnowflakesOptions,
): NormalizedSnowflakesOptions {
    const params = rawParams || {};
    const result: NormalizedSnowflakesOptions = {
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
