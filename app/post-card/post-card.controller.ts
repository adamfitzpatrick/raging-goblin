export class PostCardController {

    /* @ngInject */
    constructor($element: angular.IAugmentedJQuery) {
        angular.element($element.children("div")[0]).css("height", 1500 * Math.random() + "px");
    }
}
