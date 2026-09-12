❄️☃️🎄 [Falling snowflakes](https://hcodes.github.io/demo-snowflakes/)
==================
[![NPM version](https://img.shields.io/npm/v/magic-snowflakes.svg)](https://www.npmjs.com/package/magic-snowflakes)
[![NPM Downloads](https://img.shields.io/npm/dm/magic-snowflakes.svg?style=flat)](https://www.npmjs.org/package/magic-snowflakes)
[![install size](https://packagephobia.com/badge?p=magic-snowflakes)](https://packagephobia.com/result?p=magic-snowflakes)

<img width="600" src="./img/flakes.png" alt="Falling snowflakes" />

## Details

- Only one JavaScript file
- CSS animations
- Responsive layout
- Flexible settings

## [Examples](https://hcodes.github.io/demo-snowflakes/)

- 🔍 [Constructor](https://hcodes.github.io/snowflakes/examples/constructor): change settings and copy code for your site
- 🎲 [3D Cube](https://hcodes.github.io/snowflakes/examples/3d_cube.html)
- ❄ [Simple](https://hcodes.github.io/snowflakes/examples/simple.html)
- 🎨 [Multicolor](https://hcodes.github.io/snowflakes/examples/multicolor.html)
- 🐘 [Big](https://hcodes.github.io/snowflakes/examples/big.html)
- 🍋 [Blend mode](https://hcodes.github.io/snowflakes/examples/blend_mode.html)
- 🪟 [Layer](https://hcodes.github.io/snowflakes/examples/layer.html)
- 🏠 [Some layers](https://hcodes.github.io/snowflakes/examples/some_layers.html)
- 💛 [Own kind](https://hcodes.github.io/snowflakes/examples/balls.html)
- 🗻 [Own z-index](https://hcodes.github.io/snowflakes/examples/z-index.html)

[See details](https://github.com/hcodes/snowflakes/tree/master/examples)

## Usage

```sh
npm install magic-snowflakes
```

### Without settings

Paste anywhere in your page's HTML:

```html
<script src="https://unpkg.com/magic-snowflakes/dist/snowflakes.auto.min.js"></script>
```

### With settings

```html
<html>
<body>
    ...
    <script src="https://unpkg.com/magic-snowflakes/dist/snowflakes.min.js"></script>
    <script>
        new Snowflakes({
            wind: false,
            rotation: false
        });
    </script>
</body>
</html>
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
            zIndex: 100, // Default: 9999
            autoResize: true // Default: true
        });
    </script>
</body>
</html>
```

### TypeScript or ES modules

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

## API

```js
import Snowflakes from 'magic-snowflakes';
const snowflakes = new Snowflakes();
```

### .start()

Start or resume the animation.

### .stop()

Pause the animation.

### .show()

Show snowflakes.

### .hide()

Hide snowflakes.

### .resize()

Update the animation for the current container size.

### .destroy()

Remove the snowflakes and release the instance's resources.

## Different Builds

The `dist/` directory of [the npm package](https://unpkg.com/magic-snowflakes/dist/) contains the following builds:

|Type                   |Filename                 |Description         |
|-----------------------|-------------------------|--------------------|
|Full (UMD)             |`snowflakes.js`          |                    |
|Full (UMD, production) |`snowflakes.min.js`      |                    |
|Full auto              |`snowflakes.auto.js`     | Without API        |
|Full auto (production) |`snowflakes.auto.min.js` | Without API        |
|ES module             |`snowflakes.esm.js`      |                    |
|Light (UMD)            |`snowflakes.light.js`    | Without SVG images |
|Light (UMD, production)|`snowflakes.light.min.js`| Without SVG images |


## Development

```sh
git clone git@github.com:hcodes/snowflakes.git ./snowflakes
cd ./snowflakes

npm i
npm run build
npm test

open ./examples/
```

## [License](LICENSE)

MIT License


## Friends

- [Check device online](https://checkdevice.online/?from=github-snowflakes)
