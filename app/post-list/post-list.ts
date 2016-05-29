import {PostListController} from "./post-list.controller";
const templateUrl = require("./post-list.html");

export const postList: angular.IDirective = {
    templateUrl: templateUrl,
    controller: PostListController,
    controllerAs: "vm"
};