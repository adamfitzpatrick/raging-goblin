import { Component, OnInit, Input } from "@angular/core";
import { Post } from "../../models/post/post.model";
import { BlogPostService } from "../../services/blog-post/blog-post.service";
import { TargetMatch } from "../../services/levenshtein/levenshtein.service";

@Component({
    selector: "blog-post-summary",
    template: require("./blog-post-summary.html"),
    styles: [ require("./blog-post-summary.scss") ]
})
export class BlogPostSummaryComponent {
    @Input()
    post: Post;

    @Input()
    matchString: string;

    postDetail(): string { return `/blog/${this.post.id}`; }
}