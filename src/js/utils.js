let animationPrefix = '';
if (typeof window !== 'undefined') {
    animationPrefix = (Array.prototype.slice
        .call(window.getComputedStyle(document.documentElement, ''))
        .join(',')
        .search(/,animation/) > -1
    ) ? '' : 'Webkit';
}

/**
 * Set inline style.
 *
 * @param {DOMElement} dom
 * @param {Object} props
 */
export function setStyle(dom, props) {
    Object.keys(props).forEach(function(originalKey) {
        let key = originalKey;
        if (animationPrefix && originalKey.search('animation') > -1) {
            key = animationPrefix + originalKey[0].toUpperCase() + originalKey.substr(1);
        }

        dom.style[key] = props[originalKey];
    });
}

/**
 * Show DOM element.
 *
 * @param {DOMElement} dom
 */
export function showElement(dom) {
    setStyle(dom, {display: 'block'});
}

/**
 * Hide DOM element.
 *
 * @param {DOMElement} dom
 */
export function hideElement(dom) {
    setStyle(dom, {display: 'none'});
}

/**
 * Get random number.
 *
 * @param {number} from
 * @param {number} max
 *
 * @returns {number}
 */
export function getRandom(from, max) {
    return from + Math.floor(Math.random() * (max - from));
}

/**
 * Linear interpolation.
 *
 * @param {number} x
 * @param {number} x1
 * @param {number} x2
 * @param {number} y1
 * @param {number} y2
 *
 * @returns {number}
 */
export function interpolation(x, x1, x2, y1, y2) {
    return y1 + (y2 - y1) * (x - x1) / (x2 - x1);
}
