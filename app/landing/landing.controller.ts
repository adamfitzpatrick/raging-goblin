export class LandingController {
    otherPosts: number[] = [];

    /* @ngInject */
    /* istanbul ignore next */
    constructor(private $element: angular.IAugmentedJQuery) {
        for (let k = 0; k < 100; k++) { this.otherPosts.push(k); }
    }
}
