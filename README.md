Falling snowflakes
==================

## Examples
- [Fullscreen](https://hcodes.github.io/snowflakes/index.html)
- [Layer](https://hcodes.github.io/snowflakes/index_layer.html)

## Using
```html
<html>
<body>
...
<script src="snowflakes.js"></script>
<script>
    Snowflakes();
</script>
</body>
</html>
```

or

```html
<html>
<body>
...
<div id="my-container" style="width: 600px; height: 600px; overflow: hidden; position: relative;"></div>
<script src="snowflakes.js"></script>
<script>
    var sf = new Snowflakes({
        container: document.getElementById('my-container'),
        count: 100
    });
    
    //...
    sf.stop();
    //...
    sf.start();
</script>
</body>
</html>
```

## License
MIT License
