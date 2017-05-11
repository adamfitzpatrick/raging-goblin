import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Post } from "../../models/post/post.model";
import { LevenshteinService, TargetMatch } from "../../services/levenshtein/levenshtein.service";

@Component({
    selector: "blog-search",
    templateUrl: "./blog-search.html",
    styleUrls: [ "./blog-search.scss" ]
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