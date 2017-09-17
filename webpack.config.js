var webpack = require("webpack");
var path = require("path");

var DIST_DIR = path.resolve(__dirname, "dist");
var SRC_DIR = path.resolve(__dirname, "src");

var config = {
    entry: ['babel-polyfill', SRC_DIR + "/app/index.js"],
    output: {
        path: DIST_DIR + "/app",
        filename: "bundle.js",
        publicPath: "/app/"
    },
    watch: true,
    // devServer: {
    //     contentBase: "./src",
    //     inline: true,
    //     hot: true
    // },
    module: {
        loaders: [
            {
                test: /\.js?/,
                include: SRC_DIR,
                loader: "babel-loader",
                query: {
                    presets: ["react", "es2015", "stage-2"], plugins: ["transform-decorators-legacy", "transform-class-properties"]
                }
            }
        ]
    }
};

module.exports = config;