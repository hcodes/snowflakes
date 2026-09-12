import { getDefaultOptions, normalizeOptions, normalizeUpdatedOptions } from './options';
import { getAnimationStyle } from '../animation/keyframes';
import { SnowflakesStyles } from '../styles/stylesheet-manager';
import { Flake, FlakeParams }  from './flake';
import { randomInt } from '../utils/math';
import {
    setStyle,
    showElement,
    hideElement,
    removeNode,
    addClass,
    removeClass,
} from '../utils/dom';
import type { NormalizedSnowflakesOptions, SnowflakesParams } from './options';

export interface ContainerSize {
    width: number;
    height: number;
}

export default class Snowflakes {
    private container: HTMLElement;
    private destroyed = false;
    private flakes: Flake[] = [];
    private params: NormalizedSnowflakesOptions;

    private styles: SnowflakesStyles;

    private containerSize: ContainerSize;
    private gid: number;

    static gid = 0;
    static instanceCounter = 0;

    static hasSupport() {
        return Boolean('onanimationend' in document);
    }

    static get defaultParams() {
        return getDefaultOptions();
    }

    constructor(params?: SnowflakesParams) {
        this.params = normalizeOptions(params, getDefaultOptions());

        Snowflakes.gid++;
        this.gid = Snowflakes.gid;

        this.container = this.appendContainer();

        if (this.params.stop) {
            this.stop();
        }

        this.styles = new SnowflakesStyles(this.gid, this.getAnimationStyle());
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
     * Apply partial settings to the existing instance.
     */
    public setParams(params: SnowflakesParams) {
        if (this.destroyed) {
            return;
        }

        const previous = this.params;
        const next = normalizeUpdatedOptions(params, previous);
        const previousFlakeParams = this.getFlakeParams(this.containerSize.height);
        const rebuildFlakes = next.minSize !== previous.minSize || next.maxSize !== previous.maxSize;
        this.params = next;

        if (next.container !== previous.container) {
            next.container.appendChild(this.container);
            this.container.classList.toggle('snowflakes_body', this.isBody());
        }
        if (next.color !== previous.color) {
            setStyle(this.container, { color: next.color });
        }
        if (next.zIndex !== previous.zIndex) {
            setStyle(this.container, { zIndex: String(next.zIndex) });
        }
        if (params.stop !== undefined) {
            if (next.stop) {
                this.stop();
            } else {
                this.start();
            }
        }

        const updateGeometry = rebuildFlakes || next.container !== previous.container || next.height !== previous.height;
        const height = updateGeometry ? this.height() : this.containerSize.height;
        const flakeParams = this.getFlakeParams(height);
        if (updateGeometry) {
            this.styles.updateAnimation(this.getAnimationStyle(height));
        }

        if (rebuildFlakes) {
            this.flakes.forEach(flake => flake.destroy());
            this.flakes = [];
        } else {
            this.removeExcessFlakes();
            this.flakes.forEach(flake => flake.setParams(flakeParams, previousFlakeParams));
        }
        if (this.flakes.length < next.count) {
            this.appendFlakes(flakeParams);
        }
        if (next.container !== previous.container || next.width !== previous.width) {
            this.containerSize.width = this.width();
        }
        this.containerSize.height = height;
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

        setStyle(container, {
            zIndex: String(this.params.zIndex),
            color: this.params.color,
        });

        this.params.container.appendChild(container);

        return container;
    }

    private getFlakeParams(height = this.height()): FlakeParams {
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

    private removeExcessFlakes() {
        const total = this.flakes.length;
        let remaining = total - this.params.count;
        if (remaining <= 0) {
            return;
        }

        // Sample without replacement, preserving the size order of retained flakes.
        this.flakes = this.flakes.filter((flake, index) => {
            if (randomInt(0, total - index) < remaining) {
                remaining--;
                flake.destroy();
                return false;
            }
            return true;
        });
    }

    private appendFlakes(flakeParams = this.getFlakeParams()) {
        const newFlakes = new Set<Flake>();

        for (let i = this.flakes.length; i < this.params.count; i++) {
            const flake = new Flake(flakeParams);
            newFlakes.add(flake);
            this.flakes.push(flake);
        }

        this.flakes.sort((a, b) => a.size - b.size); // For correct z-index
        // Insert only new nodes so existing animations are not restarted by reparenting.
        for (let i = this.flakes.length - 1; i >= 0; i--) {
            const flake = this.flakes[i];
            if (newFlakes.has(flake)) {
                flake.appendTo(this.container, this.flakes[i + 1]);
            }
        }
    }

    private getAnimationStyle(height = this.height()) {
        return getAnimationStyle(this.gid, this.isBody(), height, this.params.minSize, this.params.maxSize);
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
