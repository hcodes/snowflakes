Falling snowflakes
==================
<img width="304" height="304" src="./images/promo.gif" />


## Details
- Only one JavaScript file
- CSS transformation
- RequestAnimationFrame

## [Example](https://hcodes.github.io/snowflakes/example/example.html)

## Using

```
npm i magic-snowflakes --save-dev
```

### Fullscreen
```html
<html>
<body>
    ...
    <script src="./node_modules/magic-snowflakes/snowflakes.js"></script>
    <script>
        Snowflakes();
    </script>
</body>
</html>
```

or

```js
'use strict';

const SnowFlakes = require('magic-snowflakes');
SnowFlakes();
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
    <script src="./node_modules/magic-snowflakes/snowflakes.js"></script>
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
<head>
    <style>
        .snowflake {
            /* Set your own z-index for snowflakes */
            z-index: 9999;
        }
    </style>
</head>
<body>
    <script src="./node_modules/magic-snowflakes/snowflakes.js"></script>
    <script>
        var sf = new Snowflakes({
            container: document.body,
            count: 100, // 100 snowflakes. Default: 50
            speed: 2, // The property affects the speed of falling. Default: 1
            useRotate: true, // Default: true
            useScale: true, // Default: true
            width: 500, // Default: width of container
            height: 2000 // Default: height of container
        });
    </script>
</body>
</html>
```

## License
MIT License
