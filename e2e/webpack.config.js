"use strict";

const webpack = require("webpack");
const WebpackShellPlugin = require("webpack-shell-plugin");
const path = require("path");
const testConfig = require("../app-config.json").dev;

module.exports = {
    entry: path.join(__dirname, "spec-entry.ts"),
    output: {
        path: __dirname,
        filename: "spec-entry.js"
    },
    module: {
        loaders: [
            { test: /\.ts$/, loader: "ts" }
        ]
    },
    resolve: ["ts"],
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