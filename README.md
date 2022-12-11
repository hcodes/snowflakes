❄️ [Falling snowflakes](https://hcodes.github.io/demo-snowflakes/)
==================
[![NPM version](https://img.shields.io/npm/v/magic-snowflakes.svg)](https://www.npmjs.com/package/magic-snowflakes)
[![NPM Downloads](https://img.shields.io/npm/dm/magic-snowflakes.svg?style=flat)](https://www.npmjs.org/package/magic-snowflakes)
[![Bundlephobia](https://badgen.net/bundlephobia/minzip/magic-snowflakes)](https://bundlephobia.com/result?p=magic-snowflakes)
[![install size](https://packagephobia.com/badge?p=magic-snowflakes)](https://packagephobia.com/result?p=magic-snowflakes)
[![magic-snowflakes](https://snyk.io/advisor/npm-package/magic-snowflakes/badge.svg)](https://snyk.io/advisor/npm-package/magic-snowflakes)


## Details
- Only one JavaScript file
- CSS Animation
- Rubber design
- Flexible settings

## Examples
- [Demo](https://hcodes.github.io/demo-snowflakes/)
- [Simple](https://hcodes.github.io/snowflakes/examples/simple.html)
- [Big](https://hcodes.github.io/snowflakes/examples/big.html)
- [Increased speed](https://hcodes.github.io/snowflakes/examples/increased_speed.html)
- [Layer](https://hcodes.github.io/snowflakes/examples/layer.html)
- [Some layers](https://hcodes.github.io/snowflakes/examples/some_layers.html)
- [Own color](https://hcodes.github.io/snowflakes/examples/color.html)
- [Own kind](https://hcodes.github.io/snowflakes/examples/balls.html)
- [Own z-index](https://hcodes.github.io/snowflakes/examples/z-index.html)
- [start() and stop()](https://hcodes.github.io/snowflakes/examples/start_stop.html)
- [Without wind](https://hcodes.github.io/snowflakes/examples/without_wind.html)

[See details](https://github.com/hcodes/snowflakes/tree/master/examples)

## Using

```
npm i magic-snowflakes --save-dev
```

### Without settings
```html
<html>
<body>
    ...
    <script src="https://unpkg.com/magic-snowflakes/dist/snowflakes.min.js"></script>
    <script>
        new Snowflakes();
    </script>
</body>
</html>
```

or

```js
import Snowflakes from 'magic-snowflakes';
const snowflakes = new Snowflakes();
// ...
snowflakes.stop();
// ...
snowflakes.start();
// ...
snowflakes.destroy();
```

### Advanced settings
```html
<html>
<head>
<style>
    #snowflakes-container {
        width: 500px;
        height: 500px;
        position: relative;
        overflow: hidden;
    }
</style>
</head>
<body>
    <div id="snowflakes-container"></div>
    <script src="https://unpkg.com/magic-snowflakes/dist/snowflakes.min.js"></script>
    <script>
        var snowflakes = new Snowflakes({
            color: '#f00', // Default: "#5ECDEF"
            container: document.querySelector('#snowflakes-container'), // Default: document.body
            count: 100, // 100 snowflakes. Default: 50
            minOpacity: 0.1, // From 0 to 1. Default: 0.6
            maxOpacity: 0.95, // From 0 to 1. Default: 1
            minSize: 20, // Default: 10
            maxSize: 50, // Default: 25
            rotation: true, // Default: true
            speed: 2, // The property affects the speed of falling. Default: 1
            wind: false, // Without wind. Default: true
            width: 500, // Default: width of container
            height: 250, // Default: height of container
            zIndex: 100, // Default: 9999,
            autoResize: true // Default: true
        });
    </script>
</body>
</html>
```

## API

```js
import Snowflakes from 'magic-snowflakes';
const snowflakes = new Snowflakes();
```

### .start()
Start CSS Animation.

### .stop()
Stop CSS Animation.

### .show()
Show snowflakes.

### .hide()
Hide snowflakes.

### .resize()
Resize snowflakes.

### .destroy()
Destroy the instance of snowflakes.

## Different Builds
In the `dist/` directory of [the NPM package](https://unpkg.com/magic-snowflakes/dist/) you will find many different builds of snowflakes.js.

|Type                   |Filename                 |Description       |
|-----------------------|-------------------------|------------------|
|Full (UMD)             |`snowflakes.js`          |                  |
|Full (UMD, production) |`snowflakes.min.js`      |                  |
|ES6                    |`snowflakes.esm.js`      |                  |
|Light (UMD)            |`snowflakes.light.js`    |Without SVG images|
|Light (UMD, production)|`snowflakes.light.min.js`|Without SVG images|


## Development
```
git clone git@github.com:hcodes/snowflakes.git ./snowflakes
cd ./snowflakes

npm i
npm run build
npm test

open ./examples/
```

## [License](LICENSE)
MIT License
