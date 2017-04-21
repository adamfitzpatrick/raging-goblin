import { Component, OnInit, AfterViewInit, ViewEncapsulation } from "@angular/core";
import { BlogPostService } from "../../services/blog-post/blog-post.service";
import { Post } from "../../models/post/post.model";
import { SyntaxHighlightService } from "../../services/syntax-highlight/syntax-highlight.service";

require("!!file-loader?name=[path][name].[ext]&context=./src/assets!../../../assets/images/demo-pic.png");

@Component({
    selector: "blog-post-detail",
    template: require("./blog-post-detail.html"),
    styles: [ require("./blog-post-detail.scss" ) ],
    encapsulation: ViewEncapsulation.None
})
export class BlogPostDetail implements OnInit, AfterViewInit {
    post: Post;

    constructor(
        private blogPostService: BlogPostService,
        private syntaxHighlightService: SyntaxHighlightService
    ) {}

    ngOnInit(): void {
        this.post = this.blogPostService.get("1");
    }

    ngAfterViewInit(): void {
        this.syntaxHighlightService.highlight();
    }
}