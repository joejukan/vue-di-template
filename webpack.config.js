/**
 * https://medium.com/@nupoor_neha/starting-with-webpack-4-and-vuejs-a-quick-start-tutorial-4a244410d55e
 */
const {resolve, join} = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueDIPlugin } = require('vue-di-loader');
const NODE_ENV = process.env.NODE_ENV;

const isProd = function () {
    return (NODE_ENV === 'production') ? true : false;
}
const isDev = () => {
    return (NODE_ENV === 'development');
};

module.exports = {
  entry: './src/main.ts',
  output: {
    path: resolve('dist'),
    publicPath: '',
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-di-loader',
        options: {
          loaders: {
            'scss': 'style-loader!css-loader!sass-loader',
            'sass': 'style-loader!css-loader!sass-loader?indentedSyntax'
          }
        }
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              appendTsSuffixTo: [/\.vue$/],
            }
          },
          {
            loader: 'vue-di-loader',
            options: {
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.scss$/,
        use: [
            { loader: 'style-loader' },
            { loader: 'css-loader' },
            { loader: 'sass-loader' }
        ]
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
        title: 'Vue DI Template',
        filename: 'index.html',
        inject: 'body',
        path: resolve('dist'),
        publicPath: '/',
        template: resolve('./src/main.html')
    }),
    new VueDIPlugin({
      debug: true,
      components: {
        deep: true,
        path: resolve('./src/components')
      }
    })
  ],
  resolve: {
    extensions: ['.ts', '.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

if (isProd()) {
  module.exports.devtool = '#source-map'
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}