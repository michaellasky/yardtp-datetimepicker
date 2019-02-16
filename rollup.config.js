import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import external from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'
import resolve from 'rollup-plugin-node-resolve'
import url from 'rollup-plugin-url'
import copier from 'rollup-plugin-copier'

import pkg from './package.json'

export default {
  input: 'src/DateTimePicker.jsx',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true
    }
  ],
  plugins: [
    external(),
    postcss({
      modules: true
    }),
    url(),
    babel({
      exclude: 'node_modules/**',
      plugins: [ 'external-helpers' ]
    }),
    resolve(),
    commonjs({
      namedExports: {
        'react': ['useState']
      }
    }),
    copier({
      items: [
        {
          src: 'src/scss/Variables.scss',
          dest: 'dist/scss/Variables.scss',
          createPath: true
        },
        {
          src: 'src/scss/Mixins.scss',
          dest: 'dist/scss/Mixins.scss',
          createPath: true
        },
        {
          src: 'src/scss/Base.scss',
          dest: 'dist/scss/Base.scss',
          createPath: true
        }
      ],
      verbose: true
    })
  ]
}
