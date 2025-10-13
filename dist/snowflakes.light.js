/*! Snowflakes | © 2025 Denis Seleznev | MIT License | https://github.com/hcodes/snowflakes/ */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Snowflakes = factory());
})(this, (function () { 'use strict';

    function getDefaultParams() {
        return {
            color: '#5ECDEF',
            container: document.body,
            count: 50,
            speed: 1,
            stop: false,
            rotation: true,
            minOpacity: 0.6,
            maxOpacity: 1,
            minSize: 10,
            maxSize: 25,
            types: 6,
            width: undefined,
            height: undefined,
            wind: true,
            zIndex: 9999,
            autoResize: true,
        };
    }

    /**
     * Set inline style.
     */
    function setStyle(dom, props) {
        Object.keys(props).forEach(function (key) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            dom.style[key] = props[key];
        });
    }
    /**
     * Show DOM element.
     */
    function showElement(dom) {
        setStyle(dom, { display: 'block' });
    }
    /**
     * Hide DOM element.
     */
    function hideElement(dom) {
        setStyle(dom, { display: 'none' });
    }
    /**
     * Inject style.
     */
    function injectStyle(style, styleNode) {
        if (!styleNode) {
            styleNode = document.createElement('style');
            document.head.appendChild(styleNode);
        }
        styleNode.textContent = style;
        return styleNode;
    }
    /**
     * Remove DOM node.
     */
    function removeNode(node) {
        if (node && node.parentNode) {
            node.parentNode.removeChild(node);
        }
    }
    function isNotEmptyString(value) {
        return typeof value === 'string' && value !== '';
    }
    /**
     * Add className for a node.
     */
    function addClass(node) {
        var _a;
        var classNames = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            classNames[_i - 1] = arguments[_i];
        }
        var buffer = classNames.filter(isNotEmptyString);
        if (buffer.length) {
            (_a = node.classList).add.apply(_a, buffer);
        }
    }
    /**
     * Remove className for a node.
     */
    function removeClass(node) {
        var _a;
        var classNames = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            classNames[_i - 1] = arguments[_i];
        }
        var buffer = classNames.filter(isNotEmptyString);
        if (buffer.length) {
            (_a = node.classList).remove.apply(_a, buffer);
        }
    }
    function reflow(node) {
        hideElement(node);
        void node.offsetHeight;
        showElement(node);
    }

    /**
     * Get random number.
     */
    function getRandom(from, max) {
        return from + Math.floor(Math.random() * (max - from));
    }
    /**
     * Linear interpolation.
     */
    function interpolation(x, x1, x2, y1, y2) {
        return y1 + (y2 - y1) * (x - x1) / (x2 - x1);
    }

    var maxInnerSize = 20;
    /**
     * Calc size.
     */
    function calcSize(innerSize, minSize, maxSize) {
        return Math.floor(interpolation(innerSize, 0, maxInnerSize, minSize, maxSize));
    }
    var Flake = /** @class */ (function () {
        function Flake(params) {
            var _this = this;
            this.size = 0;
            this.sizeInner = 0;
            this.handleAnimationEnd = function (e) {
                var elem = _this.elem;
                if (!elem) {
                    return;
                }
                if (e.target !== elem) {
                    return;
                }
                setStyle(elem, { left: _this.getLeft() });
                reflow(elem);
            };
            var flake = this.elem = document.createElement('div');
            var innerFlake = this.elemInner = document.createElement('div');
            this.update(params);
            addClass(flake, 'snowflake');
            addClass(innerFlake, 'snowflake__inner', params.types ? 'snowflake__inner_type_' + getRandom(0, params.types) : '', params.wind ? 'snowflake__inner_wind' : '', params.rotation ? ('snowflake__inner_rotation' + (Math.random() > 0.5 ? '' : '_reverse')) : '');
            flake.appendChild(innerFlake);
            flake.onanimationend = this.handleAnimationEnd;
        }
        Flake.prototype.getLeft = function () {
            return (Math.random() * 99) + '%';
        };
        Flake.prototype.update = function (params) {
            if (!this.elem || !this.elemInner) {
                return;
            }
            var isEqual = params.minSize === params.maxSize;
            this.sizeInner = isEqual ? 0 : getRandom(0, maxInnerSize);
            this.size = calcSize(this.sizeInner, params.minSize, params.maxSize);
            var animationProps = this.getAnimationProps(params);
            var styleProps = {
                animationName: "snowflake_gid_".concat(params.gid, "_y"),
                animationDelay: animationProps.animationDelay,
                animationDuration: animationProps.animationDuration,
                left: this.getLeft(),
                top: -Math.sqrt(2) * this.size + 'px',
                width: this.size + 'px',
                height: this.size + 'px'
            };
            if (!isEqual) {
                styleProps.opacity = String(interpolation(this.size, params.minSize, params.maxSize, params.minOpacity, params.maxOpacity));
            }
            setStyle(this.elem, styleProps);
            var animationName = "snowflake_gid_".concat(params.gid, "_x_").concat(this.sizeInner);
            setStyle(this.elemInner, {
                animationName: animationName,
                animationDelay: (Math.random() * 4) + 's'
            });
        };
        /**
         * Resize a flake.
         */
        Flake.prototype.resize = function (params) {
            if (!this.elem) {
                return;
            }
            var props = this.getAnimationProps(params);
            setStyle(this.elem, {
                animationDuration: props.animationDuration,
            });
        };
        /**
         * Append flake to container.
         */
        Flake.prototype.appendTo = function (container) {
            if (!this.elem) {
                return;
            }
            container.appendChild(this.elem);
        };
        /**
         * Destroy a flake.
         */
        Flake.prototype.destroy = function () {
            if (!this.elem) {
                return;
            }
            this.elem.onanimationend = null;
            delete this.elem;
            delete this.elemInner;
        };
        /**
         * Get animation properties.
         */
        Flake.prototype.getAnimationProps = function (params) {
            var speedMax = params.containerHeight / 50 / params.speed;
            var speedMin = speedMax / 3;
            return {
                animationDelay: (Math.random() * speedMax) + 's',
                animationDuration: String(interpolation(this.size, params.minSize, params.maxSize, speedMax, speedMin) + 's')
            };
        };
        return Flake;
    }());

    var mainStyle = '.snowflake{animation:snowflake_unknown 10s linear;pointer-events:none;position:absolute;-webkit-user-select:none;-moz-user-select:none;user-select:none;will-change:transform}.snowflake__inner,.snowflake__inner:before{bottom:0;left:0;position:absolute;right:0;top:0}.snowflake__inner:before{background-size:100% 100%;content:""}.snowflake__inner_wind{animation:snowflake_unknown 2s ease-in-out infinite alternate}.snowflake__inner_rotation:before{animation:snowflake_rotation 10s linear infinite}.snowflake__inner_rotation_reverse:before{animation:snowflake_rotation_reverse 10s linear infinite}@keyframes snowflake_rotation{0%{transform:rotate(0deg)}to{transform:rotate(1turn)}}@keyframes snowflake_rotation_reverse{0%{transform:rotate(0deg)}to{transform:rotate(-1turn)}}.snowflakes{pointer-events:none}.snowflakes_paused .snowflake,.snowflakes_paused .snowflake__inner,.snowflakes_paused .snowflake__inner:before{animation-play-state:paused}.snowflakes_hidden{visibility:hidden}.snowflakes_body{height:1px;left:0;position:fixed;top:0;width:100%}';
    var imagesStyle = '';
    var Snowflakes = /** @class */ (function () {
        function Snowflakes(params) {
            var _this = this;
            this.destroyed = false;
            this.flakes = [];
            this.handleResize = function () {
                if (_this.params.autoResize) {
                    _this.resize();
                }
            };
            this.handleOrientationChange = function () {
                _this.resize();
            };
            this.params = this.setParams(params);
            Snowflakes.gid++;
            this.gid = Snowflakes.gid;
            this.container = this.appendContainer();
            if (this.params.stop) {
                this.stop();
            }
            this.appendStyles();
            this.appendFlakes();
            this.containerSize = {
                width: this.width(),
                height: this.height(),
            };
            window.addEventListener('resize', this.handleResize, false);
            if (screen.orientation && screen.orientation.addEventListener) {
                screen.orientation.addEventListener('change', this.handleOrientationChange);
            }
        }
        Snowflakes.hasSupport = function () {
            return Boolean('onanimationend' in document);
        };
        Object.defineProperty(Snowflakes, "defaultParams", {
            get: function () {
                return getDefaultParams();
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Start CSS animation.
         */
        Snowflakes.prototype.start = function () {
            removeClass(this.container, 'snowflakes_paused');
        };
        /**
         * Stop CSS animation.
         */
        Snowflakes.prototype.stop = function () {
            addClass(this.container, 'snowflakes_paused');
        };
        /**
         * Show snowflakes.
         */
        Snowflakes.prototype.show = function () {
            removeClass(this.container, 'snowflakes_hidden');
        };
        /**
         * Hide snowflakes.
         */
        Snowflakes.prototype.hide = function () {
            addClass(this.container, 'snowflakes_hidden');
        };
        /**
         * Resize snowflakes.
         */
        Snowflakes.prototype.resize = function () {
            var newWidth = this.width();
            var newHeight = this.height();
            if (newHeight === this.containerSize.height) {
                return;
            }
            this.containerSize.width = newWidth;
            this.containerSize.height = newHeight;
            var flakeParams = this.getFlakeParams();
            this.flakes.forEach(function (flake) { return flake.resize(flakeParams); });
            if (this.isBody()) {
                return;
            }
            hideElement(this.container);
            this.updateAnimationStyle();
            showElement(this.container);
        };
        /**
         * Destroy instance.
         */
        Snowflakes.prototype.destroy = function () {
            if (this.destroyed) {
                return;
            }
            this.destroyed = true;
            if (Snowflakes.instanceCounter) {
                Snowflakes.instanceCounter--;
            }
            this.removeStyles();
            removeNode(this.container);
            this.flakes.forEach(function (flake) { return flake.destroy(); });
            this.flakes = [];
            window.removeEventListener('resize', this.handleResize, false);
            if (screen.orientation && screen.orientation.removeEventListener) {
                screen.orientation.removeEventListener('change', this.handleOrientationChange, false);
            }
        };
        Snowflakes.prototype.isBody = function () {
            return this.params.container === document.body;
        };
        Snowflakes.prototype.appendContainer = function () {
            var container = document.createElement('div');
            addClass(container, 'snowflakes', "snowflakes_gid_".concat(this.gid), this.isBody() ? 'snowflakes_body' : '');
            setStyle(container, { zIndex: String(this.params.zIndex) });
            this.params.container.appendChild(container);
            return container;
        };
        Snowflakes.prototype.appendStyles = function () {
            if (!Snowflakes.instanceCounter) {
                this.mainStyleNode = this.injectStyle(mainStyle);
            }
            Snowflakes.instanceCounter++;
            this.imagesStyleNode = this.injectStyle(imagesStyle.replace(/:color:/g, encodeURIComponent(this.params.color)));
            this.animationStyleNode = this.injectStyle(this.getAnimationStyle());
        };
        Snowflakes.prototype.injectStyle = function (style, container) {
            return injectStyle(style.replace(/_gid_value/g, "_gid_".concat(this.gid)), container);
        };
        Snowflakes.prototype.getFlakeParams = function () {
            var height = this.height();
            var params = this.params;
            return {
                containerHeight: height,
                gid: this.gid,
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
        };
        Snowflakes.prototype.appendFlakes = function () {
            var _this = this;
            var flakeParams = this.getFlakeParams();
            this.flakes = [];
            for (var i = 0; i < this.params.count; i++) {
                this.flakes.push(new Flake(flakeParams));
            }
            this.flakes
                .sort(function (a, b) { return a.size - b.size; }) // For correct z-index
                .forEach(function (flake) {
                flake.appendTo(_this.container);
            });
        };
        Snowflakes.prototype.setParams = function (rawParams) {
            var params = rawParams || {};
            var result = {};
            var defaultParams = getDefaultParams();
            Object.keys(defaultParams).forEach(function (name) {
                result[name] = typeof params[name] === 'undefined' ?
                    defaultParams[name] :
                    params[name];
            });
            return result;
        };
        Snowflakes.prototype.getAnimationStyle = function () {
            var fromY = '0px';
            var maxSize = Math.ceil(this.params.maxSize * Math.sqrt(2));
            var toY = this.isBody() ? "calc(100vh + ".concat(maxSize, "px)") : "".concat(this.height() + maxSize, "px");
            var gid = this.gid;
            var cssText = ["@keyframes snowflake_gid_".concat(gid, "_y{from{transform:translateY(").concat(fromY, ")}to{transform:translateY(").concat(toY, ")}}")];
            for (var i = 0; i <= maxInnerSize; i++) {
                var left = calcSize(i, this.params.minSize, this.params.maxSize) + 'px';
                cssText.push("@keyframes snowflake_gid_".concat(gid, "_x_").concat(i, "{from{transform:translateX(0px)}to{transform:translateX(").concat(left, ")}}"));
            }
            return cssText.join('\n');
        };
        Snowflakes.prototype.updateAnimationStyle = function () {
            this.injectStyle(this.getAnimationStyle(), this.animationStyleNode);
        };
        Snowflakes.prototype.removeStyles = function () {
            if (!Snowflakes.instanceCounter) {
                removeNode(this.mainStyleNode);
                delete this.mainStyleNode;
            }
            removeNode(this.imagesStyleNode);
            delete this.imagesStyleNode;
            removeNode(this.animationStyleNode);
            delete this.animationStyleNode;
        };
        Snowflakes.prototype.width = function () {
            return this.params.width ||
                (this.isBody() ? window.innerWidth : this.params.container.offsetWidth);
        };
        Snowflakes.prototype.height = function () {
            return this.params.height ||
                (this.isBody() ? window.innerHeight : this.params.container.offsetHeight + this.params.maxSize);
        };
        Snowflakes.gid = 0;
        Snowflakes.instanceCounter = 0;
        return Snowflakes;
    }());

    return Snowflakes;

}));
