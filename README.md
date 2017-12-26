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

## [Examples](https://hcodes.github.io/snowflakes/example/demo.html)
- [Demo](https://hcodes.github.io/demo-snowflakes/)
- [Simple](https://hcodes.github.io/snowflakes/example/simple.html)
- [Advanced](https://hcodes.github.io/snowflakes/example/advanced.html)

## Using

```
npm i magic-snowflakes --save-dev
```

### Fullscreen
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

### Layer

```html
<html>
<head>
    <style>
        #my-layer {
            width: 600px;
            height: 600px;
            overflow: hidden;
            position: relative;
        }
    </style>
</head>
<body>
    ...
    <div id="my-layer"></div>
    <script src="./node_modules/magic-snowflakes/dist/snowflakes.min.js"></script>
    <script>
        var sf = new Snowflakes({
            container: document.getElementById('my-layer')
        });
    </script>
</body>
</html>
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
