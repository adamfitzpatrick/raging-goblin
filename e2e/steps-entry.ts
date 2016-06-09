import {stepService} from "./support/step-service.ts";
import {StepDescriptor} from "./support/step-service";
import {WebpackRequire} from "../webpack.model";

const wpRequire = require as WebpackRequire;

const testsContext = wpRequire.context(".", true, /\.steps\.ts$/);
testsContext.keys().forEach(testsContext);

module.exports = function () {
    stepService.registerCucumber(this);
};

