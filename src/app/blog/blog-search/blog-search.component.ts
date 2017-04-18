import { Component, Input, Output } from "@angular/core";
import { Post } from "../../models/post/post.model";
import { LevenshteinService, MatchObject, TargetMatch } from "../../services/levenshtein/levenshtein.service";
import { EventEmitter } from "@angular/common/src/facade/async";

@Component({
    selector: "blog-search",
    template: require("./blog-search.html"),
    styles: [ require("./blog-search.scss") ]
})
export class BlogSearchComponent {
    @Input()
    posts: Post[];

    @Output()
    onSearch: EventEmitter<TargetMatch<Post>[]> = new EventEmitter();

    constructor(private levenshteinService: LevenshteinService) {}

    searchPosts(searchString: string): void {
        let matches;
        if (searchString) {
            matches = this.posts.map(post => {
                return this.levenshteinService.searchObject<Post>(searchString, post, Post.searchFields);
            })
                .filter(match => match.distance <= 1)
                .sort((a: TargetMatch<Post>, b: TargetMatch<Post>): number => a.distance - b.distance);
        }
        this.onSearch.emit(matches);
    }
}