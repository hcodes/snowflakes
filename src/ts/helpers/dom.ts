let animationPrefix = '';
if (typeof window !== 'undefined') {
    animationPrefix = (Array.prototype.slice
        .call(window.getComputedStyle(document.documentElement, ''))
        .join(',')
        .search(/,animation/) > -1
    ) ? '' : 'webkit';
}

/**
 * Set inline style.
 */
export function setStyle(dom: HTMLElement, props: Partial<CSSStyleDeclaration>) {
    Object.keys(props).forEach(originalKey =>  {
        let key = originalKey;
        if (animationPrefix && originalKey.search('animation') > -1) {
            key = animationPrefix + originalKey[0].toUpperCase() + originalKey.substr(1);
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        dom.style[key] = props[originalKey];
    });
}

/**
 * Show DOM element.
 */
export function showElement(dom: HTMLElement) {
    setStyle(dom, { display: 'block' });
}

/**
 * Hide DOM element.
 */
export function hideElement(dom: HTMLElement) {
    setStyle(dom, { display: 'none' });
}

/**
 * Get window height.
 */
export function getWindowHeight() {
    const body = document.body;
    const docElement = document.documentElement;

    let height;

    if (window.innerHeight) {
        height = window.innerHeight;
    } else if (docElement && docElement.clientHeight) {
        height = docElement.clientHeight;
    } else if (body) {
        height = body.clientHeight;
    }

    return height || 0;
}



/**
 * Get window width.
 */
 export function getWindowWidth() {
    const body = document.body;
    const docElement = document.documentElement;

    let width;

    if (window.innerWidth) {
        width = window.innerWidth;
    } else if (docElement && docElement.clientWidth) {
        width = docElement.clientWidth;
    } else if (body) {
        width = body.clientWidth;
    }

    return width || 0;
}

/**
 * Inject style.
 */
export function injectStyle(style: string, styleNode?: HTMLStyleElement) {
    if (!styleNode) {
        styleNode = document.createElement('style');
        document.body.appendChild(styleNode);
    }

    styleNode.textContent = style;

    return styleNode;
}

/**
 * Remove DOM node.
 */
export function removeNode(node?: HTMLElement) {
    if (node && node.parentNode) {
        node.parentNode.removeChild(node);
    }
}

/**
 * A DOM node is body.
 */
export function isBody(node: HTMLElement) {
    return node === document.body;
}

/**
 * Add className for a node.
 */
export function addClass(node: HTMLElement, className: string) {
    node.classList.add(className);
}

/**
 * Remove className for a node.
 */
export function removeClass(node: HTMLElement, className: string) {
    node.classList.remove(className);
}

export const isAnimationEndSupported = typeof document !== 'undefined' && 'onanimationend' in document;
