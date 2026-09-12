## 7.1.0

### Code fixes

+ Fixed animation duration and opacity when `minSize` equals `maxSize`.
+ Fixed shared styles leaking when the first instance is destroyed before the last remaining instance.
+ Fixed SVG mask selectors to match containers when shape styles are shared across instances.
+ Fixed auto initialization when the script is loaded in `<head>` before the document body exists.
+ Preserved Stop and Hide states when changing constructor settings.
+ Fixed orientation changes ignoring `autoResize: false` and made `resize()` a no-op after `destroy()`.
+ Tightened public option types to reject misspelled properties and removed the unsafe cast when assembling normalized settings.
+ Normalized invalid numeric options using defaults, clamped numeric ranges, and reordered reversed minimum/maximum bounds.

### Added features

+ Added `setParams(params)` for partial runtime settings updates, preserving omitted options and paused/hidden states unless `stop` is explicitly supplied. Existing flakes are updated in place, count changes add or remove only the difference, and only size range changes recreate all flakes.
+ Updated the constructor playground to apply settings through `setParams()` without recreating the instance.
+ Switched snowflakes to SVG masks with `mask-image` and `currentColor`, allowing CSS color overrides and live CSS variable updates while preserving the `color` option.

### Infrastructure changes

+ Reorganized library sources into entry points, core modules, animation, styles, assets and utilities; moved existing tests and constructor sources while preserving package paths and public example URLs.
+ Separated stylesheet ownership and pure animation calculations from DOM operations.
+ Added independent `build:lib` and `build:examples` commands, with `build` running both in sequence. Library packaging no longer depends on the constructor.
+ Split library and constructor Rollup and TypeScript configurations, sharing compiler defaults through `tsconfig.base.json` and retaining output-specific settings in Rollup.
+ Separated CSS injection targets so the constructor can build directly from source without prebuilt library artifacts.
+ Added build isolation tests for missing or broken constructor sources, clean packaging and independent example output.
+ Switched PostCSS configuration to ES modules and shared plugins explicitly with Rollup.
+ Migrated unit tests to Jest and TypeScript, using jsdom for stylesheet lifecycle tests.
+ Updated development dependencies and fixed PostCSS plugin loading and CSS import declarations for TypeScript 6; retained ES5 output with the deprecation compatibility setting.
+ Removed generated library and constructor bundles from Git; build outputs are now ignored.
+ Updated GitHub Actions and configured workflows to use the current Node.js LTS release.
+ Added GitHub Pages deployment and npm package artifacts; removed the CodeQL workflow.
+ Fixed lint failure reporting in `npm test` and included separate library and constructor type checks.

## v7.0.1
+ Small fix for Next.js 15.

## v7.0.1
+ Updated README.

## v7.0.0
+ Removed `-webkit-` prefix for animation and transform CSS properties.
+ Added `hasSupport()` static method.
+ Simplified installation in HTML page, only one line is needed.

## v6.3.0
+ Improved positioning of snowflakes when resizing the window.

## v6.2.1
+ Fix for server rendering.

## v6.2.0
+ Improved randomization of snowflake positions.

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
