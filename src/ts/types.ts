export type SnowflakesParams = Partial<SnowflakesInnerParams>;

export interface SnowflakesInnerParams {
    container: HTMLElement; // Default: document.body
    count: number; // Default: 50
    color: string; // Default: "#5ECDEF"
    minOpacity: number; // Default: 0.6
    maxOpacity: number; // Default: 1
    minSize: number; // Default: 10
    maxSize: number; // Default: 25
    rotation: boolean; // Default: true
    speed: number; // Default: 1
    stop: boolean; // Default: false
    types: number; // Default: 6
    width?: number; // Default: width of container
    height?: number; // Default: height of container
    wind: boolean; // Default: true
    zIndex: number; // Default: 9999
    autoResize: boolean; // Default: true
    [key: string]: unknown;
}

export interface ContainerSize {
    width: number;
    height: number;
}
