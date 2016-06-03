import {PostListController} from "./post-list.controller";
const templateUrl = require("./post-list.html");

export const postList: angular.IComponentOptions = {
    controller: PostListController,
    controllerAs: "vm",
    templateUrl: templateUrl
};
