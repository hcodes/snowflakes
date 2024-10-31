import Snowflakes from '../../../src/ts';
import { defaultParams } from '../../../src/ts/defaultParams';

import { updateCode } from './code';

import { bindRadioClick, getRadioValue, setRadioValue } from './utils/radio';
import { loadScript } from './utils/loadScript';

import './form.css';

declare global {
    interface Window {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Stats: any;
    }
}

export class Form {
    private stop = false;
    private hidden = false;
    private snowflakes?: Snowflakes;
    private params = {
        ...defaultParams,
    };

    private elems = {
        loadFps: document.querySelector('.form__load-fps') as HTMLButtonElement,
        area: document.querySelectorAll<HTMLInputElement>('.form__area'),
        backgroundColor: document.querySelectorAll<HTMLInputElement>('.form__background-color'),
        color: document.querySelector('.form__color') as HTMLInputElement,
        count: document.querySelector('.form__count') as HTMLInputElement,
        debug: document.querySelector('.form__debug') as HTMLInputElement,
        minOpacity: document.querySelector('.form__min-opacity') as HTMLInputElement,
        maxOpacity: document.querySelector('.form__max-opacity') as HTMLInputElement,
        minSize: document.querySelector('.form__min-size') as HTMLInputElement,
        maxSize: document.querySelector('.form__max-size') as HTMLInputElement,
        rotation: document.querySelector('.form__rotation') as HTMLInputElement,
        wind: document.querySelector('.form__wind') as HTMLInputElement,
        speed: document.querySelector('.form__speed') as HTMLInputElement,
        layer: document.querySelector('.form__layer') as HTMLDivElement,
        toggleHide: document.querySelector('.form__toggle-hide') as HTMLButtonElement,
        default: document.querySelector('.form__default') as HTMLButtonElement,
        stop: document.querySelector('.form__stop') as HTMLButtonElement,
        noSupport: document.querySelector('.no-support') as HTMLDivElement,
    };

    constructor() {
        if (Snowflakes.hasSupport && !Snowflakes.hasSupport()) {
            this.elems.noSupport.classList.add('no-support_visible');
        }

        this.elems.minOpacity.oninput = this.handleMinOpacity;
        this.elems.maxOpacity.oninput = this.handleMaxOpacity;

        this.elems.minSize.oninput = this.handleMinSize;
        this.elems.maxSize.oninput = this.handleMaxSize;

        this.elems.debug.onclick = this.handleDebug;
        this.elems.color.oninput = this.handleColor;
        this.elems.count.oninput = this.handleCount;
        this.elems.speed.oninput = this.handleSpeed;
        this.elems.rotation.onclick = this.handleRotation;
        this.elems.wind.onclick = this.handleWind;

        this.elems.default.onclick = this.handleDefault;
        this.elems.stop.onclick = this.handleStop;
        this.elems.toggleHide.onclick = this.handleToggleHide;
        this.elems.loadFps.onclick = this.handleLoadFps;

        bindRadioClick(this.elems.area, this.handleArea);
        bindRadioClick(this.elems.backgroundColor, this.handleBackgroundColor);

        this.handleDefault();

        setTimeout(() => {
            document.body.classList.add('animation');
        }, 10);
    }

    private updateSnowflakes() {
        const params = {
            ...this.params,
        };

        params.container = getRadioValue(this.elems.area) === 'fullscreen' ? document.body : this.elems.layer;

        if (this.snowflakes) {
            this.snowflakes.destroy();
        }

        this.snowflakes = new Snowflakes(params);

        updateCode(params);
    }

    private handleMinOpacity = () => {
        this.params.minOpacity = parseFloat(this.elems.minOpacity.value);
        this.updateSnowflakes();
    }

    private handleMaxOpacity = () => {
        this.params.maxOpacity = parseFloat(this.elems.maxOpacity.value);
        this.updateSnowflakes();
    }

    private handleMinSize = () => {
        this.params.minSize = parseInt(this.elems.minSize.value, 10);
        this.updateSnowflakes();
    }

    private handleMaxSize = () => {
        this.params.maxSize = parseInt(this.elems.maxSize.value, 10);
        this.updateSnowflakes();
    }

    private handleColor = () => {
        this.params.color = this.elems.color.value;
        this.updateSnowflakes();
    }

    private handleCount = () => {
        this.params.count = parseInt(this.elems.count.value, 10);
        this.updateSnowflakes();
    }

    private handleSpeed = () => {
        this.params.speed = parseFloat(this.elems.speed.value);
        this.updateSnowflakes();
    }

    private handleRotation = () => {
        this.params.rotation = this.elems.rotation.checked;
        this.updateSnowflakes();
    }

    private handleWind = () => {
        this.params.wind = this.elems.wind.checked;
        this.updateSnowflakes();
    }

    private handleDebug = () => {
        document.body.classList.toggle('debug', this.elems.debug.checked);
    }

    private handleBackgroundColor = () => {
        const backgroundColor = getRadioValue(this.elems.backgroundColor);
        document.body.classList.remove('body_bg_white', 'body_bg_black');
        document.body.classList.add('body_bg_' + backgroundColor);
    }

    private handleDefault = () => {
        setRadioValue(this.elems.area, 'fullscreen');
        this.handleArea();

        setRadioValue(this.elems.backgroundColor, 'black');
        this.handleBackgroundColor();

        this.elems.debug.checked = false;
        this.handleDebug();

        this.elems.minOpacity.value = String(defaultParams.minOpacity);
        this.elems.maxOpacity.value = String(defaultParams.maxOpacity);

        this.elems.minSize.value = String(defaultParams.minSize);
        this.elems.maxSize.value = String(defaultParams.maxSize);

        this.elems.speed.value = String(defaultParams.speed);
        this.elems.color.value = defaultParams.color;
        this.elems.count.value = String(defaultParams.count);
        this.elems.wind.checked = defaultParams.wind;
        this.elems.rotation.checked = defaultParams.rotation;

        this.params = {
            ...defaultParams,
        };

        this.updateSnowflakes();
    }

    private handleArea = () => {
        const area = getRadioValue(this.elems.area);
        this.elems.layer.classList.toggle('form__layer_visible', area === 'layer');
        this.updateSnowflakes();
    }

    private handleStop = () => {
        if (!this.snowflakes) {
            return;
        }

        this.stop = !this.stop;
        if (this.stop) {
            this.snowflakes.stop();
            this.elems.stop.value = 'Start';
        } else {
            this.snowflakes.start();
            this.elems.stop.value = 'Stop';
        }
    }

    private handleToggleHide = () => {
        if (!this.snowflakes) {
            return;
        }

        this.hidden = !this.hidden;
        if (this.hidden) {
            this.snowflakes.hide();
            this.elems.toggleHide.value = 'Show';
        } else {
            this.snowflakes.show();
            this.elems.toggleHide.value = 'Hide';
        }
    }

    private handleLoadFps = () => {
        this.elems.loadFps.disabled = true;
        loadScript('https://rawgit.com/mrdoob/stats.js/master/build/stats.min.js', () => {
            const stats = new window.Stats();
            document.body.appendChild(stats.dom);
            requestAnimationFrame(function loop() {
                stats.update();
                requestAnimationFrame(loop);
            });
        })
    }
};
