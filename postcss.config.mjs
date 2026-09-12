import autoprefixer from 'autoprefixer';
import nested from 'postcss-nested';
import cssnano from 'cssnano';
import inlineSvg from 'postcss-inline-svg';

export default {
    plugins: [
        autoprefixer(),
        nested(),
        cssnano(),
        inlineSvg(),
    ],
};
