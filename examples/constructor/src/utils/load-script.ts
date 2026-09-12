export function loadScript(src: string, onload: () => void) {
    const script = document.createElement('script');
    script.onload = onload;
    script.src = src;
    document.head.appendChild(script);
}
