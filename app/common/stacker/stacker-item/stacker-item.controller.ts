import {StackerController} from "../stacker.controller";

export class StackerItemController {
    stacker: StackerController;

    /* @ngInject */
    constructor(private $element: angular.IAugmentedJQuery) {}

    $onInit(): void {
        this.stacker.addItem(this.$element);
        this.$element.addClass("stacker__item");
    }
}
