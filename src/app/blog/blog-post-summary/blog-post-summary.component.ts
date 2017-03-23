import { Component, OnInit, Input } from "@angular/core";
import { Post } from "../../models/post/post.model";
import { BlogPostService } from "../../services/blog-post/blog-post.service";

const MONTHS = [
    "JANUARY",
    "FEBRUARY",
    "MARCH",
    "APRIL",
    "MAY",
    "JUNE",
    "JULY",
    "AUGUST",
    "SEPTEMBER",
    "OCTOBER",
    "NOVEMBER",
    "DECEMBER"
];

@Component({
    selector: "blog-post-summary",
    template: require("./blog-post-summary.html"),
    styles: [ require("./blog-post-summary.scss") ]
})
export class BlogPostSummaryComponent {
    @Input()
    post: Post;

    getDateString(): string {
        return `${MONTHS[this.post.date.getMonth()]} ${this.post.date.getDate()}, ${this.post.date.getFullYear()}`;
    }
}