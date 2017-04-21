import { NgModule } from "@angular/core";
import { BlogPostService } from "./blog-post/blog-post.service";
import { LevenshteinService } from "./levenshtein/levenshtein.service";
import { SyntaxHighlightService } from "./syntax-highlight/syntax-highlight.service";

@NgModule({})
export class ServicesModule {
    static forRoot() {
        return {
            ngModule: ServicesModule,
            providers: [
                BlogPostService,
                LevenshteinService,
                SyntaxHighlightService
            ]
        };
    }
}

export {
    BlogPostService,
    LevenshteinService,
    SyntaxHighlightService
}