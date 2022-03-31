import typescript from '@rollup/plugin-typescript';

const packageJson = require('./package.json');

export default {
  input: './src/index.ts',
  output: [
    {
      file: packageJson.main,
      format: 'cjs', // commonJS
      sourcemap: true,
    },
    {
      file: packageJson.module,
      format: 'esm', // ES Modules
      sourcemap: true,
    },
  ],
  plugins: [typescript({ tsconfig: './tsconfig.json' })],
};