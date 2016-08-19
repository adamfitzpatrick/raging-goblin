const template = require("./stacker.html");
import {StackerController} from "./stacker.controller";

export const stacker: angular.IComponentOptions = {
    controller: StackerController,
    template: template,
    transclude: true,
    bindings: { itemCount: "<" }
};
