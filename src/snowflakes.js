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
                useRotate: typeof params.useRotate === 'undefined' ? true : params.useRotate,
                useScale: typeof params.useScale === 'undefined' ? true : params.useScale,
                width: params.width,
                height: params.height
            };

            this._flakes = [];
            this._isBody = this.params.container === document.body;

            var container = document.createElement('div');
            container.classList.add('snowflakes');
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
        flakeCount: 8,
        start: function() {
            this._container.classList.remove('snowflakes_paused');
        },
        stop: function() {
            this._container.classList.add('snowflakes_paused');
        },
        getRandom: function(from, max) {
            return from + Math.floor(Math.random() * (max - from));
        },
        createFlake: function() {
            var flake = document.createElement('div'),
                innerFlake = document.createElement('div'),
                size = (this.params.useScale ? this.getRandom(this.flakeMinSize, this.flakeSize) : this.flakeSize) + 'px';

            flake.classList.add('snowflake');
            this.setStyle(flake, {
                animationDelay: (Math.random() * 10) + 's',
                left: (Math.random() * 100) + '%',
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
        setStyle: function(elem, props) {
            Object.keys(props).forEach(function(key) {
                elem.style[key] = props[key];
            }, this);

            return this;
        },
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
