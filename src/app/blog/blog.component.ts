import { Component, OnInit } from "@angular/core";
import { Post } from "../models/post/post.model";
import { BlogPostService } from "../services/blog-post/blog-post.service";
import { TargetMatch } from "../services/levenshtein/levenshtein.service";

@Component({
    styles: [ require("./blog.scss") ],
    template: require("./blog.html")
})
export class BlogComponent implements OnInit {
    posts: Post[];
    emptyResults: TargetMatch<Post>[];
    searchResults: TargetMatch<Post>[];

    constructor(private blogPostService: BlogPostService) {}

    ngOnInit(): void {
        this.posts = this.blogPostService.get();
        this.emptyResults = this.posts.map(post => ({ distance: 0, target: post } as TargetMatch<Post>));
        this.searchResults = this.emptyResults;
    }

    handleSearchResults = (results: TargetMatch<Post>[]): void => {
        this.searchResults = results || this.emptyResults;
    }
}