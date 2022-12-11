/*! Snowflakes | © 2022 Denis Seleznev | MIT License | https://github.com/hcodes/snowflakes/ */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Snowflakes = factory());
})(this, (function () { 'use strict';

    var animationPrefix = '';
    if (typeof window !== 'undefined') {
        animationPrefix = (Array.prototype.slice
            .call(window.getComputedStyle(document.documentElement, ''))
            .join(',')
            .search(/,animation/) > -1) ? '' : 'webkit';
    }
    /**
     * Set inline style.
     */
    function setStyle(dom, props) {
        Object.keys(props).forEach(function (originalKey) {
            var key = originalKey;
            if (animationPrefix && originalKey.search('animation') > -1) {
                key = animationPrefix + originalKey[0].toUpperCase() + originalKey.substr(1);
            }
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            dom.style[key] = props[originalKey];
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
     * Get window height.
     */
    function getWindowHeight() {
        var body = document.body;
        var docElement = document.documentElement;
        var height;
        if (window.innerHeight) {
            height = window.innerHeight;
        }
        else if (docElement && docElement.clientHeight) {
            height = docElement.clientHeight;
        }
        else if (body) {
            height = body.clientHeight;
        }
        return height || 0;
    }
    /**
     * Get window width.
     */
    function getWindowWidth() {
        var body = document.body;
        var docElement = document.documentElement;
        var width;
        if (window.innerWidth) {
            width = window.innerWidth;
        }
        else if (docElement && docElement.clientWidth) {
            width = docElement.clientWidth;
        }
        else if (body) {
            width = body.clientWidth;
        }
        return width || 0;
    }
    /**
     * Inject style.
     */
    function injectStyle(style, styleNode) {
        if (!styleNode) {
            styleNode = document.createElement('style');
            document.body.appendChild(styleNode);
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
    /**
     * A DOM node is body.
     */
    function isBody(node) {
        return node === document.body;
    }
    /**
     * Add className for a node.
     */
    function addClass(node, className) {
        node.classList.add(className);
    }
    /**
     * Remove className for a node.
     */
    function removeClass(node, className) {
        node.classList.remove(className);
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
            var isEqual = params.minSize === params.maxSize;
            this.innerSize = isEqual ? 0 : getRandom(0, maxInnerSize);
            this.size = calcSize(this.innerSize, params.minSize, params.maxSize);
            var flake = document.createElement('div');
            var innerFlake = document.createElement('div');
            var animationProps = this.getAnimationProps(params);
            var styleProps = {
                animationName: "snowflake_gid_".concat(params.gid, "_y"),
                animationDelay: animationProps.animationDelay,
                animationDuration: animationProps.animationDuration,
                left: (Math.random() * 99) + '%',
                top: -Math.sqrt(2) * this.size + 'px',
                width: this.size + 'px',
                height: this.size + 'px'
            };
            if (!isEqual) {
                styleProps.opacity = String(interpolation(this.size, params.minSize, params.maxSize, params.minOpacity, params.maxOpacity));
            }
            setStyle(flake, styleProps);
            setStyle(innerFlake, {
                animationName: "snowflake_gid_".concat(params.gid, "_x_").concat(this.innerSize),
                animationDelay: (Math.random() * 4) + 's'
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
            this.elem = flake;
        }
        /**
         * Resize a flake.
         */
        Flake.prototype.resize = function (params) {
            var props = this.getAnimationProps(params);
            if (this.elem) {
                setStyle(this.elem, props);
            }
        };
        /**
         * Append flake to container.
         */
        Flake.prototype.appendTo = function (container) {
            if (this.elem) {
                container.appendChild(this.elem);
            }
        };
        /**
         * Destroy a flake.
         */
        Flake.prototype.destroy = function () {
            delete this.elem;
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

    var mainStyle = '.snowflake{-webkit-animation:snowflake_unknown 10s linear infinite;animation:snowflake_unknown 10s linear infinite;pointer-events:none;position:absolute;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;will-change:transform}.snowflake__inner,.snowflake__inner:before{bottom:0;left:0;position:absolute;right:0;top:0}.snowflake__inner:before{background-size:100% 100%;content:""}.snowflake__inner_wind{-webkit-animation:snowflake_unknown 2s ease-in-out infinite alternate;animation:snowflake_unknown 2s ease-in-out infinite alternate}.snowflake__inner_rotation:before{-webkit-animation:snowflake_rotation 10s linear infinite;animation:snowflake_rotation 10s linear infinite}.snowflake__inner_rotation_reverse:before{-webkit-animation:snowflake_rotation_reverse 10s linear infinite;animation:snowflake_rotation_reverse 10s linear infinite}@-webkit-keyframes snowflake_rotation{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@keyframes snowflake_rotation{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@-webkit-keyframes snowflake_rotation_reverse{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(-1turn);transform:rotate(-1turn)}}@keyframes snowflake_rotation_reverse{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(-1turn);transform:rotate(-1turn)}}.snowflakes{pointer-events:none}.snowflakes_paused .snowflake,.snowflakes_paused .snowflake__inner,.snowflakes_paused .snowflake__inner:before{-webkit-animation-play-state:paused;animation-play-state:paused}.snowflakes_hidden{visibility:hidden}.snowflakes_body{height:1px;left:0;position:fixed;top:0;width:100%}';
    var imagesStyle = '';
    var Snowflakes = /** @class */ (function () {
        function Snowflakes(params) {
            var _this = this;
            this.destroyed = false;
            this.flakes = [];
            this.isBody = false;
            this.handleResize = function () {
                if (_this.params.autoResize) {
                    _this.resize();
                }
            };
            this.handleOrientationChange = function () {
                _this.resize();
            };
            this.params = this.setParams(params);
            this.isBody = isBody(this.params.container);
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
            if (this.containerSize.width === newWidth && this.containerSize.height === newHeight) {
                return;
            }
            this.containerSize.width = newWidth;
            this.containerSize.height = newHeight;
            var flakeParams = this.getFlakeParams();
            hideElement(this.container);
            this.flakes.forEach(function (flake) { return flake.resize(flakeParams); });
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
        Snowflakes.prototype.appendContainer = function () {
            var container = document.createElement('div');
            addClass(container, 'snowflakes');
            addClass(container, "snowflakes_gid_".concat(this.gid));
            this.isBody && addClass(container, 'snowflakes_body');
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
            var defaultParams = {
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
            Object.keys(defaultParams).forEach(function (name) {
                result[name] = typeof params[name] === 'undefined' ?
                    defaultParams[name] :
                    params[name];
            });
            return result;
        };
        Snowflakes.prototype.getAnimationStyle = function () {
            var fromY = '0px';
            var toY = (this.height() + this.params.maxSize * Math.sqrt(2)) + 'px';
            var gid = this.gid;
            var css = "@-webkit-keyframes snowflake_gid_".concat(gid, "_y{from{-webkit-transform:translateY(").concat(fromY, ")}to{-webkit-transform:translateY(").concat(toY, ");}}\n@keyframes snowflake_gid_").concat(gid, "_y{from{transform:translateY(").concat(fromY, ")}to{transform:translateY(").concat(toY, ")}}");
            for (var i = 0; i <= maxInnerSize; i++) {
                var left = calcSize(i, this.params.minSize, this.params.maxSize) + 'px';
                css += "@-webkit-keyframes snowflake_gid_".concat(gid, "_x_").concat(i, "{from{-webkit-transform:translateX(0px)}to{-webkit-transform:translateX(").concat(left, ");}}\n@keyframes snowflake_gid_").concat(gid, "_x_").concat(i, "{from{transform:translateX(0px)}to{transform:translateX(").concat(left, ")}}");
            }
            return css;
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
                (this.isBody ? getWindowWidth() : this.params.container.offsetWidth);
        };
        Snowflakes.prototype.height = function () {
            return this.params.height ||
                (this.isBody ? getWindowHeight() : this.params.container.offsetHeight + this.params.maxSize);
        };
        Snowflakes.instanceCounter = 0;
        Snowflakes.gid = 0;
        return Snowflakes;
    }());

    return Snowflakes;

}));
