import {postsService} from "./common/articles/posts.service";

export function initServices(app: angular.IModule) {
    app.service("postsService", postsService);
}
