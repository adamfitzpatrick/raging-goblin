import {PostsController} from "./posts.controller";
const template = require("./posts.html");

export const posts: angular.IComponentOptions = {
    controller: PostsController,
    controllerAs: "vm",
    template: template
};
