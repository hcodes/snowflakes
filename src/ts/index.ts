import { defaultParams } from './defaultParams';
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
    getWindowWidth,
    animationPrefix,
    transformPrefix
} from './helpers/dom';
import { ContainerSize, SnowflakesInnerParams, SnowflakesParams } from './types';
export { SnowflakesParams } from './types';

const mainStyle = '{MAIN_STYLE}';
const imagesStyle = '{IMAGES_STYLE}';

export default class Snowflakes {
    private container: HTMLElement;
    private destroyed = false;
    private flakes: Flake[] = [];
    private isBody = false;
    private params: SnowflakesInnerParams;

    private animationStyleNode?: HTMLStyleElement;
    private imagesStyleNode?: HTMLStyleElement;
    private mainStyleNode?: HTMLStyleElement;

    private containerSize: ContainerSize;
    private gid: number;

    static gid = 0;
    static instanceCounter = 0;

    static hasSupport() {
        return Boolean(document.documentElement.classList);
    }

    constructor(params?: SnowflakesParams) {
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

        addClass(
            container,
            'snowflakes',
            `snowflakes_gid_${this.gid}`,
            this.isBody ? 'snowflakes_body' : '',
        );

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

    private setParams(rawParams?: SnowflakesParams) {
        const params = rawParams || {};

        const result = {} as SnowflakesInnerParams;

        Object.keys(defaultParams).forEach(name => {
            result[name] = typeof params[name] === 'undefined' ?
                defaultParams[name] :
                params[name];
        });

        return result;
    }

    private getAnimationStyle() {
        const fromY = '0px';
        const maxSize = Math.ceil(this.params.maxSize * Math.sqrt(2));
        const toY = this.isBody ? `calc(100vh + ${maxSize}px)` : `${this.height() + maxSize}px`;
        const gid = this.gid;

        const cssText = [`@${animationPrefix}keyframes snowflake_gid_${gid}_y{from{${transformPrefix}transform:translateY(${fromY})}to{${transformPrefix}transform:translateY(${toY})}}`];
        for (let i = 0; i <= maxInnerSize; i++) {
            const left = calcSize(i, this.params.minSize, this.params.maxSize) + 'px';
            cssText.push(`@${animationPrefix}keyframes snowflake_gid_${gid}_x_${i}{from{${transformPrefix}transform:translateX(0px)}to{${transformPrefix}transform:translateX(${left})}}`);
        }

        return cssText.join('\n');
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
