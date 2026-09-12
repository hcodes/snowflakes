import { addClass, removeClass, removeNode, reflow, setStyle } from '../utils/dom';
import { randomInt } from '../utils/math';
import { SIZE_STEPS, calcSize, calcOpacity, calcDuration, calcDelay } from '../animation/calculations';

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
    private typeClass = '';
    private delayRandom = Math.random();

    private elem?: HTMLElement;
    private elemInner?: HTMLElement;

    constructor(params: FlakeParams) {
        const flake = this.elem = document.createElement('div');
        const innerFlake = this.elemInner = document.createElement('div');

        this.update(params);
        this.typeClass = params.types ? 'snowflake__inner_type_' + randomInt(0, params.types) : '';

        addClass(
            flake,
            'snowflake',
        );

        addClass(
            innerFlake,
            'snowflake__inner',
            this.typeClass,
            params.wind ? 'snowflake__inner_wind' : '',
            params.rotation ? ('snowflake__inner_rotation' + (Math.random() > 0.5 ? '' : '_reverse')) : '',
        );

        flake.appendChild(innerFlake);
        flake.onanimationend = this.handleAnimationEnd;
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

        this.sizeInner = isEqual ? 0 : randomInt(0, SIZE_STEPS);
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

        styleProps.opacity = String(calcOpacity(
            this.size,
            params.minSize,
            params.maxSize,
            params.minOpacity,
            params.maxOpacity
        ));

        setStyle(this.elem, styleProps);

        const animationName = `snowflake_gid_${params.gid}_x_${this.sizeInner}`;
        setStyle(this.elemInner, {
            animationName,
            animationDelay: (Math.random() * 4) + 's'
        });
    }

    /**
     * Apply settings that do not change the flake's size or position.
     */
    public setParams(params: FlakeParams, previous: FlakeParams) {
        if (!this.elem || !this.elemInner) {
            return;
        }

        if (params.speed !== previous.speed || params.containerHeight !== previous.containerHeight) {
            this.resize(params);
            setStyle(this.elem, {
                animationDelay: calcDelay(this.delayRandom, params.containerHeight, params.speed) + 's',
            });
        }
        if (params.minOpacity !== previous.minOpacity || params.maxOpacity !== previous.maxOpacity) {
            setStyle(this.elem, {
                opacity: String(calcOpacity(this.size, params.minSize, params.maxSize,
                    params.minOpacity, params.maxOpacity)),
            });
        }
        if (params.wind !== previous.wind) {
            this.elemInner.classList.toggle('snowflake__inner_wind', params.wind);
        }
        if (params.rotation !== previous.rotation) {
            removeClass(this.elemInner, 'snowflake__inner_rotation', 'snowflake__inner_rotation_reverse');
            if (params.rotation) {
                addClass(this.elemInner, 'snowflake__inner_rotation' + (Math.random() > 0.5 ? '' : '_reverse'));
            }
        }
        if (params.types !== previous.types) {
            removeClass(this.elemInner, this.typeClass);
            this.typeClass = params.types ? 'snowflake__inner_type_' + randomInt(0, params.types) : '';
            addClass(this.elemInner, this.typeClass);
        }
    }

    /**
     * Resize a flake.
     */
    public resize(params: FlakeParams) {
        if (!this.elem) {
            return;
        }

        setStyle(this.elem, {
            animationDuration: calcDuration(this.size, params.minSize, params.maxSize,
                params.containerHeight, params.speed) + 's',
        });
    }

    /**
     * Append flake to container.
     */
    public appendTo(container: HTMLElement, before?: Flake) {
        if (!this.elem) {
            return;
        }

        container.insertBefore(this.elem, before?.elem || null);
    }

    /**
     * Destroy a flake.
     */
    public destroy() {
        if (!this.elem) {
            return;
        }

        this.elem.onanimationend = null;
        removeNode(this.elem);

        delete this.elem;
        delete this.elemInner;
    }

    /**
     * Get animation properties.
     */
    private getAnimationProps(params: FlakeParams) {
        return {
            animationDelay: calcDelay(this.delayRandom, params.containerHeight, params.speed) + 's',
            animationDuration: calcDuration(
                this.size, params.minSize, params.maxSize, params.containerHeight, params.speed
            ) + 's',
        };
    }
}
