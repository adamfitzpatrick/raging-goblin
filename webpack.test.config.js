const webpack = require("webpack");
const path = require("path");
const webpackConfig = require("./webpack.config");

webpackConfig.module.rules.push({
    enforce: 'post',
    test: /\.(js|ts)$/,
    loader: 'istanbul-instrumenter-loader',
    include: path.join(__dirname, "./src/app"),
    exclude: [
        /\.(e2e|spec)\.ts$/,
        /node_modules/
    ]
});

module.exports = webpackConfig;