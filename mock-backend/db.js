module.exports = () => {
    "use strict";

    let faker = require("faker");

    let totalArticles = 23;

    String.prototype.capitalize = function () {
        return this.toString().replace(/(^| )([a-z])/g, (group) => group.toUpperCase());
    };

    function Article() {
        this.id = faker.random.uuid();
        this.title = faker.company.catchPhrase().capitalize();
        this.description = faker.lorem.sentence();
        this.text = faker.lorem.paragraphs(faker.random.number(20));
    }

    let articles = [];
    while (articles.length < totalArticles) {
        articles.push(new Article());
    }

    return {
        articles: articles
    };
};