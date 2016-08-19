import {StackerItemController} from "./stacker-item.controller";

export const stackerItem: angular.IComponentOptions = {
    controller: StackerItemController,
    require: { stacker: "^^stacker" }
};
