const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, '../demo/index.tsx'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '../example')
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, '../demo/index.html'),
      inject: true
    })
  ],
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        // include: [resolve('../demo')],
        use: [
          {
            loader: ['babel-loader', 'ts-loader']
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.(css|less)$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader', 
          // 'postcss-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                require('autoprefixer')(),
              ]
            }
          },
          'less-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', 'jsx']
  },
  devServer: {
    port: 5001,
    historyApiFallback: true,
    inline: true,
    hot: true
  }
}
