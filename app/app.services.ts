import {postsService} from "./common/posts/posts.service";

export function initServices(app: angular.IModule) {
    app.service("postsService", postsService);
}
