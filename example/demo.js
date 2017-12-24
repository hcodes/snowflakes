var App = {
    params: {
        bg: 'white',
        area: 'fullscreen',
        count: 50,
        speed: 1,
        useRotate: true,
        useScale: true,
        wind: true,
        stop: false
    },
    setStop: function() {
        var elem = document.querySelector('input[name="stop"]');
        if (this.params.stop) {
            this._snow.start();
            elem.value = 'Stop';
        } else {
            this._snow.stop();
            elem.value = 'Start';
        }

        this.params.stop = !this.params.stop;
    },
    loadFPS: function() {
        if (this._stats) {
            return;
        }

        var script = document.createElement('script');
        script.onload = function() {
            var stats = new window.Stats();
            this._stats = stats;
            document.body.appendChild(stats.dom);
            stats.dom.style.right = '0';
            requestAnimationFrame(function loop() {
                stats.update();
                requestAnimationFrame(loop);
            });
        };
        script.src = 'https://rawgit.com/mrdoob/stats.js/master/build/stats.min.js';
        document.head.appendChild(script);
    },
    setColor: function(value) {
        this.params.color = value;
        this.redraw();
    },
    setBg: function(value) {
        this.params.bg = value;
        this.updateSettings();
    },
    setWind: function(value) {
        this.params.wind = value;
        this.redraw();
    },
    setCount: function(value) {
        this.params.count = parseInt(value, 10);
        this.redraw();
    },
    setSpeed: function(value) {
        this.params.speed = parseFloat(value);
        this.redraw();
    },
    setArea: function(value) {
        this.params.container = value === 'fullscreen' ? document.body : document.querySelector('#layer');
        this.params.area = value;
        this.updateSettings();
        this.redraw();
    },
    setRotate: function(value) {
        this.params.useRotate = value;
        this.redraw();
    },
    setScale: function(value) {
        this.params.useScale = value;
        this.redraw();
    },
    updateSettings: function() {
        document.body.className = 'bg_' + this.params.bg + ' area_' + this.params.area;
    },
    redraw: function() {
        if (this._snow) {
            this._snow.destroy();
        }

        this._snow = new Snowflakes(this.params);
    },
    start: function() {
        this.updateSettings();
        this.redraw();
    }
};

App.start();
