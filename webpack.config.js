const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');


module.exports = {
  entry: [
    './src/index.js',
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
  ],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    inline: true,
    hot: false,
    host: '0.0.0.0',
    port: 3000,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(sass|scss)/,
        loader:
          'style-loader!css-loader!sass-loader?sourceMap',
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: { loader: 'html-loader' },
      },
    ],
  },
  plugins: [
    new CopyPlugin([
      { from: './src/index.html', to: './' },
      { from: './src/api/', to: './api/' },
    ]),
  ],
};
