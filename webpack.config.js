const webpack = require('webpack');
const path = require('path');
const fsExtra = require('fs-extra');
const pkg = require('./package.json');
const Q3RCon = require('./.dev/rcon');

const { address, password, port } = pkg.rcon;
const rcon = new Q3RCon({
  address,
  port, // optional
  password,
});

const buildPath = path.resolve(__dirname, '..', 'dist');

const server = {
  entry: './src/server/server.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['ts-loader', 'eslint-loader'],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({ 'global.GENTLY': false }),
    {
      apply: (compiler) => {
        compiler.hooks.compile.tap("DeleteDist_compile", () => {
          fsExtra.emptyDirSync(path.resolve(buildPath, 'server'));
        });
      },
    },
    {
      apply: (compiler) => {
        compiler.hooks.afterEmit.tap("RestartResource", () => {
          // TODO: Hookup rcon
          rcon.send(`refresh; stop mb-ah; start mb-ah`);
        });
      },
    },
  ],
  optimization: {
    minimize: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: '[contenthash].server.js',
    path: path.resolve(buildPath, 'server'),
  },
  target: 'node',
};

const client = {
  entry: './src/client/client.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['ts-loader', 'eslint-loader'],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    {
      apply: (compiler) => {
        compiler.hooks.compile.tap("DeleteDist_compile", () => {
          fsExtra.emptyDirSync(path.resolve(buildPath, 'client'));
        });
      },
    },
    {
      apply: (compiler) => {
        compiler.hooks.afterEmit.tap("RestartResource", () => {
          // TODO: Hookup rcon
          rcon.send(`refresh; stop mb-ah; start mb-ah`);
        });
      },
    },
  ],
  optimization: {
    minimize: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: '[contenthash].client.js',
    path: path.resolve(buildPath, 'client'),
  },
};

module.exports = [server, client];