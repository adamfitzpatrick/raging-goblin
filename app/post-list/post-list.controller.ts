import {Article} from "../models/article.model";
import {IArticlesService} from "../common/articles/articles.service";

export class PostListController {
    public articles: Article[];

    /* ngInject */
    constructor(articlesService: IArticlesService) {
        articlesService().then((articles: Article[]) => this.articles = articles);
    }
}
