var App = {
    params: {
        size: 'fullscreen',
        bg: 'white',
        count: 50,
        speed: 1,
        useRotate: true,
        useScale: true
    },
    setPause: function(value) {
        if (value) {
            this._snow.stop();
        } else {
            this._snow.start();
        }
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
    setBg: function(value) {
        this.params.bg = value;
        this.updateSettings();
    },
    setCount: function(value) {
        this.params.count = parseInt(value, 10);
        this.redraw();
    },
    setSpeed: function(value) {
        this.params.speed = parseFloat(value);
        this.redraw();
    },
    setSize: function(value) {
        this.params.size = value;
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
        document.body.className = 'bg_' + this.params.bg + ' size_' + this.params.size;
    },
    redraw: function() {
        if (this._snow) {
            this._snow.destroy();
        }

        this._snow = new Snowflakes({
            container: this.params.size === 'fullscreen' ? document.body : document.getElementById('layer'),
            count: this.params.count,
            speed: this.params.speed,
            useRotate: this.params.useRotate,
            useScale: this.params.useScale
        });
    },
    start: function() {
        this.updateSettings();
        this.redraw();
    }
};

App.start();
