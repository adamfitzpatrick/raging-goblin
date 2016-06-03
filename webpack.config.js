"use strict";

let fs = require("fs");
let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");
let webpack = require("webpack");
let yargs = require("yargs");
let startMockServer = require("./mock-backend/mock-server.js");
let appConfig = require("./app-config.json");

let flags = yargs.argv;
let env = flags.env || "dev";

if (process.argv[1].indexOf("webpack-dev-server") !== -1) {
    startMockServer();
}

module.exports = {
    entry: "./app/entry.ts",
    output: {
        path: path.join(__dirname, "public"),
        filename: "app.[hash].js"
    },
    module: {
        preLoaders: [
            { test: /\.ts$/, loader: "tslint" },
            { test: /\.scss$/, loader: "sasslint" }
        ],
        loaders: [
            { test: /\.ts$/, loader: "ts" },
            { test: /\.hbs$/, loader: "handlebars" },
            { test: /\.html$/, loader: "ngTemplate?relativeTo=app/!html" },
            { test: /\.scss$/, loader: "style!css!sass!" },
            { test: /\.css$/, loader: "style!css!" },
            { test: /\.(ttf|eot|svg)\?[0-9]*$/, loader: "file-loader" }
        ]
    },
    externals: [
        "angular",
        { "angular-route": "ngRoute" }
    ],
    resolve: {
        extensions: ["", ".webpack.js", ".web.js", ".js", ".ts"]
    },
    devServer: {
        port: 7001,
        proxy: {"*": { target: "http://localhost:3002" } }
    },
    tslint: {
        emitErrors: true,
        formatter: "stylish",
        formattersDirectory: "./node_modules/tslint-stylish"
    },
    sasslint: {
        configFile: './sass-lint.yml'
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Raging Goblin",
            ngAppName: "App",
            template: "./app/indexTemplate.hbs",
            cdnResources: {
                js: [
                    "https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.5/angular.js",
                    "https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.5/angular-route.js"
                ],
                fonts: [
                    "http://fonts.googleapis.com/css?family=Josefin+Sans&subset=latin,latin-ext"
                ]
            }
        }),
        new webpack.DefinePlugin({
            CONFIG: JSON.stringify(appConfig[env])
        })
    ]
};