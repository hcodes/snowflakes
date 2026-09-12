/* Shared navigation and playback controls for the standalone examples. */
(function () {
    var examples = [
        ['constructor', 'Snowfall constructor', 'Explore the full set of settings, preview your snowfall and copy the code to use it on your own page.'],
        ['simple', 'Default snowfall', 'A full-window snowfall with the default settings. A single instance is all you need to get started.'],
        ['big', 'Large snowflakes', 'A wider size range, from 10 to 100 pixels, makes the white flakes stand out against a dark background.'],
        ['multicolor', 'Multicolor snowfall', 'Seven independent snowfalls share the same space, each with its own color.'],
        ['balls', 'Custom shapes', 'The light build leaves the shape to your CSS. Here, rounded flakes become falling snowballs with rotation disabled.'],
        ['layer', 'Snow in a container', 'Snowfall stays inside a 300-pixel container. Use this approach to add snow to one section of a page.'],
        ['some_layers', 'Four independent layers', 'Each quadrant has its own snowfall. Compare different colors, speeds, sizes and wind settings side by side.'],
        ['3d_cube', 'Snow on a 3D cube', 'Six snowfalls live on the faces of a rotating CSS cube. Each face clips its own flakes as it turns.'],
        ['blend_mode', 'Blend mode', 'A difference blend mode on the lettering changes the appearance of the flakes as they pass behind it.'],
        ['z-index', 'Stacking order', 'Snow starts between the two panels at z-index 90000. Change its position to see how stacking order affects the scene.'],
        ['scroll_page', 'Snow on a scrolling page', 'Scroll down to see the background change. The snowfall stays attached to the viewport as the document moves.'],
        ['without_resize', 'Manual resizing', 'Automatic resizing is disabled. Resize the browser, then update the snowfall area manually to see the difference.'],
    ];
    var current = 0;
    var exampleId = document.body.getAttribute('data-example');
    for (var i = 0; i < examples.length; i++) {
        if (examples[i][0] === exampleId) {
            current = i;
            break;
        }
    }
    var id = examples[current][0];
    var title = examples[current][1];
    var description = examples[current][2];
    var basePath = id === 'constructor' ? '../' : '';
    function examplePath(example) {
        return basePath + (example[0] === 'constructor' ? 'constructor/index.html' : example[0] + '.html');
    }
    var options = examples.map(function (example, index) {
        var number = (index < 9 ? '0' : '') + (index + 1);
        return '<option value="' + examplePath(example) + '"' + (index === current ? ' selected' : '') + '>' + number + ' · ' + example[1] + '</option>';
    }).join('');
    var previousPath = examplePath(examples[(current + examples.length - 1) % examples.length]);
    var nextPath = examplePath(examples[(current + 1) % examples.length]);
    var header = document.createElement('footer');
    header.className = 'example-header';
    header.innerHTML = [
        '<div class="example-intro">',
            '<div class="example-heading">',
                '<nav class="example-brand" aria-label="Breadcrumb">',
                    '<a href="https://github.com/hcodes/snowflakes" aria-label="Snowflakes on GitHub"><span class="example-brand__icon" aria-hidden="true">❄</span> Snowflakes</a>',
                    '<span class="example-brand__label" aria-hidden="true"> / </span>',
                    '<a class="example-brand__label" href="' + examplePath(examples[0]) + '">examples</a>',
                '</nav>',
                '<h1>' + title + '</h1>',
            '</div>',
            '<p>' + description + '</p>',
        '</div>',
        '<div class="example-tools">',
            '<nav class="example-navigation" aria-label="Examples">',
                '<label class="example-sr-only" for="example-picker">Choose an example</label>',
                '<select id="example-picker">' + options + '</select>',
                '<a class="example-step" href="' + previousPath + '" aria-label="Previous example" title="Previous example">←</a>',
                '<a class="example-step" href="' + nextPath + '" aria-label="Next example" title="Next example">→</a>',
            '</nav>',
            '<div class="example-controls">',
                '<div class="example-playback" hidden>',
                    '<button type="button" id="example-pause">Pause</button>',
                    '<label for="example-speed">Speed</label>',
                    '<select id="example-speed" aria-label="Playback speed">',
                        '<option value="0.5">0.5×</option><option value="1" selected>1×</option><option value="2">2×</option>',
                    '</select>',
                '</div>',
            '</div>',
        '</div>'
    ].join('');
    document.body.insertBefore(header, document.body.firstChild);
    document.title = title + ' — Snowflakes examples';
    var customControls = document.querySelector('[data-example-controls]');
    if (customControls) header.querySelector('.example-controls').appendChild(customControls);
    document.getElementById('example-picker').addEventListener('change', function (event) {
        window.location.href = event.target.value;
    });
    var resizeInstances = function () {};
    function measureHeader() {
        var height = header.getBoundingClientRect().height + 'px';
        if (document.documentElement.style.getPropertyValue('--example-header-height') !== height) {
            document.documentElement.style.setProperty('--example-header-height', height);
            resizeInstances();
        }
    }
    measureHeader();
    if (typeof ResizeObserver !== 'undefined') new ResizeObserver(measureHeader).observe(header);
    window.addEventListener('resize', measureHeader);

    window.ExamplePage = {
        // Base speeds preserve the relative speed of independently configured layers.
        setInstances: function (instances, baseSpeeds) {
            if (!baseSpeeds) {
                baseSpeeds = instances.map(function () { return 1; });
            }
            var pause = document.getElementById('example-pause');
            var paused = Boolean(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
            function updatePause() {
                instances.forEach(function (instance) {
                    if (paused) instance.stop();
                    else instance.start();
                });
                if (paused) document.body.classList.add('example-paused');
                else document.body.classList.remove('example-paused');
                pause.textContent = paused ? 'Resume' : 'Pause';
            }
            header.querySelector('.example-playback').hidden = false;
            pause.addEventListener('click', function () {
                paused = !paused;
                updatePause();
            });
            document.getElementById('example-speed').addEventListener('change', function (event) {
                var multiplier = Number(event.target.value);
                instances.forEach(function (instance, index) {
                    instance.setParams({ speed: baseSpeeds[index] * multiplier });
                });
                if (id === '3d_cube') document.querySelector('.cube-3d__container').style.animationDuration = 10 / multiplier + 's';
            });
            updatePause();
            measureHeader();
            instances.forEach(function (instance) { instance.resize(); });
            if (id !== 'without_resize') {
                resizeInstances = function () {
                    instances.forEach(function (instance) { instance.resize(); });
                };
            }
        }
    };
}());
