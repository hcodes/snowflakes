import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  {
    ignores: [
      '.*',
      'dist/**',
      '_site/**',
      'examples/constructor/dist/**',
      'node_modules/**',
      'scripts/**',
      '*.config.js'
    ]
  },
  {
    files: ['**/*.{js,mjs,cjs,ts}']
  },
  {
    languageOptions: { globals: globals.browser }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
