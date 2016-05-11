import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/app/index.html',
  filename: 'index.html',
  inject: 'body'
})

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'dist'),
}

/* Equate to 'npm run start'  */
const LAUNCH_COMMAND = process.env.npm_lifecycle_event
/* Launch production if true */
const isProduction = LAUNCH_COMMAND === 'production';
/* Determines whether npm run start is in production or development */
process.env.BABEL_ENV = LAUNCH_COMMAND
/* Create a production plugin and reduce size of build */
const productionPlugin = new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('production')
  }
})



const base = {
  entry: [
    PATHS.app,
  ],
  output: {
    path: PATHS.build,
    filename: 'index_bundle.js',
  },
  module: {
      loaders: [
            {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
            /* Hash included to allow css module loader*/
            {test: /\.css$/, loader: 'style!css?sourceMap&modules&localIdentName=[name]__[local]___[hash:base64:5]'}
          ]
    },
}

const developmentConfig = {
  devtool: 'cheap-module-inline-source-map',
  devServer: {
    contentBase: PATHS.build,
    hot: true,
    inline: true,
    progress: true,
  },
  plugins: [HTMLWebpackPluginConfig, new webpack.HotModuleReplacementPlugin()]
}

const productionConfig = {
  devtool: 'cheap-module-source-map',
  plugins: [HTMLWebpackPluginConfig, productionPlugin]
}

//Need to merge two objects together[base with production or development] 
export default Object.assign({}, base,
  isProduction === true ? productionConfig : developmentConfig                              
)
