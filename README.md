❄️☃️🎄 [Falling snowflakes](https://hcodes.github.io/snowflakes/examples/constructor)
==================
[![NPM version](https://img.shields.io/npm/v/magic-snowflakes.svg)](https://www.npmjs.com/package/magic-snowflakes)
[![NPM Downloads](https://img.shields.io/npm/dm/magic-snowflakes.svg?style=flat)](https://www.npmjs.org/package/magic-snowflakes)
[![install size](https://packagephobia.com/badge?p=magic-snowflakes)](https://packagephobia.com/result?p=magic-snowflakes)

<img width="600" src="https://hcodes.github.io/snowflakes/docs/assets/flakes.png" alt="Falling snowflakes" />

## Details

- Only one JavaScript file
- CSS animations
- Responsive layout
- Flexible settings

## [Examples](https://hcodes.github.io/snowflakes/examples/constructor)

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

### Color with CSS

Snowflakes use SVG masks filled with `currentColor`. The `color` option sets
the container's CSS color (default: `#5ECDEF`). Override individual snowflakes
in your stylesheet:

```css
.snowflake {
    color: white;
}

.snowflake:nth-child(3n) {
    color: #ff69b4;
}
```

You can also pass a CSS variable as the color. Updating the variable recolors
existing snowflakes without recreating the instance:

```css
:root {
    --snow-color: #5ECDEF;
}
```

```js
new Snowflakes({ color: 'var(--snow-color)' });
```

Use `color: 'inherit'` to inherit the color of your custom container.

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

### .setParams(params)

Apply any subset of the constructor options to the existing instance:

```js
snowflakes.setParams({ color: '#fff', speed: 2, count: 100 });
```

Omitted options and `undefined` values keep their current settings; they are not
reset to constructor defaults. Values such as `0` and `false` are applied normally.
Invalid numbers fall back to current settings. If only one size or opacity bound
is supplied, it is clamped against the unchanged opposite bound. If both bounds
are supplied, an inverted pair is swapped as in the constructor.
Hidden and paused states are preserved unless `stop` is explicitly provided.

Color, opacity, speed, wind, rotation, shapes, `zIndex`, `autoResize` and `stop`
updates preserve existing flakes. Dimension and parent container changes reuse
the flakes and update the animation geometry. Changing `count` adds or removes
only the difference, leaving retained flakes in place. Removal selects flakes
randomly regardless of size; newly added flakes are inserted in size order.
Speed and height changes recalculate falling duration and delay using each
flake's original random delay factor.

Only changes to `minSize` or `maxSize` recreate all flakes, redistributing their
sizes and stacking order and restarting their animation. The instance and its
container element are reused. Unchanged settings do not recreate flakes.
Calls after `destroy()` have no effect.

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

Source files are grouped by responsibility:

- `src/index.ts` exposes the public API; `src/index.auto.ts` is the automatic startup entry point.
- `src/core/` contains the main class, individual flakes, options, defaults and normalization.
- `src/animation/` contains calculations and keyframes.
- `src/utils/` contains shared DOM and math helpers.
- `src/styles/` contains stylesheet management and CSS; `src/assets/snowflakes/` contains SVG masks.
- `examples/constructor/src/` contains the playground and code preview.
- `tests/unit/`, `tests/integration/` and `tests/types/` contain the existing test suites.
- `scripts/inject-styles.mjs` injects the built CSS; `docs/assets/` contains documentation images.

Build output keeps its existing paths: `dist/snowflakes*.js`, `dist/index.d.ts`,
`dist/main.css`, `dist/types.css` and `examples/constructor/dist/index.{js,css}`.
Previously published declaration paths remain available through compatibility re-exports.
Example URLs, including `examples/constructor/`, remain unchanged.

| Command | Purpose |
| --- | --- |
| `npm run build:lib` | Clean and build the library, declarations, CSS and minified bundles in `dist/` |
| `npm run build:examples` | Clean and build the constructor in `examples/constructor/dist/` |
| `npm run build` | Build the library, then the examples |
| `npm run typecheck:lib` | Check library types independently of the constructor |
| `npm run typecheck:examples` | Check constructor types and its imported library sources |
| `npm test` | Run ESLint, all type checks and the existing Jest suites |
| `npm run test:build` | Verify independent builds and packaging in temporary project copies |

Both builds work from a clean checkout with dependencies installed. The library
build does not read constructor sources or output. The examples build processes
library CSS from source and does not require or modify `dist/`.

`tsconfig.base.json` contains shared compiler settings. `tsconfig.json` and
`rollup.config.mjs` cover the library; `examples/constructor/tsconfig.json` and
`rollup.examples.config.mjs` cover the constructor. The `prepare` lifecycle used
by installation and packaging runs `build:lib`; CI and Pages build examples
explicitly. The lower-level `make`, `make:ts`, `make:css` and `inject:css` commands
operate on the library.

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
