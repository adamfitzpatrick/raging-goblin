"use strict";

const fs = require("fs");
const path = require("path");
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const StyleLintPlugin = require("stylelint-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const webpack = require("webpack");
const yargs = require("yargs");

const startMockServer = require("./mock-backend/mock-server.js");
const appConfig = require("./app-config.json");
const logo = fs.readFileSync("./src/assets/logo.svg", "utf-8");

const flags = yargs.argv;
const env = flags.env || "prod";

const cdnResources = {
    js: [],
    fonts: [
        "https://fonts.googleapis.com/css?family=Cousine|Josefin+Sans:400,700"
    ],
    css: [
        "https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css",
        "https://fonts.googleapis.com/icon?family=Material+Icons"
    ]
};
const externals = [];

if (process.argv[1].indexOf("webpack-dev-server") !== -1) {
    startMockServer();
}

module.exports = {
    context: path.join(__dirname, "./src/app"),
    entry: path.join(__dirname, "./src/entry.ts"),
    output: {
        path: path.join(__dirname, "public"),
        filename: "app.[hash].js"
    },
    module: {
        exprContextCritical: false,
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
            { test: /\.scss$/, use: [ "to-string-loader", "css-loader", "sass-loader" ] },
            { test: /\.css$/, use: [ "style-loader", "css-loader" ] },
            { test: /\.(png|ttf|eot|svg|woff|woff2)/, use: [ "file-loader" ] }
        ]
    },
    externals: externals,
    resolve: {
        extensions: [".webpack.js", ".web.js", ".js", ".ts"],
        modules: ["./node_modules"]
    },
    devtool: "inline-source-map",
    devServer: {
        port: 7001,
        historyApiFallback: true,
        proxy: {
            "/api/**": { target: "http://localhost:3002" }
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: `!!handlebars-loader!${path.join(__dirname, "./src/indexTemplate.hbs")}`,
            logo: logo,
            title: "StepInto",
            chunksSortMode: "dependency",
            inject: "head",
            cdnResources: cdnResources
        }),
        new webpack.DefinePlugin({
            ENV: JSON.stringify(env),
            CONFIG: JSON.stringify(appConfig[env])
        }),
        new FaviconsWebpackPlugin({
            logo: path.join(__dirname, "./src/favicon.png"),
            icons: {
                android: false,
                appleIcon: false,
                appleStartup: false,
                coast: false,
                favicons: true,
                firefox: true,
                opengraph: false,
                twitter: false,
                yandex: false,
                windows: false
            }
        }),
        /*
        new StyleLintPlugin({
            configFile: ".stylelintrc",
            context: "./src/"
        }),
        */
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