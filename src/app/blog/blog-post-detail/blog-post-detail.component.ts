import { Component, OnInit, AfterViewInit, ViewEncapsulation } from "@angular/core";
import { BlogPostService } from "../../services/blog-post/blog-post.service";
import { Post } from "../../models/post/post.model";
import { SyntaxHighlightService } from "../../services/syntax-highlight/syntax-highlight.service";
import { ActivatedRoute, Params } from "@angular/router";

require("!!file-loader?name=[path][name].[ext]&context=./src/assets!../../../assets/images/demo-pic.png");

interface BlogRouteParams {
    blogId: string;
}

@Component({
    selector: "blog-post-detail",
    templateUrl: "./blog-post-detail.html",
    styleUrls: [ "./blog-post-detail.scss" ],
    encapsulation: ViewEncapsulation.None
})
export class BlogPostDetail implements OnInit, AfterViewInit {
    post: Post;

    constructor(
        private blogPostService: BlogPostService,
        private syntaxHighlightService: SyntaxHighlightService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.activatedRoute.params.subscribe((params: BlogRouteParams) => {
            this.post = this.blogPostService.get(params.blogId);
        });
    }

    ngAfterViewInit(): void {
        this.syntaxHighlightService.highlight();
    }
}