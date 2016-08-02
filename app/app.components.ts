import {header} from "./header/header";
import {landing} from "./landing/landing";
import {logo} from "./common/logo/logo";

export function initComponents(app: angular.IModule): void {
    app.directive("logo", () => logo);
    app.component("header", header);
    app.component("landing", landing);
}
