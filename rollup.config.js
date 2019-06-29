import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';
import { uglify } from 'rollup-plugin-uglify';

const external = id => !id.startsWith('.') && !id.startsWith('/');

export default {
  input: './src/index.js',
  output: {
    file: './dist/index.js',
    format: 'cjs',
  },
  external,
  plugins: [
    babel({
      presets: [
        '@babel/preset-react',
        [
          '@babel/preset-env',
          {
            targets: {
              browsers: ['last 2 versions', 'ie >= 10'],
            },
            debug: false,
            modules: false,
          },
        ],
      ],
      babelrc: false,
      exclude: 'node_modules/**',
    }),
    uglify({
      compress: {
        warnings: false,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
      },
      output: {
        comments: false,
      },
    }),
    nodeResolve(),
  ],
};
