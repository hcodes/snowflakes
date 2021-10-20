declare type SnowflakesRawParams = Partial<SnowflakesParams>;
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
}
declare class Snowflakes {
    private container;
    private params;
    private isBody;
    private gid;
    private flakes;
    private mainStyleNode?;
    private imagesStyleNode?;
    private animationStyleNode?;
    private destroyed;
    static count: number;
    static gid: number;
    constructor(params: SnowflakesRawParams);
    /**
     * Destroy flakes.
     */
    destroy(): void;
    /**
     * Start CSS animation.
     */
    start(): void;
    /**
     * Stop CSS animation.
     */
    stop(): void;
    private handleResize;
    private appendContainer;
    private appendStyles;
    private injectStyle;
    private getFlakeParams;
    private appendFlakes;
    private setParams;
    private getAnimationStyle;
    private updateAnimationStyle;
    private removeStyles;
    private height;
}
export default function (params: SnowflakesRawParams): Snowflakes;
export {};
