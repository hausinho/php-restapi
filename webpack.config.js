var webpack = require("webpack");
var path = require("path");
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var WatchLiveReloadPlugin = require('webpack-watch-livereload-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

var DIST_DIR = path.resolve(__dirname, "dist");
var SRC_DIR = path.resolve(__dirname, "src");

var extractPlugin = new ExtractTextPlugin({
   filename: 'main.css'
});


module.exports = {
    entry: ['babel-polyfill', SRC_DIR + "/app/index.js"],
    output: {
        path: DIST_DIR + "/app",
        filename: "bundle.js",
        publicPath: "/dist"
    },
    watch: true,
    // devServer: {
    //     contentBase: "./src",
    //     inline: true,
    //     hot: true
    // },
    
    module: {

        rules: [
            {
                test: /\.js$/,
                include: SRC_DIR,
                loader: "babel-loader",
                exclude: /node_modules/,
                query: {
                    presets: ["react", "es2015", "stage-2"], plugins: ["transform-decorators-legacy", "transform-class-properties"]
                }
            },
            {
                test: /\.scss$/,
                use: extractPlugin.extract({
                    fallback: "style-loader",
                    use:  ["css-loader", "sass-loader"]
                  })                
            },
            {
                test: /\.css$/,
                use:  ["css-loader", "sass-loader"]
            },
            {
                test: /\.svg$|\.eot$|\.ttf$|\.woff$|\.woff2$/i,
                use: [
                    {
                        loader: 'url-loader',
                    }
                ]
            },
            {
                test: /\.jpe?g$|\.gif$|\.png$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'img/',
                            publicPath: './'
                        }
                    }
                ]
            }                                    
          ]        
    },
    plugins: [
        extractPlugin,
        new WatchLiveReloadPlugin({
            port: 'localhost',
            files: [
                './dist/app/*.css',
                './dist/**/*.js',
                './src/app/**/*.png',
                './src/app/**/*.jpg',
                './src/app/**/.*.scss',
                './src/routes/*.php',
                './src/routes/*.php',
                './src/app/**/*.js'
            ]
        }),
        new CleanWebpackPlugin(['dist'])        
    ]
};

