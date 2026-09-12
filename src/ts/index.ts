import { getDefaultParams } from './getDefaultParams';
import { normalizeParams } from './normalizeParams';
import { getAnimationStyle } from './calculations';
import { SnowflakesStyles } from './styles';
import { Flake, FlakeParams }  from './flake';
import {
    setStyle,
    showElement,
    hideElement,
    removeNode,
    addClass,
    removeClass,
} from './helpers/dom';
import { ContainerSize, SnowflakesInnerParams, SnowflakesParams } from './types';
export { SnowflakesParams } from './types';

export default class Snowflakes {
    private container: HTMLElement;
    private destroyed = false;
    private flakes: Flake[] = [];
    private params: SnowflakesInnerParams;

    private styles: SnowflakesStyles;

    private containerSize: ContainerSize;
    private gid: number;

    static gid = 0;
    static instanceCounter = 0;

    static hasSupport() {
        return Boolean('onanimationend' in document);
    }

    static get defaultParams() {
        return getDefaultParams();
    }

    constructor(params?: SnowflakesParams) {
        this.params = normalizeParams(params, getDefaultParams());

        Snowflakes.gid++;
        this.gid = Snowflakes.gid;

        this.container = this.appendContainer();

        if (this.params.stop) {
            this.stop();
        }

        this.styles = new SnowflakesStyles(this.gid, this.params.color, this.getAnimationStyle());
        Snowflakes.instanceCounter++;
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
        if (this.destroyed) {
            return;
        }

        const newWidth = this.width();
        const newHeight = this.height();

        if (newHeight === this.containerSize.height) {
            return;
        }

        this.containerSize.width = newWidth;
        this.containerSize.height = newHeight;

        const flakeParams = this.getFlakeParams();
        this.flakes.forEach(flake => flake.resize(flakeParams));

        if (this.isBody()) {
            return;
        }

        hideElement(this.container);
        this.styles.updateAnimation(this.getAnimationStyle());
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

        this.styles.destroy();

        removeNode(this.container);

        this.flakes.forEach(flake => flake.destroy());
        this.flakes = [];

        window.removeEventListener('resize', this.handleResize, false);

        if (screen.orientation && screen.orientation.removeEventListener) {
            screen.orientation.removeEventListener('change', this.handleOrientationChange, false);
        }
    }

    private isBody() {
        return this.params.container === document.body;
    }

    private handleResize = () => {
        if (this.params.autoResize) {
            this.resize();
        }
    }

    private handleOrientationChange = () => {
        this.handleResize();
    }

    private appendContainer() {
        const container = document.createElement('div');

        addClass(
            container,
            'snowflakes',
            `snowflakes_gid_${this.gid}`,
            this.isBody() ? 'snowflakes_body' : '',
        );

        setStyle(container, { zIndex: String(this.params.zIndex) });

        this.params.container.appendChild(container);

        return container;
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

    private getAnimationStyle() {
        return getAnimationStyle(this.gid, this.isBody(), this.height(), this.params.minSize, this.params.maxSize);
    }

    private width() {
        return this.params.width ||
            (this.isBody() ? window.innerWidth : this.params.container.offsetWidth);
    }

    private height() {
        return this.params.height ||
            (this.isBody() ? window.innerHeight : this.params.container.offsetHeight + this.params.maxSize);
    }
}
