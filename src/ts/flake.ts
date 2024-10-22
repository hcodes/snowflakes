import { addClass, isAnimationEndSupported, reflow, setStyle } from './helpers/dom';
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
    public size = 0;
    private sizeInner = 0;

    private elem?: HTMLElement;
    private elemInner?: HTMLElement;

    constructor(params: FlakeParams) {
        const flake = this.elem = document.createElement('div');
        const innerFlake = this.elemInner = document.createElement('div');

        this.update(params);

        addClass(
            flake,
            'snowflake',
            'snowflake_animation',
            isAnimationEndSupported ? 'snowflake_animation-end' : 'snowflake_animation-infinity',
        );

        addClass(
            innerFlake,
            'snowflake__inner',
            params.types ? 'snowflake__inner_type_' + getRandom(0, params.types) : '',
            params.wind ? 'snowflake__inner_wind' : '',
            params.rotation ? ('snowflake__inner_rotation' + (Math.random() > 0.5 ? '' : '_reverse')) : '',
        );

        flake.appendChild(innerFlake);

        if (isAnimationEndSupported) {
            flake.onanimationend = this.handleAnimationEnd;
        }
    }

    private handleAnimationEnd = (e: AnimationEvent) => {
        const { elem } = this;
        if (!elem) {
            return;
        }

        if (e.target !== elem) {
            return;
        }

        setStyle(elem, { left: this.getLeft() });
        reflow(elem);
    }

    private getLeft() {
        return (Math.random() * 99) + '%';
    }

    private update(params: FlakeParams) {
        if (!this.elem || !this.elemInner) {
            return;
        }

        const isEqual = params.minSize === params.maxSize;

        this.sizeInner = isEqual ? 0 : getRandom(0, maxInnerSize);
        this.size = calcSize(this.sizeInner, params.minSize, params.maxSize);

        const animationProps = this.getAnimationProps(params);
        const styleProps: StyleProps = {
            animationName: `snowflake_gid_${params.gid}_y`,
            animationDelay: animationProps.animationDelay,
            animationDuration: animationProps.animationDuration,
            left: this.getLeft(),
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

        setStyle(this.elem, styleProps);

        const animationName = `snowflake_gid_${params.gid}_x_${this.sizeInner}`;
        setStyle(this.elemInner, {
            animationName,
            animationDelay: (Math.random() * 4) + 's'
        });
    }

    /**
     * Resize a flake.
     */
    public resize(params: FlakeParams) {
        if (!this.elem) {
            return;
        }

        const props = this.getAnimationProps(params);
        setStyle(this.elem, {
            animationDuration: props.animationDuration,
        });
    }

    /**
     * Append flake to container.
     */
    public appendTo(container: HTMLElement) {
        if (!this.elem) {
            return;
        }

        container.appendChild(this.elem);
    }

    /**
     * Destroy a flake.
     */
    public destroy() {
        if (!this.elem) {
            return;
        }

        this.elem.onanimationend = null;

        delete this.elem;
        delete this.elemInner;
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
