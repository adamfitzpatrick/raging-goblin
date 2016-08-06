import * as angular from "angular";

/* tslint:disable:no-string-literal */
window["ngRoute"] = "ngRoute";

import * as ngRoute from "angular-route";
import {initComponents} from "./app.components";
import {initRoutes} from "./app.routes";
import {initServices} from "./app.services";
import {initConfig} from "./app.config";

const app = angular.module("App", [ngRoute]);

declare const CONFIG: Object;
Object.keys(CONFIG).forEach((key: string) => app.constant(key, CONFIG[key]));

initConfig(app);
initRoutes(app);
initComponents(app);
initServices(app);

export {angular};
