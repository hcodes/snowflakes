import { Flake, maxInnerSize, calcSize, FlakeParams }  from './flake';
import {
    isBody,
    setStyle,
    showElement,
    hideElement,
    getWindowHeight,
    injectStyle,
    removeNode,
    addClass,
    removeClass,
    getWindowWidth
} from './helpers/dom';

const mainStyle = '{MAIN_STYLE}';
const imagesStyle = '{IMAGES_STYLE}';

type SnowflakesRawParams = Partial<SnowflakesParams>;

export interface SnowflakesParams extends Record<string, boolean | HTMLElement | number | string | undefined> {
    container: HTMLElement; // Default: document.body
    count: number; // Default: 50
    color: string; // Default: "#5ECDEF"
    minOpacity: number; // Default: 0.6
    maxOpacity: number; // Default: 1
    minSize: number; // Default: 10
    maxSize: number; // Default: 25
    rotation: boolean; // Default: true
    speed: number; // Default: 1
    stop: boolean; // Default: false
    types: number; // Default: 6
    width?: number; // Default: width of container
    height?: number; // Default: height of container
    wind: boolean; // Default: true
    zIndex: number; // Default: 9999,
    autoResize: boolean; // Default: true
}

interface ContainerSize {
    width: number;
    height: number;
}

export default class Snowflakes {
    private container: HTMLElement;
    private destroyed = false;
    private flakes: Flake[] = [];
    private isBody = false;
    private gid: number;
    private params: SnowflakesParams;

    private animationStyleNode?: HTMLStyleElement;
    private imagesStyleNode?: HTMLStyleElement;
    private mainStyleNode?: HTMLStyleElement;
    private containerSize: ContainerSize;
    static instanceCounter = 0;
    static gid = 0;

    constructor(params?: SnowflakesRawParams) {
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
    public start() {
        removeClass(this.container, 'snowflakes_paused');
    }

    /**
     * Stop CSS animation.
     */
    public stop() {
        addClass(this.container, 'snowflakes_paused');
    }

    /**
     * Show snowflakes.
     */
    public show() {
        removeClass(this.container, 'snowflakes_hidden');
    }

    /**
     * Hide snowflakes.
     */
     public hide() {
        addClass(this.container, 'snowflakes_hidden');
    }

    /**
     * Resize snowflakes.
     */
     public resize() {
        const newWidth = this.width();
        const newHeight = this.height();

        if (newHeight === this.containerSize.height) {
            return;
        }

        this.containerSize.width = newWidth;
        this.containerSize.height = newHeight;

        const flakeParams = this.getFlakeParams();
        this.flakes.forEach(flake => flake.resize(flakeParams));

        if (this.isBody) {
            return;
        }

        hideElement(this.container);
        this.updateAnimationStyle();
        showElement(this.container);
    }

    /**
     * Destroy instance.
     */
     public destroy() {
        if (this.destroyed) {
            return;
        }

        this.destroyed = true;

        if (Snowflakes.instanceCounter) {
            Snowflakes.instanceCounter--;
         }

        this.removeStyles();

        removeNode(this.container);

        this.flakes.forEach(flake => flake.destroy());
        this.flakes = [];

        window.removeEventListener('resize', this.handleResize, false);

        if (screen.orientation && screen.orientation.removeEventListener) {
            screen.orientation.removeEventListener('change', this.handleOrientationChange, false);
        }
    }

    private handleResize = () => {
        if (this.params.autoResize) {
            this.resize();
        }
    }

    private handleOrientationChange = () => {
        this.resize();
    }

    private appendContainer() {
        const container = document.createElement('div');

        addClass(container, 'snowflakes');
        addClass(container, `snowflakes_gid_${this.gid}`);
        this.isBody && addClass(container, 'snowflakes_body');
        setStyle(container, { zIndex: String(this.params.zIndex) });

        this.params.container.appendChild(container);

        return container;
    }

    private appendStyles() {
        if (!Snowflakes.instanceCounter) {
            this.mainStyleNode = this.injectStyle(mainStyle);
        }
        Snowflakes.instanceCounter++;

        this.imagesStyleNode = this.injectStyle(imagesStyle.replace(/:color:/g, encodeURIComponent(this.params.color)));
        this.animationStyleNode = this.injectStyle(this.getAnimationStyle());
    }

    private injectStyle(style: string, container?: HTMLStyleElement) {
        return injectStyle(style.replace(/_gid_value/g, `_gid_${this.gid}`), container);
    }

    private getFlakeParams(): FlakeParams {
        const height = this.height();
        const params = this.params;

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
    }

    private appendFlakes() {
        const flakeParams = this.getFlakeParams();

        this.flakes = [];
        for (let i = 0; i < this.params.count; i++) {
            this.flakes.push(new Flake(flakeParams));
        }

        this.flakes
            .sort((a, b) => a.size - b.size) // For correct z-index
            .forEach(flake => {
                flake.appendTo(this.container);
            });
    }

    private setParams(rawParams?: SnowflakesRawParams) {
        const params = rawParams || {};

        const result = {} as SnowflakesParams;

        const defaultParams: SnowflakesParams = {
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

        Object.keys(defaultParams).forEach(name => {
            result[name] = typeof params[name] === 'undefined' ?
                defaultParams[name] :
                params[name];
        });

        return result;
    }

    private getAnimationStyle() {
        const fromY = '0px';
        const maxSize = this.params.maxSize * Math.sqrt(2);
        const toY = this.isBody ? `calc(100vh + ${maxSize}px)` : `${this.height() + maxSize}px`;
        const gid = this.gid;

        let css = `@-webkit-keyframes snowflake_gid_${gid}_y{from{-webkit-transform:translateY(${fromY})}to{-webkit-transform:translateY(${toY});}}
@keyframes snowflake_gid_${gid}_y{from{transform:translateY(${fromY})}to{transform:translateY(${toY});}}`;

        for (let i = 0; i <= maxInnerSize; i++) {
            const left = calcSize(i, this.params.minSize, this.params.maxSize) + 'px';
            css += `@-webkit-keyframes snowflake_gid_${gid}_x_${i}{from{-webkit-transform:translateX(0px)}to{-webkit-transform:translateX(${left});}}
@keyframes snowflake_gid_${gid}_x_${i}{from{transform:translateX(0px)}to{transform:translateX(${left})}}`;
        }

        return css;
    }

    private updateAnimationStyle() {
        this.injectStyle(this.getAnimationStyle(), this.animationStyleNode);
    }

    private removeStyles() {
        if (!Snowflakes.instanceCounter) {
            removeNode(this.mainStyleNode);
            delete this.mainStyleNode;
        }

        removeNode(this.imagesStyleNode);
        delete this.imagesStyleNode;

        removeNode(this.animationStyleNode);
        delete this.animationStyleNode;
    }

    private width() {
        return this.params.width ||
            (this.isBody ? getWindowWidth() : this.params.container.offsetWidth);
    }

    private height() {
        return this.params.height ||
            (this.isBody ? getWindowHeight() : this.params.container.offsetHeight + this.params.maxSize);
    }
}
