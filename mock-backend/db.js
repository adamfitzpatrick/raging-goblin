module.exports = () => {
    "use strict";

    let faker = require("faker");

    let totalArticles = 23;

    String.prototype.capitalize = function () {
        return this.toString().replace(/(^| )([a-z])/g, (group) => group.toUpperCase());
    };

    let imagePrototypes = ["animal", "arch", "nature", "people", "tech"];

    function Article() {
        this.id = faker.random.uuid();
        this.title = faker.company.catchPhrase().capitalize();
        this.description = faker.lorem.sentence();
        this.text = faker.lorem.paragraphs(faker.random.number(20));
        this.cover = `https://placeimg.com/640/480/${faker.random.arrayElement(imagePrototypes)}`;
    }

    let articles = [];
    while (articles.length < totalArticles) {
        articles.push(new Article());
    }

    return {
        articles: articles
    };
};