/**
 * Set inline style.
 */
export declare function setStyle(dom: HTMLElement, props: Partial<CSSStyleDeclaration>): void;
/**
 * Show DOM element.
 */
export declare function showElement(dom: HTMLElement): void;
/**
 * Hide DOM element.
 */
export declare function hideElement(dom: HTMLElement): void;
/**
 * Inject style.
 */
export declare function injectStyle(style: string, styleNode?: HTMLStyleElement): HTMLStyleElement;
/**
 * Remove DOM node.
 */
export declare function removeNode(node?: HTMLElement): void;
/**
 * Add className for a node.
 */
export declare function addClass(node: HTMLElement, ...classNames: (string | boolean | null | undefined)[]): void;
/**
 * Remove className for a node.
 */
export declare function removeClass(node: HTMLElement, ...classNames: (string | boolean | null | undefined)[]): void;
export declare function reflow(node: HTMLElement): void;
