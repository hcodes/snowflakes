import { addClass, setStyle } from './helpers/dom';
import { getRandom, interpolation } from './helpers/number';

export default class Flake {
    static maxInnerSize = 20;
    /**
     * @constructor
     *
     * @param {DOMElement} container
     * @param {number} containerHeight
     * @param {Object} params
     * @param {number} [params.count]
     * @param {number} [params.speed]
     * @param {boolean} [params.rotation]
     * @param {number} [params.minOpacity]
     * @param {number} [params.maxOpacity]
     * @param {number} [params.minSize]
     * @param {number} [params.maxSize]
     * @param {number} [params.types]
     * @param {number} [params.wind]
     * @param {number} [params.zIndex]
     */
    constructor(container, containerHeight, params) {
        const isEqual = params.minSize === params.maxSize;
        this.innerSize = isEqual ? 0 : getRandom(0, Flake.maxInnerSize);
        this.size = Flake.calcSize(this.innerSize, params);

        const
            flake = document.createElement('div'),
            innerFlake = document.createElement('div'),
            animationProps = this.getAnimationProps(containerHeight, params),
            styleProps = {
                animationDelay: animationProps.animationDelay,
                animationDuration: animationProps.animationDuration,
                left: (Math.random() * 99) + '%',
                marginTop: -Math.sqrt(2) * this.size + 'px',
                width: this.size + 'px',
                height: this.size + 'px'
            };

        if (!isEqual) {
            styleProps.zIndex = params.zIndex + this.size * 10;
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
            animationName: 'snowflake_x_' + this.innerSize,
            animationDelay: Math.random() + 's'
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

        container.appendChild(flake);
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
     * @param {number} containerHeight
     * @param {Object} params
     *
     * @returns {Object}
     */
    getAnimationProps(containerHeight, params) {
        const
            speedMax = containerHeight / 50 / params.speed,
            speedMin = speedMax / 3;

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
     * @param {number} containerHeight
     * @param {Object} params
     */
    resize(containerHeight, params) {
        var props = this.getAnimationProps(containerHeight, params);
        setStyle(this._elem, props);
    }

    /**
     * Destroy a flake.
     */
    destroy() {
        delete this._elem;
    }
}
