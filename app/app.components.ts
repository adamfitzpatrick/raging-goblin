import {header} from "./header/header";
import {landing} from "./landing/landing";
import {logo} from "./common/logo/logo";
import {postCard} from "./post-card/post-card";
import {stacker} from "./common/stacker/stacker";
import {stackerItem} from "./common/stacker/stacker-item/stacker-item";

export function initComponents(app: angular.IModule): void {
    app.directive("logo", () => logo);
    app.component("header", header);
    app.component("landing", landing);
    app.component("postCard", postCard);
    app.component("stacker", stacker);
    app.component("stackerItem", stackerItem);
}
