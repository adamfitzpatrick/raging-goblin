import {initComponents} from "./app.components";
import * as ngRoute from "angular-route";
import {initRoutes} from "./app.routes";

const app = angular.module("app", [ngRoute]);

initComponents(app);
initRoutes(app);