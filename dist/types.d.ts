export type SnowflakesParams = Partial<SnowflakesInnerParams>;
export interface SnowflakesInnerParams {
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
    [key: string]: unknown;
}
export interface ContainerSize {
    width: number;
    height: number;
}
