Falling snowflakes
==================
[![NPM version](https://img.shields.io/npm/v/magic-snowflakes.svg)](https://www.npmjs.com/package/magic-snowflakes)
[![NPM Downloads](https://img.shields.io/npm/dm/magic-snowflakes.svg?style=flat)](https://www.npmjs.org/package/magic-snowflakes)
[![Dependency Status](https://img.shields.io/david/hcodes/snowflakes.svg)](https://david-dm.org/hcodes/snowflakes)
[![Build Status](https://img.shields.io/travis/hcodes/snowflakes.svg?style=flat)](https://travis-ci.org/hcodes/snowflakes)

<img width="304" height="304" src="./images/promo.gif" />


## Details
- Only one JavaScript file (8 KB, GZIP)
- CSS Animation
- Rubber design
- Flexible settings

## Examples
- [Demo](https://hcodes.github.io/demo-snowflakes/)
- [Simple](https://hcodes.github.io/snowflakes/examples/simple.html)
- [Increased speed](https://hcodes.github.io/snowflakes/examples/increased_speed.html)
- [Layer](https://hcodes.github.io/snowflakes/examples/layer.html)
- [Own color](https://hcodes.github.io/snowflakes/examples/color.html)
- [Own z-index](https://hcodes.github.io/snowflakes/examples/z-index.html)
- [start() and stop()](https://hcodes.github.io/snowflakes/examples/start_stop.html)
- [Without wind](https://hcodes.github.io/snowflakes/examples/without_wind.html)

[See details](https://github.com/hcodes/snowflakes/tree/master/examples)

## Using

```
npm i magic-snowflakes --save-dev
```
or
```
yarn add magic-snowflakes
```

### Without settings
```html
<html>
<body>
    ...
    <script src="./node_modules/magic-snowflakes/dist/snowflakes.min.js"></script>
    <script>
        Snowflakes();
    </script>
</body>
</html>
```

or

```js
'use strict';

const Snowflakes = require('magic-snowflakes');
Snowflakes();
```

### Advanced settings
```html
<html>
<body>
    <script src="./node_modules/magic-snowflakes/dist/snowflakes.min.js"></script>
    <script>
        var sf = new Snowflakes({
            color: '#f00', // Default: "#5ECDEF"
            container: document.body, // Default: document.body            
            count: 100, // 100 snowflakes. Default: 50
            speed: 2, // The property affects the speed of falling. Default: 1
            useRotate: true, // Default: true
            useScale: true, // Default: true
            zIndex: 100, // Default: 9999
            wind: false, // Without wind. Default: true
            width: 500, // Default: width of container
            height: 2000 // Default: height of container
        });
    </script>
</body>
</html>
```

## Development
```
git clone git@github.com:hcodes/snowflakes.git ./snowflakes
cd ./snowflakes
npm i
npm run build
npm test
```

## [License](LICENSE)
MIT License
