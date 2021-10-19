import { Flake, maxInnerSize, calcSize }  from './flake';
import {
    isBody,
    setStyle,
    showElement,
    hideElement,
    getWindowHeight,
    injectStyle,
    removeNode,
    addClass,
    removeClass
} from './helpers/dom';

const mainStyle = '{MAIN_STYLE}';
const imagesStyle = '{IMAGES_STYLE}';

class Snowflakes {
    /**
     * @constructor
     *
     * @param {Object} params
     *
     * @param {DOMElement} [params.container=document.body]
     * @param {number} [params.count=50]
     * @param {number} [params.color="#5ECDEF"]
     * @param {number} [params.minOpacity=0.6]
     * @param {number} [params.maxOpacity=1]
     * @param {number} [params.minSize=10]
     * @param {number} [params.maxSize=25]
     * @param {boolean} [params.rotation=true]
     * @param {number} [params.speed=1]
     * @param {boolean} [params.stop=false]
     * @param {number} [params.types=6]
     * @param {number} [params.width=width of container]
     * @param {number} [params.height=height of container]
     * @param {boolean} [params.wind=true]
     * @param {number} [params.zIndex=9999]
     */
    constructor(params) {
        this.params = this._setParams(params);

        this._isBody = isBody(this.params.container);
        this._setGid();
        this._container = this._appendContainer();

        if (this.params.stop) {
            this.stop();
        }

        this._appendStyles();
        this._appendFlakes();

        this._handleResize = this._handleResize.bind(this);
        window.addEventListener('resize', this._handleResize, false);
    }

    /**
     * Destroy flakes.
     */
    destroy() {
        this._removeStyles();

        removeNode(this._container);
        delete this._container;

        this._flakes.forEach(flake => flake.destroy());

        delete this._flakes;
        delete this.params;

        window.removeEventListener('resize', this._handleResize, false);
    }

    /**
     * Start CSS animation.
     */
    start() {
        removeClass(this._container, 'snowflakes_paused');
    }

    /**
     * Stop CSS animation.
     */
    stop() {
        addClass(this._container, 'snowflakes_paused');
    }

    _setGid() {
        Snowflakes._gid = Snowflakes._gid || 0;
        Snowflakes._gid++;

        this._gid = Snowflakes._gid;
    }

    _handleResize() {
        const flakeParams = this._getFlakeParams();

        hideElement(this._container);
        this._flakes.forEach(flake => flake.resize(flakeParams));
        this._updateAnimationStyle();
        showElement(this._container);
    }

    _appendContainer() {
        const container = document.createElement('div');

        addClass(container, 'snowflakes');
        addClass(container, `snowflakes_gid_${this._gid}`);
        this._isBody && addClass(container, 'snowflakes_body');
        setStyle(container, { zIndex: this.params.zIndex });

        this.params.container.appendChild(container);

        return container;
    }

    _appendStyles() {
        Snowflakes._count = Snowflakes._count || 0;
        if (!Snowflakes._count) {
            this._mainStyleNode = this._injectStyle(mainStyle);
        }
        Snowflakes._count++;

        this._imagesStyleNode = this._injectStyle(imagesStyle.replace(/\{color\}/g, encodeURIComponent(this.params.color)));

        this._animationStyleNode = this._injectStyle(this._getAnimationStyle());
    }

    _injectStyle(style, container) {
        return injectStyle(style.replace(/_gid_value/g, `_gid_${this._gid}`), container);
    }

    _getFlakeParams() {
        const height = this._height();
        const params = this.params;

        return {
            containerHeight: height,
            gid: this._gid,
            count: params.count,
            speed: params.speed,
            rotation: params.rotation,
            minOpacity: params.minOpacity,
            maxOpacity: params.maxOpacity,
            minSize: params.minSize,
            maxSize: params.maxSize,
            types: params.types,
            wind: params.wind,
        };
    }

    _appendFlakes() {
        const flakeParams = this._getFlakeParams();

        this._flakes = [];
        for (let i = 0; i < this.params.count; i++) {
            this._flakes.push(new Flake(flakeParams));
        }

        this._flakes
            .sort((a, b) => a.size - b.size) // For correct z-index
            .forEach(flake => {
                flake.appendTo(this._container);
            });
    }

    _setParams(params) {
        params = params || {};

        const result = {};

        [
            ['color', '#5ECDEF'],
            ['container', document.body],
            ['count', 50],
            ['speed', 1],
            ['stop', false],
            ['rotation', true],
            ['minOpacity', 0.6],
            ['maxOpacity', 1],
            ['minSize', 10],
            ['maxSize', 25],
            ['types', 6],
            ['width'],
            ['height'],
            ['wind', true],
            ['zIndex', 9999]
        ].forEach(item => {
            const name = item[0];
            const defaultValue = item[1];

            if (typeof defaultValue === 'boolean') {
                result[name] = name in params ? params[name] : defaultValue;
            } else {
                result[name] = params[name] || defaultValue;
            }
        });

        return result;
    }

    _getAnimationStyle() {
        const fromY = '0px';
        const toY = (this._height() + this.params.maxSize * Math.sqrt(2)) + 'px';
        const gid = this._gid;

        let css = `@-webkit-keyframes snowflake_gid_${gid}_y{from{-webkit-transform:translateY(${fromY})}to{-webkit-transform:translateY(${toY});}}
@keyframes snowflake_gid_${gid}_y{from{transform:translateY(${fromY})}to{transform:translateY(${toY})}}`;

        for (let i = 0; i <= maxInnerSize; i++) {
            const left = calcSize(i, this.params) + 'px';
            css += `@-webkit-keyframes snowflake_gid_${gid}_x_${i}{from{-webkit-transform:translateX(0px)}to{-webkit-transform:translateX(${left});}}
@keyframes snowflake_gid_${gid}_x_${i}{from{transform:translateX(0px)}to{transform:translateX(${left})}}`;
        }

        return css;
    }

    _updateAnimationStyle() {
        this._injectStyle(this._getAnimationStyle(), this._animationStyleNode);
    }

    _removeStyles() {
        Snowflakes._count--;
        if (!Snowflakes._count < 1) {
            removeNode(this._mainStyleNode);
            delete this._mainStyleNode;
        }

        removeNode(this._imagesStyleNode);
        delete this._imagesStyleNode;

        removeNode(this._animationStyleNode);
        delete this._animationStyleNode;
    }

    _height() {
        return this.params.height ||
            (this._isBody ? getWindowHeight() : this.params.container.offsetHeight + this.params.maxSize);
    }
}

export default function(params) {
    return new Snowflakes(params);
}
