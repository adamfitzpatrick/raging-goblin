import * as angular from "angular";

import {initComponents} from "./app.components";
let ngRouteStr = "ngRoute";
window[ngRouteStr] = ngRouteStr;
let ngAnimateStr = "ngAnimate";
window[ngAnimateStr] = ngAnimateStr;
import * as ngRoute from "angular-route";
import * as ngAnimate from "angular-animate";
import {initRoutes} from "./app.routes";
import {initServices} from "./app.services";
import {initConfig} from "./app.config";

const app = angular.module("App", [ngRoute, ngAnimate]);

declare const CONFIG: Object;
Object.keys(CONFIG).forEach((key: string) => app.constant(key, CONFIG[key]));

initConfig(app);
initRoutes(app);
initComponents(app);
initServices(app);

export {angular};
