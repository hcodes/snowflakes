import {interpolation, getRandom, setStyle} from './utils';

export default class Flake {
    static minSize = 8;
    static maxSize = 18;
    static minOpacity = 0.6;
    static maxOpacity = 1;
    static count = 6;

    /**
     * @constructor
     *
     * @param {DOMElement} container
     * @param {number} containerHeight
     * @param {Object} params
     * @param {number} [params.count]
     * @param {number} [params.speed]
     * @param {boolean} [params.useRotate]
     * @param {boolean} [params.useScale]
     * @param {number} [params.wind]
     * @param {number} [params.zIndex]
     */
    constructor(container, containerHeight, params) {
        this.size = params.useScale ? getRandom(Flake.minSize, Flake.maxSize) : Flake.maxSize;

        const
            flake = document.createElement('div'),
            innerFlake = document.createElement('div'),
            animationProps = this.getAnimationProps(containerHeight, params.speed),
            styleProps = {
                animationDelay: animationProps.animationDelay,
                animationDuration: animationProps.animationDuration,
                left: (Math.random() * 99) + '%',
                marginTop: -Math.sqrt(2) * this.size + 'px',
                width: this.size + 'px',
                height: this.size + 'px'
            };

        if (params.useScale) {
            styleProps.zIndex = params.zIndex + this.size * 10;
            styleProps.opacity = interpolation(
                this.size,
                Flake.minSize,
                Flake.maxSize,
                Flake.minOpacity,
                Flake.maxOpacity
            );
        }

        setStyle(flake, styleProps);
        flake.classList.add('snowflake');

        innerFlake.classList.add('snowflake__inner');
        innerFlake.classList.add('snowflake__inner_num_' + getRandom(0, Flake.count));

        if (params.wind) {
            innerFlake.classList.add('snowflake__inner_wind');
        }

        if (params.useRotate) {
            innerFlake.classList.add('snowflake__inner_use-rotate' + (Math.random() > 0.5 ? '' : '-reverse'));
        }

        setStyle(innerFlake, {
            animationName: 'snowflake_x_' + this.size,
            animationDelay: Math.random() + 's'
        });

        flake.appendChild(innerFlake);
        this._elem = flake;

        container.appendChild(flake);
    }

    /**
     * Get animation properties.
     *
     * @param {number} containerHeight
     * @param {number} speed
     *
     * @returns {Object}
     */
    getAnimationProps(containerHeight, speed) {
        const
            speedMax = containerHeight / 50 / speed,
            speedMin = speedMax / 3;

        return {
            animationDelay: (Math.random() * speedMax) + 's',
            animationDuration: interpolation(
                this.size,
                Flake.minSize,
                Flake.maxSize,
                speedMax,
                speedMin
            ) + 's'
        };
    }

    /**
     * Resize a flake.
     *
     * @param {number} containerHeight
     * @param {number} speed
     */
    resize(containerHeight, speed) {
        var props = this.getAnimationProps(containerHeight, speed);
        setStyle(this._elem, props);
    }

    /**
     * Destroy a flake.
     */
    destroy() {
        delete this._elem;
    }
}
