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

    var vendors = ['Moz', 'Webkit', 'O', 'ms', ''],
        requestAnimationFrame = window.requestAnimationFrame,
        cancelAnimationFrame = window.cancelAnimationFrame;

    for (var i = 0; i < vendors.length && !window.requestAnimationFrame; i++) {
        var vendor = vendors[i].toLowerCase();
        requestAnimationFrame = window[vendor + 'RequestAnimationFrame'];
        cancelAnimationFrame  = window[vendor + 'CancelAnimationFrame'] || window[vendor + 'CancelRequestAnimationFrame'];
    }

    requestAnimationFrame = requestAnimationFrame || function(callback) {
        var currTime = new Date().getTime(),
            timeToCall = Math.max(0, 16 - (currTime - lastTime)),
            lastTime = currTime + timeToCall;

        return window.setTimeout(function() {
            callback(currTime + timeToCall);
        }, timeToCall);
    };

    cancelAnimationFrame = cancelAnimationFrame || window.clearTimeout;

    function Flakes(params) {
        if (this instanceof Flakes) {
            this._setParams(params);
            this._initValues();
            this.start();
        } else {
            return new Flakes(params);
        }
    }

    Flakes.prototype = {
        start: function() {
            this._nextFrame();
        },
        stop: function() {
            cancelAnimationFrame(this._timer);
        },
        _nextFrame: function() {
            this._timer = requestAnimationFrame(function() {
                this.update();
                this._nextFrame();
            }.bind(this));
        },
        update: function() {
            var width = this._width(),
                height = this._height();

            this._flakes.forEach(function(flake, i) {
                this._y[i] += this._addY[i];
                this._deltaX[i] += this._addX[i];
                this._angle[i] += this._addAngle[i];

                if (this._y[i] >= height) {
                    this._resetValues(i, width, height);
                }

                flake.move(
                    this._x[i] + this._sinWidth[i] * Math.sin(this._deltaX[i]),
                    this._y[i],
                    this._angle[i]
                );
            }, this);
        },
        destroy: function() {
            this.stop();
            this._flakes.forEach(function(flake) {
                flake.destroy();
            });
            this._flakes = [];

            cancelAnimationFrame(this._timer);
        },
        _setParams: function(params) {
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
        },
        _initValues: function() {
            this._flakes = [];

            this._deltaX = [];
            this._x = [];
            this._y = [];

            this._addX = [];
            this._addY = [];

            this._angle = [];
            this._addAngle = [];

            this._sinWidth = [];
            this._scale = [];

            this._isBody = this.params.container === document.body;

            var width = this._width(),
                height = this._height();

            for (var i = 0; i < this.params.count; i++) {
                this._scale[i] = this.params.useScale ? (0.5 + 0.5 * Math.random()) : 1;

                this._flakes.push(new Flake(this.params.container, {
                    scale: this._scale[i],
                    useRotate: this.params.useRotate
                }));

                this._resetValues(i, width, height);
                this._y[i] = -Math.random() * height;
            }
        },
        _resetValues: function(i, width) {
            var flake = this._flakes[i],
                scale = this._scale[i];

            this._y[i] = -flake.height;
            this._angle[i] = 0;

            this._scale[i] = 0.5 + 0.5 * Math.random();
            this._sinWidth[i] =  scale * (10 + Math.random() * 10);
            this._deltaX[i] = 0;
            this._addY[i] =  scale * (0.7 + Math.random() * this.params.speed);
            this._addX[i] =  scale * (this._addY[i] / 20);
            this._x[i] = Math.random() * width - this._sinWidth[i] - flake.width;
            this._addAngle[i] = this._addY[i];
        },
        _width: function() {
            var p = this.params;

            return p.width || (this._isBody ? this._winWidth() : p.container.offsetWidth + Flake.prototype.width);
        },
        _height: function() {
            var p = this.params;

            return p.height || (this._isBody ? this._winHeight() : p.container.offsetHeight + Flake.prototype.height);
        },
        _winWidth: function() {
            return window.innerWidth || document.body.clientWidth;
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

    function Flake(container, params) {
        var el = document.createElement('div'),
            innerEl = document.createElement('div'),
            width = this.width + 'px',
            height = this.height + 'px',
            num = Math.floor(Math.random() * this.spriteWidth / this.width),
            left = '-' + (num * this.width) + 'px';

        el.className = 'snowflake';

        this.setStyle(el, {
            position: 'absolute',
            left: '-' + width,
            top: '-' + height,
            width: width,
            height: height,
            overflow: 'hidden'
        });

        this.setStyle(innerEl, {
            position: 'absolute',
            left: '0',
            top: '0',
            width: width,
            height: height,
            background: 'url("' + this.spriteSrc + '") no-repeat ' + left + ' 0'
        });

        el.appendChild(innerEl);
        container.appendChild(el);
        this._el = el;
        this._innerEl = innerEl;

        this.params = params;
    }

    Flake.prototype = {
        spriteSrc: 'data:image/png;base64,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',
        spriteWidth: 144,
        width: 16,
        height: 18,
        setStyle: function(elem, props) {
            Object.keys(props).forEach(function(key) {
                elem.style[key === 'transform' ? this._transformProperty : key] = props[key];
            }, this);
        },
        move: function(left, top, angle) {
            this.setStyle(this._el, {
                transform: 'translateX(' + left + 'px) translateY(' + top + 'px) translateZ(0)'
            });

            if (this.params.useRotate) {
                this.setStyle(this._innerEl, {
                    transform: 'rotate(' + angle + 'deg) translateZ(0)' + (this.params.scale ? ' scale(' + this.params.scale + ')' : '')
                });
            }
        },
        destroy: function() {
            this._el.parentNode && this._el.parentNode.removeChild(this._el);
            this._el = null;
            this._innerEl = null;
        }
    };

    var div = document.createElement('div');
    vendors.forEach(function(item) {
        var property = item + (item ? 'T' : 't') + 'ransform';
        if (property in div.style) {
            Flake.prototype._transformProperty = property;
        }
    });

    return Flakes;
}));
