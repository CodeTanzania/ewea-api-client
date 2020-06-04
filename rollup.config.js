import pkg from './package.json';

export default [
  {
    input: 'src/index.js',
    external: [
      'axios',
      'axios/lib/helpers/buildURL',
      'form-data',
      'inflection',
      'lodash',
      'moment',
      '@lykmapipo/common',
      '@lykmapipo/env',
      'jwt-decode',
      'lodash/clone',
      'lodash/forEach',
      'lodash/merge',
      'lodash/upperFirst',
      'lodash/first',
      'lodash/isArray',
      'lodash/isEmpty',
      'lodash/isPlainObject',
      'lodash/isString',
      'lodash/max',
      'lodash/min',
      'lodash/omit',
      'lodash/toLower',
    ],
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        interop: false,
        esModule: false,
        preferConst: true,
        strict: true,
      },
      { file: pkg.module, format: 'es' },
    ],
  },
];
