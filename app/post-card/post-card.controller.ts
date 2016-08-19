let faker = require("faker");

export class PostCardController {
    text: string;

    /* @ngInject */
    constructor($element: angular.IAugmentedJQuery) {
        this.text = faker.lorem.paragraphs(faker.random.number(10));
    }
}
