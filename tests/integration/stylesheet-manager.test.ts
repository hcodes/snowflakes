/** @jest-environment jsdom */
import { afterEach, expect, jest, test } from '@jest/globals';
import { SnowflakesStyles } from '../../src/styles/stylesheet-manager';

const owners: SnowflakesStyles[] = [];

function createStyles(id: number) {
    const styles = new SnowflakesStyles(id, `animation ${id}`);
    owners.push(styles);
    return styles;
}

afterEach(() => {
    jest.restoreAllMocks();
    owners.splice(0).forEach(owner => owner.destroy());
});

test.each([[0, 1, 2], [2, 1, 0], [1, 0, 2]])('styles survive destruction order %i, %i, %i', (...order) => {
    const instances = [1, 2, 3].map(createStyles);
    const styles = () => document.head.querySelectorAll('style');
    expect(styles()).toHaveLength(7);
    const shared = styles()[0];
    const animation = styles()[2];
    instances[0].updateAnimation('updated');
    expect(styles()[2]).toBe(animation);
    expect(animation.textContent).toBe('updated');

    order.forEach((id, index) => {
        instances[id].destroy();
        instances[id].destroy();
        instances[id].updateAnimation('must not recreate styles');
        expect(styles()).toHaveLength(index === 2 ? 0 : 5 - index * 2);
        if (index < 2) expect(styles()[0]).toBe(shared);
    });
});

test('failed creation releases styles and allows a new owner', () => {
    const createElement = document.createElement.bind(document);
    let attempts = 0;
    jest.spyOn(document, 'createElement').mockImplementation((tagName, options) => {
        if (++attempts === 3) throw new Error('creation failed');
        return createElement(tagName, options);
    });
    expect(() => createStyles(4)).toThrow('creation failed');
    expect(document.head.querySelectorAll('style')).toHaveLength(0);
    const owner = createStyles(5);
    expect(document.head.querySelectorAll('style')).toHaveLength(3);
    owner.destroy();
    expect(document.head.querySelectorAll('style')).toHaveLength(0);
});
