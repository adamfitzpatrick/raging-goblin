import {WebpackRequire} from "../webpack.model";

const wpRequire = require as WebpackRequire;

const testsContext = wpRequire.context(".", true, /\.e2e\.spec\.ts$/);
testsContext.keys().forEach(testsContext);