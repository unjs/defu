import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'

const extensions = ['.js', '.ts', '.tsx']

export default [
  {
    input: './src/defu.ts',
    output: [
      { name: 'defu', file: './dist/defu.js', format: 'cjs' },
      { name: 'defu', file: './dist/defu.min.js', format: 'umd', plugins: [terser()] }
    ],
    plugins: [
      resolve({ extensions }),
      babel({
        extensions,
        presets: [
          ['@babel/preset-env', { targets: { ie: '9' } }],
          '@babel/preset-typescript'
        ]
      })
    ]
  }
]
