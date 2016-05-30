"use strict";

let fs = require("fs");
let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");
let webpack = require("webpack");

module.exports = {
    entry: "./app/entry.ts",
    output: {
        path: path.join(__dirname, "public"),
        filename: "app.[hash].js"
    },
    module: {
        loaders: [
            { test: /\.ts$/, loader: "ts" },
            { test: /\.hbs$/, loader: "handlebars" },
            { test: /\.html$/, loader: "ngTemplate?relativeTo=app/!html" },
            { test: /\.scss$/, loader: "style!css!sass!" },
            { test: /\.css$/, loader: "style!css!" },
            { test: /\.(ttf|eot|svg)\?[0-9]*$/, loader: "file-loader" }
        ]
    },
    resolve: {
        extensions: ["", ".webpack.js", ".web.js", ".js", ".ts"]
    },
    devServer: {
        port: 7001
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Raging Goblin",
            ngAppName: "app",
            template: "./app/indexTemplate.hbs",
            cdnResources: {
                js: [
                    "https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.5/angular.js"
                ],
                fonts: [
                    "http://fonts.googleapis.com/css?family=Josefin+Sans&subset=latin,latin-ext"
                ]
            }
        }),
        new webpack.DefinePlugin({
            THEME: JSON.stringify("./themes/lazy-purple")
        })

    ]
};