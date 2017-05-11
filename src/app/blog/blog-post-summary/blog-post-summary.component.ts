import { Component, OnInit, Input } from "@angular/core";
import { Post } from "../../models/post/post.model";

@Component({
    selector: "blog-post-summary",
    templateUrl: "./blog-post-summary.html",
    styleUrls: [ "./blog-post-summary.scss" ]
})
export class BlogPostSummaryComponent {
    @Input()
    post: Post;

    @Input()
    matchString: string;

    postDetail(): string { return `/blog/${this.post.id}`; }
}