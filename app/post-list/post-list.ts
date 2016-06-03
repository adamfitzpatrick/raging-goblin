import {PostListController} from "./post-list.controller";
const template = require("./post-list.html");

export const postList: angular.IComponentOptions = {
    controller: PostListController,
    controllerAs: "vm",
    template: template
};
