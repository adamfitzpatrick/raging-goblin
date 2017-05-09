import { NgModule } from "@angular/core";
import { BlogPostService } from "./blog-post/blog-post.service";
import { LevenshteinService } from "./levenshtein/levenshtein.service";
import { SyntaxHighlightService } from "./syntax-highlight/syntax-highlight.service";
import { GitHubService } from "./github/github.service";
import { ApiUrlsService } from "./api-urls/api-urls.service";
import { MarkedService } from "./marked/marked";

@NgModule({})
export class ServicesModule {
    static forRoot() {
        return {
            ngModule: ServicesModule,
            providers: [
                ApiUrlsService,
                BlogPostService,
                GitHubService,
                LevenshteinService,
                SyntaxHighlightService,
                MarkedService
            ]
        };
    }
}

export {
    ApiUrlsService,
    BlogPostService,
    GitHubService,
    LevenshteinService,
    SyntaxHighlightService
}