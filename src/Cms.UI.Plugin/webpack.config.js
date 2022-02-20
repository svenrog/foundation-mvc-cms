const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = (env, argv) => {
  const mode = {
    IS_DEV: argv.mode === 'development',
    IS_PROD: argv.mode === 'production',
  };
  const developmentProps = {
    devtool: 'source-map',
  };
  const productionProps = {};
  const additionalProps = mode.IS_PROD ? productionProps : developmentProps;
  const frontendPath = path.resolve(__dirname, 'frontend');

  return {
    entry: {
      main: path.resolve(frontendPath, 'entry.ts'),
      container: path.resolve(frontendPath, 'container.ts'),
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.json',
            },
          },
          exclude: /node_modules/,
        },
        {
          test: /\.s?css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        },
      ],
    },
    optimization: {
      minimize: mode.IS_PROD,
      minimizer: [
        '...',
        new CssMinimizerPlugin({
          minimizerOptions: {
            preset: ['default', { discardComments: { removeAll: mode.IS_PROD } }],
          },
        }),
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: mode.IS_PROD ? '[name].css' : '[name].css',
      }),
    ],
    output: {
      path: path.join(__dirname, 'wwwroot/'),
      filename: mode.IS_PROD ? '[name].js' : '[name].js',
      publicPath: '',
    },
    resolve: {
      extensions: ['.js', '.ts', '.tsx', '.css', '.scss'],
    },
    watchOptions: {
      aggregateTimeout: 200,
      poll: 1000,
      ignored: /node_modules/,
    },
    ...additionalProps,
  };
};
