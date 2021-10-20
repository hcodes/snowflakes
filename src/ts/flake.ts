import { addClass, setStyle } from './helpers/dom';
import { getRandom, interpolation } from './helpers/number';

export const maxInnerSize = 20;

/**
 * Calc size.
 */
export function calcSize(innerSize: number, minSize: number, maxSize: number) {
    return Math.floor(interpolation(innerSize, 0, maxInnerSize, minSize, maxSize));
}

interface StyleProps extends Record<string, string | undefined> {
    animationName: string;
    animationDelay: string;
    animationDuration: string;
    left: string;
    top: string;
    width: string;
    height: string;
    opacity?: string;
}

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

export class Flake {
    public size: number;

    private innerSize: number;
    private elem?: HTMLElement;

    constructor(params: FlakeParams) {
        const isEqual = params.minSize === params.maxSize;

        this.innerSize = isEqual ? 0 : getRandom(0, maxInnerSize);
        this.size = calcSize(this.innerSize, params.minSize, params.maxSize);

        const flake = document.createElement('div');
        const innerFlake = document.createElement('div');
        const animationProps = this.getAnimationProps(params);
        const styleProps: StyleProps = {
            animationName: `snowflake_gid_${params.gid}_y`,
            animationDelay: animationProps.animationDelay,
            animationDuration: animationProps.animationDuration,
            left: (Math.random() * 99) + '%',
            top: -Math.sqrt(2) * this.size + 'px',
            width: this.size + 'px',
            height: this.size + 'px'
        };

        if (!isEqual) {
            styleProps.opacity = String(interpolation(
                this.size,
                params.minSize,
                params.maxSize,
                params.minOpacity,
                params.maxOpacity
            ));
        }

        setStyle(flake, styleProps);
        setStyle(innerFlake, {
            animationName: `snowflake_gid_${params.gid}_x_${this.innerSize}`,
            animationDelay: (Math.random() * 4) + 's'
        });

        addClass(flake, 'snowflake');
        addClass(innerFlake, 'snowflake__inner');

        if (params.types) {
            addClass(innerFlake, 'snowflake__inner_type_' + getRandom(0, params.types));
        }

        if (params.wind) {
            addClass(innerFlake, 'snowflake__inner_wind');
        }

        if (params.rotation) {
            addClass(innerFlake, 'snowflake__inner_rotation' + (Math.random() > 0.5 ? '' : '_reverse'));
        }

        flake.appendChild(innerFlake);
        this.elem = flake;
    }

    /**
     * Resize a flake.
     */
     public resize(params: FlakeParams) {
        const props = this.getAnimationProps(params);

        if (this.elem) {
            setStyle(this.elem, props);
        }
    }

    /**
     * Append flake to container.
     */
    public appendTo(container: HTMLElement) {
        if (this.elem) {
            container.appendChild(this.elem);
        }
    }

    /**
     * Destroy a flake.
     */
    public destroy() {
        delete this.elem;
    }

    /**
     * Get animation properties.
     */
    private getAnimationProps(params: FlakeParams) {
        const speedMax = params.containerHeight / 50 / params.speed;
        const speedMin = speedMax / 3;

        return {
            animationDelay: (Math.random() * speedMax) + 's',
            animationDuration: String(interpolation(
                this.size,
                params.minSize,
                params.maxSize,
                speedMax,
                speedMin
            ) + 's')
        };
    }
}
