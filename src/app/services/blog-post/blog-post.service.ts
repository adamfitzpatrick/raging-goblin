import { Injectable } from "@angular/core";
import { Post } from "../../models/post/post.model";

declare let POSTS: Post[];

@Injectable()
export class BlogPostService {
    posts: Post[];

    constructor() {
        this.posts = POSTS.map(post => new Post(post));
    }

    get(): Post[];
    get(id: string): Post;
    get(id?: string): Post[] | Post {
        if (id) {
            const post = this.posts.filter(post => post.id === id);
            return post && post[0];
        }
        return this.posts;
    }
}