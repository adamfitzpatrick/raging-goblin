import {header} from "./header/header";
import {footer} from "./footer/footer";
import {posts} from "./posts/posts";
import {post} from "./post/post";

export function initComponents(app: angular.IModule): void {
    app.component("header", header);
    app.component("footer", footer);
    app.component("posts", posts);
    app.component("post", post);
}
