import { injectStyle, removeNode } from '../utils/dom';

const mainStyle = '{MAIN_STYLE}\n{IMAGES_STYLE}';

/** Owns one instance's styles and a reference to the shared stylesheet. */
export class SnowflakesStyles {
    private static mainStyleNode?: HTMLStyleElement;
    private static owners = 0;
    private animationStyleNode?: HTMLStyleElement;
    private destroyed = false;

    constructor(gid: number, animation: string) {
        if (!SnowflakesStyles.owners) {
            SnowflakesStyles.mainStyleNode = injectStyle(mainStyle);
        }
        SnowflakesStyles.owners++;
        try {
            this.animationStyleNode = injectStyle(animation);
        } catch (error) {
            this.destroy();
            throw error;
        }
    }

    public updateAnimation(animation: string) {
        if (!this.destroyed) {
            this.animationStyleNode = injectStyle(animation, this.animationStyleNode);
        }
    }

    public destroy() {
        if (this.destroyed) {
            return;
        }
        this.destroyed = true;
        removeNode(this.animationStyleNode);
        delete this.animationStyleNode;

        SnowflakesStyles.owners--;
        if (!SnowflakesStyles.owners) {
            removeNode(SnowflakesStyles.mainStyleNode);
            delete SnowflakesStyles.mainStyleNode;
        }
    }
}
