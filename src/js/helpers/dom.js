let animationPrefix = '';
if (typeof window !== 'undefined') {
    animationPrefix = (Array.prototype.slice
        .call(window.getComputedStyle(document.documentElement, ''))
        .join(',')
        .search(/,animation/) > -1
    ) ? '' : 'Webkit';
}

/**
 * Set inline style.
 *
 * @param {DOMElement} dom
 * @param {Object} props
 */
export function setStyle(dom, props) {
    Object.keys(props).forEach(function(originalKey) {
        let key = originalKey;
        if (animationPrefix && originalKey.search('animation') > -1) {
            key = animationPrefix + originalKey[0].toUpperCase() + originalKey.substr(1);
        }

        dom.style[key] = props[originalKey];
    });
}

/**
 * Show DOM element.
 *
 * @param {DOMElement} dom
 */
export function showElement(dom) {
    setStyle(dom, {display: 'block'});
}

/**
 * Hide DOM element.
 *
 * @param {DOMElement} dom
 */
export function hideElement(dom) {
    setStyle(dom, {display: 'none'});
}

/**
 * Get window height.
 *
 * @returns {number}
 */
export function getWindowHeight() {
    const
        body = document.body,
        docElement = document.documentElement;

    let height;

    if (window.innerHeight) {
        height = window.innerHeight;
    } else if (docElement && docElement.clientHeight) {
        height = docElement.clientHeight;
    } else if (body) {
        height = body.clientHeight;
    }

    return height;
}

/**
 * Get window height.
 *
 * @param {string} style
 * @param {DOMNode} styleNode
 *
 * @returns {DOMNode}
 */
export function injectStyle(style, styleNode) {
    if (!styleNode) {
        styleNode = document.createElement('style');
        document.body.appendChild(styleNode);
    }

    if (styleNode.styleSheet) { // IE
        styleNode.styleSheet.cssText = style;
    } else if ('textContent' in styleNode) {
        styleNode.textContent = style;
    } else {
        styleNode.innerHTML = style;
    }

    return styleNode;
}

/**
 * Remove DOM node.
 *
 * @param {DOMNode} node
 *
 */
export function removeNode(node) {
    if (node && node.parentNode) {
        node.parentNode.removeChild(node);
    }
}

/**
 * A DOM node is body.
 *
 * @param {DOMNode} node
 *
 * @returns {boolean}
 */
export function isBody(node) {
    return node === document.body;
}

/**
 * Add classname for a node.
 *
 * @param {DOMNode} node
 * @param {string} classname
 */
export function addClass(node, classname) {
    node.classList.add(classname);
}

/**
 * Remove classname for a node.
 *
 * @param {DOMNode} node
 * @param {string} classname
 */
export function removeClass(node, classname) {
    node.classList.remove(classname);
}
