import {ArticlesService} from "./common/articles/articles.service";

export function initServices(app: angular.IModule) {
    app.service("articlesService", ArticlesService);
}
