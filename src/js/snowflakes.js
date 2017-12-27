import Flake from './flake';
import {setStyle} from './utils';

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
     * @param {number} [params.height=height of container]
     * @param {number} [params.speed=1]
     * @param {number} [params.stop=false]
     * @param {boolean} [useRotate=true]
     * @param {boolean} [useScale=true]
     * @param {number} [params.width=width of container]
     * @param {boolean} [params.wind=true]
     * @param {number} [params.zIndex=9999]
     */
    constructor(params) {
        this.params = this._setParams(params);

        this._flakes = [];
        this._isBody = this.params.container === document.body;

        const container = document.createElement('div');
        container.classList.add('snowflakes');
        this._isBody && container.classList.add('snowflakes_body');
        setStyle(container, { zIndex: this.params.zIndex });

        this.params.container.appendChild(container);
        this._container = container;

        if (this.params.stop) {
            this.stop();
        }

        if (!Snowflakes._mainStyleNode) {
            Snowflakes._mainStyleNode = this._injectStyle(mainStyle);
            Snowflakes._count = (Snowflakes._count || 0) + 1;
        }

        this._winHeight = this._getWindowHeight();
        this._onResize = () => {
            this._winHeight = this._getWindowHeight();
            const height = this._height();
            setStyle(this._container, {display: 'none'});
            this._flakes.forEach(flake => flake.resize(height, this.params.speed));
            this._updateAnimationStyle();
            setStyle(this._container, {display: 'block'});
        };

        this._imagesStyleNode = this._injectStyle(imagesStyle.replace(/%7Bcolor%7D/g, encodeURIComponent(this.params.color)));
        this._animationStyleNode = this._injectStyle(this._getAnimationStyle());

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

        this._container && this._container.parentNode.removeChild(this._container);
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
        this._container.classList.remove('snowflakes_paused');
    }

    /**
     * Stop CSS animation.
     */
    stop() {
        this._container.classList.add('snowflakes_paused');
    }

    _setParams(params) {
        params = params || {};

        const result = {};

        [
            ['color', '#5ECDEF'],
            ['container', document.body],
            ['count', 50],
            ['height'],
            ['speed', 1],
            ['stop', false],
            ['useRotate', true],
            ['useScale',  true],
            ['width'],
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
        const
            maxSize = Flake.maxSize,
            minSize = Flake.minSize,
            height = (this._height() + maxSize) + 'px';

        let css = `@-webkit-keyframes snowflake_y{from{-webkit-transform:translateY(0px)}to{-webkit-transform:translateY(${height});}}
@keyframes snowflake_y{from{transform:translateY(0px)}to{transform:translateY(${height})}}`;

        for (let i = minSize; i <= maxSize; i++) {
            let left = (i - minSize) * 4 + 'px';
            css += `@-webkit-keyframes snowflake_x_${i}{from{-webkit-transform:translateX(0px)}to{-webkit-transform:translateX(${left});}}
@keyframes snowflake_x_${i}{from{transform:translateX(0px)}to{transform:translateX(${left})}}`;
        }

        return css;
    }

    _updateAnimationStyle() {
        this._injectStyle(this._getAnimationStyle(), this._animationStyleNode);
    }

    _injectStyle(style, styleNode) {
        if (!styleNode) {
            styleNode = document.createElement('style');
            document.body.appendChild(styleNode);
        }

        if (styleNode.styleSheet) { // IE
            styleNode.styleSheet.cssText = style;
        } else if ('textContent' in styleNode) {
            styleNode.textContent = style;
        } else {
            styleNode.innerHTML = style;
        }

        return styleNode;
    }

    _removeStyle() {
        Snowflakes._count--;
        if (Snowflakes._count <= 0) {
            Snowflakes._count = 0;
            if (Snowflakes._mainStyleNode) {
                Snowflakes._mainStyleNode.parentNode.removeChild(Snowflakes._mainStyleNode);
                delete Snowflakes._mainStyleNode;
            }
        }

        if (this._animationStyleNode) {
            this._animationStyleNode.parentNode.removeChild(this._animationStyleNode);
            delete this._animationStyleNode;
        }

        if (this._imagesStyleNode) {
            this._imagesStyleNode.parentNode.removeChild(this._imagesStyleNode);
            delete this._imagesStyleNode;
        }
    }

    _height() {
        return this.params.height ||
            (this._isBody ? this._winHeight : this.params.container.offsetHeight + Flake.maxSize);
    }

    _getWindowHeight() {
        const
            body = document.body,
            docElement = document.documentElement;

        let height;

        if (window.innerHeight) {
            height = window.innerHeight;
        } else if (docElement && docElement.clientHeight) {
            height = docElement.clientHeight;
        } else if (body) {
            height = body.clientHeight;
        }

        return height;
    }
}

export default function(params) {
    return new Snowflakes(params);
}
