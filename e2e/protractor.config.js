"use strict";

const path = require("path");

exports.config = {
    specs: ["./landing/landing.feature"],
    framework: "custom",
    frameworkPath: require.resolve("protractor-cucumber-framework"),
    cucumberOpts: {
        format: "pretty",
        require: "./steps-entry.js"
    }
};