type SnowflakesRawParams = Partial<SnowflakesParams>;
export interface SnowflakesParams extends Record<string, boolean | HTMLElement | number | string | undefined> {
    container: HTMLElement;
    count: number;
    color: string;
    minOpacity: number;
    maxOpacity: number;
    minSize: number;
    maxSize: number;
    rotation: boolean;
    speed: number;
    stop: boolean;
    types: number;
    width?: number;
    height?: number;
    wind: boolean;
    zIndex: number;
    autoResize: boolean;
}
export default class Snowflakes {
    private container;
    private destroyed;
    private flakes;
    private isBody;
    private gid;
    private params;
    private animationStyleNode?;
    private imagesStyleNode?;
    private mainStyleNode?;
    private containerSize;
    static instanceCounter: number;
    static gid: number;
    constructor(params?: SnowflakesRawParams);
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
export {};
