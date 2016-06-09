"use strict";

const webpack = require("webpack");
const WebpackShellPlugin = require("webpack-shell-plugin");
const path = require("path");
const testConfig = require("../app-config.json").dev;

module.exports = {
    entry: path.join(__dirname, "steps-entry.ts"),
    output: {
        path: __dirname,
        filename: "steps-entry.js",
        libraryTarget: "umd",
        library: "steps"
    },
    module: {
        loaders: [
            { test: /\.ts$/, loader: "ts" }
        ]
    },
    resolve: {
        extensions: ["", ".webpack.js", ".web.js", ".js", ".ts"]
    },
    plugins: [
        new WebpackShellPlugin({
            onBuildEnd: ["npm run protractor"],
            dev: false
        }),
        new webpack.DefinePlugin({
            CONFIG: JSON.stringify(testConfig)
        })
    ]
};