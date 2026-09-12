import Snowflakes from '.';

function init() {
    document.removeEventListener('DOMContentLoaded', init);
    new Snowflakes();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
