export function getRadioValue(elems: NodeListOf<HTMLInputElement>) {
    for (let i = 0; i < elems.length; i++) {
        if (elems[i].checked) {
            return elems[i].value;
        }
    }

    return '';
}

export function setRadioValue(elems: NodeListOf<HTMLInputElement>, value: string) {
    for (let i = 0; i < elems.length; i++) {
        elems[i].checked = elems[i].value === value;
    }
}

export function bindRadioClick(elems: NodeListOf<HTMLInputElement>, onclick: () => void) {
    for (let i = 0; i < elems.length; i++) {
        elems[i].onclick = onclick;
    }
}
