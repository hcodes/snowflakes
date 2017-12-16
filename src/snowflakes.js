/*! Snowflakes | © 2017 Denis Seleznev | MIT License | https://github.com/hcodes/snowflakes/ */
(function(global, factory) {
    if (typeof exports === 'object' && typeof module !== 'undefined') {
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        define(factory);
    } else {
        global.Snowflakes = factory();
    }
}(this, function() {
    'use strict';

    function Flakes(params) {
        if (this instanceof Flakes) {
            this.init(params);
        } else {
            return new Flakes(params);
        }
    }

    Flakes.prototype = {
        flakeSize: 18,
        flakeMinSize: 8,
        flakeMinOpacity: 0.6,
        flakeCount: 9,
        mainStyle: '{CSS}',
        /**
         * Init.
         *
         * @param {Object|undefined} params
         */
        init: function(params) {
            this._setParams(params);

            this._flakes = [];
            this._isBody = this.params.container === document.body;

            var hasWebkitAnimation = (Array.prototype.slice
                .call(window.getComputedStyle(document.documentElement, ''))
                .join('')
                .match(/-webkit-animation/)
            );

            if (hasWebkitAnimation) {
                this._animationPrefix = 'Webkit';
            }

            var container = document.createElement('div');
            container.classList.add('snowflakes');
            this._isBody && container.classList.add('snowflakes_body');
            this.setStyle(container, { zIndex: this.params.zIndex });

            this.params.container.appendChild(container);
            this._container = container;

            this._onResize = function() {
                this._winHeight = this._getWindowHeight();
                this._updateAnimationStyle();
            }.bind(this);
            this._addAnimationStyle();
            this._onResize();
            window.addEventListener('resize', this._onResize, false);

            for (var i = 0; i < this.params.count; i++) {
                this._flakes.push(this.createFlake());
            }

            if (!Flakes._mainStyleNode) {
                Flakes._mainStyleNode = this._injectStyle(this.mainStyle);
                Flakes._count = (Flakes._count || 0) + 1;
            }
        },
        /**
         * Destroy flakes.
         */
        destroy: function() {
            this._removeStyle();

            this._container && this._container.parentNode.removeChild(this._container);

            window.removeEventListener('resize', this._onResize, false);

            delete this._container;
            delete this._flakes;
        },
        /**
         * Start CSS animation.
         */
        start: function() {
            this._container.classList.remove('snowflakes_paused');
        },
        /**
         * Stop CSS animation.
         */
        stop: function() {
            this._container.classList.add('snowflakes_paused');
        },
        /**
         * Create flake.
         *
         * @returns {DOMElement}}
         */
        createFlake: function() {
            var flake = document.createElement('div'),
                innerFlake = document.createElement('div'),
                useScale = this.params.useScale,
                size = (useScale ? this.getRandom(this.flakeMinSize, this.flakeSize) : this.flakeSize),
                speedMax = this._height() / (50 * this.params.speed),
                speedMin = speedMax / 3,
                props = {
                    animationDelay: (Math.random() * speedMax) + 's',
                    animationDuration: this.interpolation(
                        size,
                        this.flakeMinSize,
                        this.flakeSize,
                        speedMax,
                        speedMin) + 's',
                    left: (Math.random() * 100) + '%',
                    width: size + 'px',
                    height: size + 'px'
                };

            if (useScale) {
                props.zIndex = this.params.zIndex + size * 10;
                props.opacity = useScale ?
                    this.interpolation(
                        size,
                        this.flakeMinSize,
                        this.flakeSize,
                        this.flakeMinOpacity,
                        1) :
                    1;
            }

            flake.classList.add('snowflake');
            this.setStyle(flake, props);

            innerFlake.classList.add('snowflake__inner');
            innerFlake.classList.add('snowflake__inner_num_' + this.getRandom(0, this.flakeCount));

            if (this.params.useRotate) {
                innerFlake.classList.add('snowflake__inner_use-rotate' + (Math.random() > 0.5 ? '' : '-reverse'));
            }

            this.setStyle(innerFlake, {
                animationName: 'snowflake_x_' + size,
                animationDelay: Math.random() + 's'
            });

            flake.appendChild(innerFlake);
            this._container.appendChild(flake);

            return flake;
        },
        /**
         * Get random number.
         *
         * @param {number} from
         * @param {number} max
         *
         * @returns {number}
         */
        getRandom: function(from, max) {
            return from + Math.floor(Math.random() * (max - from));
        },
        /**
         * Linear interpolation.
         *
         * @param {number} x
         * @param {number} x1
         * @param {number} x2
         * @param {number} y1
         * @param {number} y2
         *
         * @returns {number}
         */
        interpolation: function(x, x1, x2, y1, y2) {
            return y1 + (y2 - y1) * (x - x1) / (x2 - x1);
        },
        /**
         * Set inline style.
         *
         * @param {DOMElement} dom
         * @param {Object} props
         *
         * @returns {this}
         */
        setStyle: function(dom, props) {
            Object.keys(props).forEach(function(key) {
                if (this._animationPrefix && key.search('animation') > -1) {
                    key = this._animationPrefix + key[0].toUpperCase() + key.substr(1);
                }

                dom.style[key] = props[key];
            }, this);

            return this;
        },
        _setParams: function(params) {
            params = params || {};

            this.params = {
                container: params.container || document.body,
                count: params.count || 50,
                speed: params.speed || 1,
                zIndex: params.zIndex || 9999,
                useRotate: typeof params.useRotate === 'undefined' ? true : params.useRotate,
                useScale: typeof params.useScale === 'undefined' ? true : params.useScale,
                width: params.width,
                height: params.height
            };
        },
        _getAnimationStyle: function() {
            var height = (this._height() + this.flakeSize) + 'px',
                css = '@-webkit-keyframes snowflake_y{from{-webkit-transform:translateY(0px)}to{-webkit-transform:translateY(' + height + ');}}' +
                    '@keyframes snowflake_y{from{transform:translateY(0px)}to{transform:translateY(' + height + ')}}';

            for (var i = this.flakeMinSize; i <= this.flakeSize; i++) {
                var left = (i - this.flakeMinSize) * 4 + 'px';
                css += '@-webkit-keyframes snowflake_x_' + i + '{from{-webkit-transform:translateX(0px)}to{-webkit-transform:translateX(' + left + ');}}' +
                  '@keyframes snowflake_x_' + i + '{from{transform:translateX(0px)}to{transform:translateX(' + left + ')}}';
            }

            return css;
        },
        _addAnimationStyle: function() {
            this._animationStyleNode = this._injectStyle(this._getAnimationStyle());
        },
        _updateAnimationStyle: function() {
            this._injectStyle(this._getAnimationStyle(), this._animationStyleNode);
        },
        _injectStyle: function(style, styleNode) {
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
        },
        _removeStyle: function() {
            Flakes._count--;
            if (Flakes._count <= 0) {
                Flakes._count = 0;
                if (Flakes._mainStyleNode) {
                    Flakes._mainStyleNode.parentNode.removeChild(Flakes._mainStyleNode);
                    delete Flakes._mainStyleNode;
                }
            }

            this._animationStyleNode.parentNode.removeChild(this._animationStyleNode);
            delete this._animationStyleNode;
        },
        _height: function() {
            var p = this.params;

            return p.height || (this._isBody ? this._winHeight : p.container.offsetHeight + this.flakeSize);
        },
        _getWindowHeight: function() {
            var height,
                body = document.body,
                docElement = document.documentElement;

            if (window.innerHeight) {
                height = window.innerHeight;
            } else if (docElement && docElement.clientHeight) {
                height = docElement.clientHeight;
            } else if (body) {
                height = body.clientHeight;
            }

            return height;
        }
    };

    return Flakes;
}));
