const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const fsExtra = require('fs-extra');
const pkg = require('./package.json');
const Q3RCon = require('./.dev/rcon');
const events = require('./src/configs/events.json');

// Current mode
const mode = process.argv[process.argv.indexOf('--mode') + 1];

// RCON Config
const { address, password, port } = pkg.rcon;
const rcon = new Q3RCon({
  address,
  port, // optional
  password,
});


// Obfuscate our events
const newEvents = {};
Object.values(events).forEach(e => newEvents[e] = `${Math.random().toString(36).substring(2)}:${Math.random().toString(36).substring(2)}`);
const buildPath = path.resolve(__dirname, '..', 'dist');
fs.mkdir('../dist', () => {
  fs.writeFile('../dist/events.json', JSON.stringify(newEvents, null, 2), { flag: 'w+' }, err => {
    if (err) {
      console.error(err)
      return
    }
  });
});

const server = {
  entry: './src/server/server.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['ts-loader', 'eslint-loader'],
        exclude: /node_modules/,
      },
      mode === 'production' ?
        {
          test: /\.ts$/,
          loader: 'string-replace-loader',
          options: {
            multiple: [
              ...Object.keys(newEvents).map(key => ({ search: key, replace: newEvents[key] })),
            ],
          },
        }
      : {},
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
      mode === 'production' ?
        {
          test: /\.ts$/,
          loader: 'string-replace-loader',
          options: {
            multiple: [
              ...Object.keys(newEvents).map(key => ({ search: key, replace: newEvents[key] })),
            ],
          },
        }
      : {},
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