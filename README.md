Falling snowflakes
==================

## Examples
- [Fullscreen](https://hcodes.github.io/snowflakes/index.html)
- [Layer](https://hcodes.github.io/snowflakes/index_layer.html)

## Using

### Fullscreen
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
<script src="snowflakes.js"></script>
<script>
    var sf = new Snowflakes({
        container: document.getElementById('my-layer')
    }); 
</script>
</body>
</html>
```

## License
MIT License
