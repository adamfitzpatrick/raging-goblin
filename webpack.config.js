"use strict";

const fs = require("fs");
const path = require("path");
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const StyleLintPlugin = require("stylelint-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const webpack = require("webpack");
const yargs = require("yargs");
const yaml = require("yamljs");
const ngcWebpack = require("ngc-webpack");

const flags = yargs.argv;
const env = flags.env || "prod";
const AOT = env === "prod" && flags["$0"].indexOf("karma") === -1;
const entry = path.join(__dirname, AOT ? "./src/app.aot.ts" :  "./src/app.ts");

const startMockServer = require("./mock-backend/mock-server.js");

const appConfig = require("./app-config.json");
const config = appConfig[env];
Object.assign(config, appConfig.common);

const logo = fs.readFileSync("./src/assets/images/logo.svg", "utf-8");
const posts = fs.readdirSync(path.join(__dirname, "./src/assets/posts")).map(postFile => {
    const yamlPost = fs.readFileSync(path.join(__dirname, "./src/assets/posts", postFile), "utf-8");
    return yaml.parse(yamlPost);
});

const cdnResources = {
    js: [
        "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.11.0/highlight.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/rxjs/5.4.0/Rx.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/three.js/85/three.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.5.0/Chart.min.js"
    ],
    fonts: [
        "https://fonts.googleapis.com/css?family=Cousine|Arimo|Open+Sans:300"
    ],
    css: [
        "https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css",
        "https://fonts.googleapis.com/icon?family=Material+Icons",
        "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.11.0/styles/default.min.css"
    ]
};
const externals = {
    "highlight.js": "hljs",
    "rxjs": "Rx",
    "three": "THREE",
    "chart.js": "Chart"
};

if (process.argv[1].indexOf("webpack-dev-server") !== -1) {
    startMockServer();
}

module.exports = {
    context: path.join(__dirname, "./src/app"),
    entry,
    output: {
        path: path.join(__dirname, "public"),
        filename: "[name].[hash].js"
    },
    module: {
        exprContextCritical: false,
        rules: [
            {
                enforce: "pre",
                test: /\.js$/,
                loaders: ["source-map-loader"],
                exclude:[
                    /node_modules/
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
                    },
                    "angular2-template-loader",
                    "angular-router-loader?aot=true&genDir=aot"
                ]
            },
            { test: /\.hbs$/, use: [ "handlebars-loader" ] },
            { test: /\.html$/, use: [ "html-loader" ] },
            { test: /\.scss$/, use: [ "to-string-loader", "css-loader", "sass-loader" ] },
            { test: /\.css$/, use: [ "style-loader", "css-loader" ] },
            { test: /\.(jpg|png|ttf|eot|svg|woff|woff2)/, use: [ "file-loader" ] }
        ]
    },
    externals: externals,
    resolve: {
        extensions: [".webpack.js", ".web.js", ".js", ".ts"],
        modules: ["./node_modules"]
    },
    devtool: "source-map",
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
            inject: "body",
            cdnResources: cdnResources
        }),
        new webpack.DefinePlugin({
            ENV: JSON.stringify(env),
            CONFIG: JSON.stringify(config),
            POSTS: JSON.stringify(posts)
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
                },
                htmlLoader: {
                    minimize: true,
                    removeAttributeQuotes: false,
                    caseSensitive: true,
                    customAttrSurround: [ [/#/, /(?:)/], [/\*/, /(?:)/], [/\[?\(?/, /(?:)/] ],
                    customAttrAssign: [ /\)?\]?=/ ]
                }
            }
        }),
        new ngcWebpack.NgcWebpackPlugin({
            disabled: !AOT,
            tsConfig: "./tsconfig.json"
        })
    ]
};