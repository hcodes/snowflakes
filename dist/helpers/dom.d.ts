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
 * Get window height.
 */
export declare function getWindowHeight(): number;
/**
 * Get window width.
 */
export declare function getWindowWidth(): number;
/**
 * Inject style.
 */
export declare function injectStyle(style: string, styleNode?: HTMLStyleElement): HTMLStyleElement;
/**
 * Remove DOM node.
 */
export declare function removeNode(node?: HTMLElement): void;
/**
 * A DOM node is body.
 */
export declare function isBody(node: HTMLElement): boolean;
/**
 * Add className for a node.
 */
export declare function addClass(node: HTMLElement, className: string): void;
/**
 * Remove className for a node.
 */
export declare function removeClass(node: HTMLElement, className: string): void;
