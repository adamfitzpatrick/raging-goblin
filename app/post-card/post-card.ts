import {PostCardController} from "./post-card.controller";
const template = require("./post-card.html");

export const postCard: angular.IComponentOptions = {
    template: template,
    controller: PostCardController,
    controllerAs: "vm",
    bindings: {
        post: "<",
        featured: "@",
        top: "@"
    }
};
