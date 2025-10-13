import { SnowflakesInnerParams, SnowflakesParams } from './types';
export { SnowflakesParams } from './types';
export default class Snowflakes {
    private container;
    private destroyed;
    private flakes;
    private params;
    private animationStyleNode?;
    private imagesStyleNode?;
    private mainStyleNode?;
    private containerSize;
    private gid;
    static gid: number;
    static instanceCounter: number;
    static hasSupport(): boolean;
    static get defaultParams(): SnowflakesInnerParams;
    constructor(params?: SnowflakesParams);
    /**
     * Start CSS animation.
     */
    start(): void;
    /**
     * Stop CSS animation.
     */
    stop(): void;
    /**
     * Show snowflakes.
     */
    show(): void;
    /**
     * Hide snowflakes.
     */
    hide(): void;
    /**
     * Resize snowflakes.
     */
    resize(): void;
    /**
     * Destroy instance.
     */
    destroy(): void;
    private isBody;
    private handleResize;
    private handleOrientationChange;
    private appendContainer;
    private appendStyles;
    private injectStyle;
    private getFlakeParams;
    private appendFlakes;
    private setParams;
    private getAnimationStyle;
    private updateAnimationStyle;
    private removeStyles;
    private width;
    private height;
}
