import {HeaderController} from "./header.controller";
const template = require("./header.html");

export const header: angular.IComponentOptions = {
    template: template,
    controller: HeaderController,
    controllerAs: "vm"
};
