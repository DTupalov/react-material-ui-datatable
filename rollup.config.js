import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'cjs',
  },
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
  ],
};
