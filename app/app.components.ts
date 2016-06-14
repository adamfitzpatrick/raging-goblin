import {header} from "./header/header";
import {footer} from "./footer/footer";
import {posts} from "./posts/posts";

export function initComponents(app: angular.IModule): void {
    app.component("header", header);
    app.component("footer", footer);
    app.component("posts", posts);
}
