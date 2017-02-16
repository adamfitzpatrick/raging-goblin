"use strict";

const fs = require("fs");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const StyleLintPlugin = require("stylelint-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const webpack = require("webpack");
const yargs = require("yargs");
const startMockServer = require("./mock-backend/mock-server.js");
const appConfig = require("./app-config.json");

const flags = yargs.argv;
const env = flags.env || "dev";

const cdnResources = {
    js: [
        "https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.6/angular.js",
        "https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.6/angular-route.js"
    ],
    fonts: [
        "https://fonts.googleapis.com/css?family=Cousine|Josefin+Sans:400,700"
    ]
};
const externals = [
    "angular",
    { "angular-route": "ngRoute" },
    { "angular-animate": "ngAnimate" }
];

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
        rules: [
            {
                enforce: "pre",
                test: /\.js$/,
                loaders: ["source-map-loader"],
                exclude:[
                    path.join(__dirname, 'node_modules/rxjs'),
                    path.join(__dirname, 'node_modules/@angular')
                ]
            },
            { enforce: "pre", test: /\.ts$/, use: [ "tslint-loader" ] }, {
                test: /\.ts$/,
                loaders: [
                    "ng-annotate-loader",
                    {
                        loader: "awesome-typescript-loader",
                        query: {
                            sourceMap: false,
                            inlineSourceMap: true,
                            compilerOptions: {
                                removeComments: true
                            }
                        },
                    }
                ]
            },
            { test: /\.hbs$/, use: [ "handlebars-loader" ] },
            { test: /\.html$/, use: [ "html-loader" ] },
            { test: /\.scss$/, use: [ "style-loader", "css-loader", "sass-loader" ] },
            { test: /\.css$/, use: [ "style-loader", "css-loader" ] },
            { test: /\.(png|ttf|eot|svg|woff|woff2)/, use: [ "file-loader" ] }
        ]
    },
    externals: externals,
    resolve: {
        extensions: [".webpack.js", ".web.js", ".js", ".ts"]
    },
    devtool: "inline-source-map",
    devServer: {
        port: 7001,
        proxy: {"*": { target: "http://localhost:3002" } }
    },
    plugins: [
        new FaviconsWebpackPlugin(path.join(__dirname, "./app/favicon.png")),
        new HtmlWebpackPlugin({
            title: "Step Into",
            ngAppName: "App",
            template: path.join(__dirname, "./app/indexTemplate.hbs"),
            cdnResources: cdnResources
        }),
        new webpack.DefinePlugin({
            CONFIG: JSON.stringify(appConfig[env])
        }),
        new StyleLintPlugin({
            configFile: ".stylelintrc",
            context: "./app/"
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                tslint: {
                    emitErrors: true,
                    formatter: "stylish"
                }
            }
        })
    ]
};