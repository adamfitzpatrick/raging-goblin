import {WebpackRequire} from "../webpack.model.ts"

const wpRequire = require as WebpackRequire;

const testsContext = wpRequire.context(".", true, /\.spec\.ts$/);
testsContext.keys().forEach(testsContext);