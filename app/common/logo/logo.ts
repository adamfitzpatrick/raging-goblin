import {LogoController} from "./logo.controller";
const template = require("./logo.html");

export const logo: angular.IDirective = {
    template: template,
    controller: LogoController,
    controllerAs: "vm",
    bindToController: true,
    scope: {
        size: "@",
        width: "@"
    }
};
