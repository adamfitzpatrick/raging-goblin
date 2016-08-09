import {header} from "./header/header";
import {landing} from "./landing/landing";
import {logo} from "./common/logo/logo";
import {postCard} from "./post-card/post-card";

export function initComponents(app: angular.IModule): void {
    app.directive("logo", () => logo);
    app.component("header", header);
    app.component("landing", landing);
    app.component("postCard", postCard);
}
