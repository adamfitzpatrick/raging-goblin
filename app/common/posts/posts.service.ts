import {Post} from "../../models/post.model";

export interface PostsService { (id?: string): angular.IPromise<Post | Post[]>; }

export function postsService($http: angular.IHttpService) {
    return (id?: string): any => {
        id = id || "";
        return $http.get(`/posts/${id}`)
            .then((response: angular.IHttpPromiseCallbackArg<Post | Post[]>) => response.data);
    };
}
