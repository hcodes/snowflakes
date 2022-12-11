## v6.1.0
+ Add `autoResize` param.

## v6.0.1
Fix: Resize container for snowflakes only if necessary #51.

## v6.0.0
+ Fixes for TypeScript typings.
+ Added show/hide methods.

**BREAKING CHANGES:**

Before:
```js
Snowflakes();
// or
new Snowflakes();
```
After:
```js
new Snowflakes();
```

## v5.0.0
+ Code rewritten on TypeScript.
+ Added TypeScript typings.
+ Support for es6 modules.

## v4.2.0
+ Slowed down rotation of snowflakes, changed default some properties #20.
+ Separate styles for multiple instances #29.
+ Removed z-index for every snowflake, only common z-index for container of snowflakes #27.
+ Updated dev deps.

## v4.1.5
+ Updated dev deps.

## v4.1.4
+ Code refactoring.
+ Update dev deps in package.json.

## v4.1.3
+ Fix color #25.
+ Update dev deps in package.json.

## v4.1.2
+ Update dev deps in package.json.

## v4.1.1
+ Fixed Safari scroll problem #21.

## v4.1.0
+ Added CSS `user-select: none` and `pointer-events: none` for snowflakes.

## v4.0.2
+ Updated dev deps in package.json.

## v4.0.1
+ Updated dev deps in package.json.

## v4.0.0
+ Added `minSize` and `maxSize` properties. You can set the size of snowflakes. [Example](https://hcodes.github.io/snowflakes/examples/big.html).
+ Added `minOpacity` and `maxOpacity` properties.
+ Removed `useScale` property.
+ `useRotate` property renamed to `rotation`.
+ Added light version without SVG images: `dist/snowflakes.light.js` and `dist/snowflakes.light.min.js`. You can set your own kind of snowflakes. [Example](https://hcodes.github.io/snowflakes/examples/balls.html).

## v3.1.0
+ `demo.html` moved to `https://github.com/hcodes/demo-snowflakes`
+ `example/` → `examples/`
+ Added new examples
+ Small refactoring

## v3.0.0
+ Now snowflakes in SVG format.
+ You can change the color of snowflakes. The property `color: "red"`. Default: `"#5ECDEF"`.
+ Snowflakes can fly without wind. The property `wind: false`. Default: `true`.

## v2.2.1
Fixed Babel dependencies #10.

## v2.2.0
Removed `dist/`.

## v2.1.1
- Small fix for server side #7.

## v2.1.0
- Added examples.
- Fixes for constructor.

## v2.0.1
Removed console.log.

## v2.0.0
- CSS optimization.
- Added Gulp and Rollup with Babel.

## v1.0.0
First public release.
