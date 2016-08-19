"use strict";

let webpack = require("webpack");
let webpackConfig = require("./webpack.config");

module.exports = function(config) {
    config.set({
        browsers: ['PhantomJS'],
        frameworks: ['jasmine', 'phantomjs-shim'],
        files: [
            "app/spec-entry.ts"
        ],
        reporters: ["nyan", "coverage"],

        preprocessors: {
          'app/spec-entry.ts': ['webpack']
        },

        coverageReporter: {
          dir: "build/reports/coverage",
            watermarks: {
                statements: [98, 100],
                branches: [98, 100],
                functions: [98, 100],
                lines: [98, 100]
            },
          reporters: [
            { type: "html", subdir: "html" },
            { type: "text-summary" }
          ]
        },
        webpack: {
            watch: true,
            module: {
                loaders: webpackConfig.module.loaders,
                postLoaders: [
                    { test: /\.ts$/, exclude: /(node_modules|spec|\.d\.ts$)/, loader: 'istanbul-instrumenter' }
                ]
            },
            resolve: webpackConfig.resolve,
            plugins: webpackConfig.plugins.slice(1)
        }
    })
};
