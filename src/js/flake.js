import { addClass, setStyle } from './helpers/dom';
import { getRandom, interpolation } from './helpers/number';

export default class Flake {
    static maxInnerSize = 20;
    /**
     * @constructor
     *
     * @param {Object} params
     * @param {number} params.containerHeight
     * @param {number} params.gid
     * @param {number} [params.count]
     * @param {number} [params.speed]
     * @param {boolean} [params.rotation]
     * @param {number} [params.minOpacity]
     * @param {number} [params.maxOpacity]
     * @param {number} [params.minSize]
     * @param {number} [params.maxSize]
     * @param {number} [params.types]
     * @param {number} [params.wind]
     */
    constructor(params) {
        const isEqual = params.minSize === params.maxSize;

        this.innerSize = isEqual ? 0 : getRandom(0, Flake.maxInnerSize);
        this.size = Flake.calcSize(this.innerSize, params);

        const flake = document.createElement('div');
        const innerFlake = document.createElement('div');
        const animationProps = this.getAnimationProps(params);
        const styleProps = {
            animationName: `snowflake_gid_${params.gid}_y`,
            animationDelay: animationProps.animationDelay,
            animationDuration: animationProps.animationDuration,
            left: (Math.random() * 99) + '%',
            top: -Math.sqrt(2) * this.size + 'px',
            width: this.size + 'px',
            height: this.size + 'px'
        };

        if (!isEqual) {
            styleProps.opacity = interpolation(
                this.size,
                params.minSize,
                params.maxSize,
                params.minOpacity,
                params.maxOpacity
            );
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
        this._elem = flake;
    }

    /**
     * Calc size.
     *
     * @param {number} innerSize
     * @param {Object} params
     *
     * @returns {number}
     */
    static calcSize(innerSize, params) {
        return Math.floor(interpolation(innerSize, 0, Flake.maxInnerSize, params.minSize, params.maxSize));
    }

    /**
     * Get animation properties.
     *
     * @param {Object} params
     *
     * @returns {Object}
     */
    getAnimationProps(params) {
        const speedMax = params.containerHeight / 50 / params.speed;
        const speedMin = speedMax / 3;

        return {
            animationDelay: (Math.random() * speedMax) + 's',
            animationDuration: interpolation(
                this.size,
                params.minSize,
                params.maxSize,
                speedMax,
                speedMin
            ) + 's'
        };
    }

    /**
     * Resize a flake.
     *
     * @param {Object} params
     */
    resize(params) {
        const props = this.getAnimationProps(params);

        setStyle(this._elem, props);
    }

    /**
     * Append flake to container.
     *
     * @param {DOMElement} container
     */
    appendTo(container) {
        container.appendChild(this._elem);
    }

    /**
     * Destroy a flake.
     */
    destroy() {
        delete this._elem;
    }
}
