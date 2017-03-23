import { Component, OnInit } from "@angular/core";
import { Post } from "../models/post/post.model";
import { BlogPostService } from "../services/blog-post/blog-post.service";

@Component({
    styles: [ require("./blog.scss") ],
    template: require("./blog.html")
})
export class BlogComponent  implements OnInit {
    posts: Post[];

    constructor(private blogPostService: BlogPostService) {}

    ngOnInit(): void {
        this.posts = this.blogPostService.get();
    }
}