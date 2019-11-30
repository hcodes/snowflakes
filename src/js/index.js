import Flake from './flake';
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

const
    mainStyle = '{MAIN_STYLE}',
    imagesStyle = '{IMAGES_STYLE}';

class Snowflakes {
    /**
     * @constructor
     *
     * @param {Object} params
     *
     * @param {DOMElem} [params.container=document.body]
     * @param {number} [params.count=50]
     * @param {number} [params.color="#5ECDEF"]
     * @param {number} [params.minOpacity=0.6]
     * @param {number} [params.maxOpacity=1]
     * @param {number} [params.minSize=8]
     * @param {number} [params.maxSize=18]
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

        this._flakes = [];
        this._isBody = isBody(this.params.container);

        const container = this._container = document.createElement('div');

        addClass(container, 'snowflakes');
        this._isBody && addClass(container, 'snowflakes_body');
        setStyle(container, { zIndex: this.params.zIndex });

        this.params.container.appendChild(container);

        if (this.params.stop) {
            this.stop();
        }

        if (!Snowflakes._mainStyleNode) {
            Snowflakes._mainStyleNode = injectStyle(mainStyle);
            Snowflakes._count = (Snowflakes._count || 0) + 1;
        }

        this._winHeight = getWindowHeight();
        this._onResize = () => {
            this._winHeight = getWindowHeight();
            const height = this._height();
            hideElement(container);
            this._flakes.forEach(flake => flake.resize(height, this.params));
            this._updateAnimationStyle();
            showElement(container);
        };

        if (imagesStyle) {
            this._imagesStyleNode = injectStyle(imagesStyle.replace(/\{color\}/g, encodeURIComponent(this.params.color)));
        }

        this._animationStyleNode = injectStyle(this._getAnimationStyle());

        window.addEventListener('resize', this._onResize, false);

        for (let i = 0; i < this.params.count; i++) {
            this._flakes.push(new Flake(container, this._height(), this.params));
        }
    }

    /**
     * Destroy flakes.
     */
    destroy() {
        this._removeStyle();

        removeNode(this._container);
        delete this._container;

        window.removeEventListener('resize', this._onResize, false);

        this._flakes.forEach(flake => flake.destroy());
        delete this._flakes;

        delete this.params;
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
            ['minSize', 8],
            ['maxSize', 18],
            ['types', 6],
            ['width'],
            ['height'],
            ['wind', true],
            ['zIndex', 9999]
        ].forEach(function(item) {
            const [name, defaultValue] = item;
            if (typeof defaultValue === 'boolean') {
                result[name] = name in params ? params[name] : defaultValue;
            } else {
                result[name] = params[name] || defaultValue;
            }
        });

        return result;
    }

    _getAnimationStyle() {
        const height = (this._height() + this.params.maxSize) + 'px';

        let css = `@-webkit-keyframes snowflake_y{from{-webkit-transform:translateY(0px)}to{-webkit-transform:translateY(${height});}}
@keyframes snowflake_y{from{transform:translateY(0px)}to{transform:translateY(${height})}}`;

        for (let i = 0; i <= Flake.maxInnerSize; i++) {
            let left = (Flake.calcSize(i, this.params) - this.params.minSize) * 4 + 'px';
            css += `@-webkit-keyframes snowflake_x_${i}{from{-webkit-transform:translateX(0px)}to{-webkit-transform:translateX(${left});}}
@keyframes snowflake_x_${i}{from{transform:translateX(0px)}to{transform:translateX(${left})}}`;
        }

        return css;
    }

    _updateAnimationStyle() {
        injectStyle(this._getAnimationStyle(), this._animationStyleNode);
    }

    _removeStyle() {
        Snowflakes._count--;
        if (Snowflakes._count <= 0) {
            Snowflakes._count = 0;

            removeNode(Snowflakes._mainStyleNode);
            delete Snowflakes._mainStyleNode;
        }

        removeNode(this._animationStyleNode);
        delete this._animationStyleNode;

        removeNode(this._imagesStyleNode);
        delete this._imagesStyleNode;
    }

    _height() {
        return this.params.height ||
            (this._isBody ? this._winHeight : this.params.container.offsetHeight + this.params.maxSize);
    }
}

export default function(params) {
    return new Snowflakes(params);
}
