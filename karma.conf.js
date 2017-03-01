const webpack = require("webpack");
const webpackConfig = require("./webpack.test.config");

module.exports = function(config) {
    config.set({
        browsers: ["PhantomJS"],

        basePath: "",

        frameworks: ["jasmine"],

        files: [
            "./src/spec-entry.js"
        ],

        mime: {
            "text/x-typescript": ["ts"]
        },

        reporters: [ "nyan", "coverage", "remap-coverage" ],

        preprocessors: {
            "./src/spec-entry.js": [ "coverage", "webpack", "sourcemap" ]
        },

        coverageReporter: {
            type: "in-memory",
        },

        remapCoverageReporter: {
            "text-summary": null,
            json: "./reports/coverage/json/coverage.json",
            html: "./reports/coverage/html"
        },

        browserNoActivityTimeout: 100000,

        webpack: webpackConfig,

        webpackMiddleware: {
            noInfo: true,
            stats: {
                chunks: false
            }
        },

        plugins: [
            require("karma-webpack"),
            require("karma-coverage"),
            require("karma-nyan-reporter"),
            require("karma-jasmine"),
            require("karma-phantomjs-launcher"),
            require("karma-chrome-launcher"),
            require("karma-phantomjs-shim"),
            require("karma-sourcemap-loader"),
            require("karma-remap-coverage")
        ]
    });
};
