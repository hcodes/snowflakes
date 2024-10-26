export declare const maxInnerSize = 20;
/**
 * Calc size.
 */
export declare function calcSize(innerSize: number, minSize: number, maxSize: number): number;
export interface FlakeParams {
    containerHeight: number;
    gid: number;
    count: number;
    speed: number;
    rotation: boolean;
    minOpacity: number;
    maxOpacity: number;
    minSize: number;
    maxSize: number;
    types: number;
    wind: boolean;
}
export declare class Flake {
    size: number;
    private sizeInner;
    private elem?;
    private elemInner?;
    constructor(params: FlakeParams);
    private handleAnimationEnd;
    private getLeft;
    private update;
    /**
     * Resize a flake.
     */
    resize(params: FlakeParams): void;
    /**
     * Append flake to container.
     */
    appendTo(container: HTMLElement): void;
    /**
     * Destroy a flake.
     */
    destroy(): void;
    /**
     * Get animation properties.
     */
    private getAnimationProps;
}
