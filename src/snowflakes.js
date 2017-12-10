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

    var CSS = '{CSS}';

    function Flakes(params) {
        this._injectStyle();

        if (this instanceof Flakes) {
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

            this._flakes = [];
            this._isBody = this.params.container === document.body;

            var container = document.createElement('div');
            container.classList.add('snowflakes');
            this.setStyle(container, { zIndex: this.params.zIndex });

            this._isBody && container.classList.add('snowflakes_body');

            this.params.container.appendChild(container);
            this._container = container;

            for (var i = 0; i < this.params.count; i++) {
                this._flakes.push(this.createFlake());
            }
        } else {
            return new Flakes(params);
        }
    }

    Flakes.prototype = {
        flakeSize: 18,
        flakeMinSize: 8,
        flakeMinOpacity: 0.6,
        flakeCount: 8,
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
                size = (useScale ? this.getRandom(this.flakeMinSize, this.flakeSize) : this.flakeSize) + 'px';

            flake.classList.add('snowflake');
            this.setStyle(flake, {
                animationDelay: (Math.random() * 10) + 's',
                left: (Math.random() * 100) + '%',
                zIndex: this.params.zIndex + (size * 10),
                opacity: useScale ?
                    this.interpolation(
                        size,
                        this.flakeMinSize,
                        this.flakeSize,
                        this.flakeMinOpacity,
                        1) :
                    1,
                width: size,
                height: size
            });
            
            innerFlake.classList.add('snowflake__inner');
            innerFlake.classList.add('snowflake__inner_num_' + this.getRandom(0, this.flakeCount));

            if (this.params.useRotate) {
                innerFlake.classList.add('snowflake__inner_use-rotate' + (Math.random() > 0.5 ? '' : '-reverse'));
            }

            this.setStyle(innerFlake, {
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
                dom.style[key] = props[key];
            }, this);

            return this;
        },
        /**
         * Destroy flakes.
         */
        destroy: function() {
            this._flakes.forEach(function(flake) {
                flake.parentNode && flake.parentNode.removeChild(flake);
            });

            delete this._flakes;

            this._removeStyle();
        },
        _injectStyle: function() {
            if (!Flakes._styleNode) {
                var styleNode = document.createElement('style');
                styleNode.innerText = CSS;
                document.body.appendChild(styleNode);
                Flakes._styleNode = styleNode;
                Flakes._count = (Flakes._count || 0) + 1;
            }
        },
        _removeStyle: function() {
            Flakes._count--;
            if (Flakes._count <= 0) {
                Flakes._count = 0;
                if (Flakes._styleNode && Flakes._styleNode.parentNode) {
                    Flakes._styleNode.parentNode.removeChild(Flakes._styleNode);
                    delete Flakes._styleNode;
                }
            }
        },
        _height: function() {
            var p = this.params;

            return p.height || (this._isBody ? this._winHeight() : p.container.offsetHeight + this.flakeSize);
        },
        _winHeight: function() {
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
