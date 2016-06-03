import {header} from "./header/header";
import {footer} from "./footer/footer";
import {postList} from "./post-list/post-list";

export function initComponents(app: angular.IModule): void {
    app.component("header", header);
    app.component("footer", footer);
    app.component("postList", postList);
}
