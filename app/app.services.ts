import {postsService} from "./common/posts/posts.service";
import {mediaService} from "./common/media/media.service";

export function initServices(app: angular.IModule) {
    app.service("postsService", postsService);
    app.service("mediaService", mediaService);
}
