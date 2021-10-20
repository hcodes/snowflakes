/**
 * Get random number.
 */
export function getRandom(from: number, max: number) {
    return from + Math.floor(Math.random() * (max - from));
}

/**
 * Linear interpolation.
 */
export function interpolation(x: number, x1: number, x2: number, y1: number, y2: number) {
    return y1 + (y2 - y1) * (x - x1) / (x2 - x1);
}
