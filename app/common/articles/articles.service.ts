import {Article} from "../../models/article.model";
import IHttpPromiseCallbackArg = angular.IHttpPromiseCallbackArg;

export interface IArticlesService { (id?: string): angular.IPromise<Article | Article[]>; };
type ArticlesCallbackArg = IHttpPromiseCallbackArg<Article | Article[]>;

export function ArticlesService($http: angular.IHttpService) {
    return (id?: string): any => {
        id = id || "";
        return $http.get(`/articles/${id}`).then((response: ArticlesCallbackArg) => response.data);
    };
}
