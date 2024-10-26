/**
 * Set inline style.
 */
export function setStyle(dom: HTMLElement, props: Partial<CSSStyleDeclaration>) {
    Object.keys(props).forEach(key =>  {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        dom.style[key] = props[key];
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
        document.head.appendChild(styleNode);
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

function isNotEmptyString(value: unknown): value is string {
    return typeof value === 'string' && value !== '';
}

/**
 * Add className for a node.
 */
export function addClass(node: HTMLElement, ...classNames: (string | boolean | null | undefined)[]) {
    const buffer = classNames.filter(isNotEmptyString);
    if (buffer.length) {
        node.classList.add(...buffer);
    }
}

/**
 * Remove className for a node.
 */
export function removeClass(node: HTMLElement, ...classNames: (string | boolean | null | undefined)[]) {
    const buffer = classNames.filter(isNotEmptyString);
    if (buffer.length) {
        node.classList.remove(...buffer);
    }
}

export function reflow(node: HTMLElement) {
    hideElement(node);
    void node.offsetHeight;
    showElement(node);
}
