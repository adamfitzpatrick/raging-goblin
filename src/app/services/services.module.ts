import { NgModule } from "@angular/core";
import { BlogPostService } from "./blog-post/blog-post.service";
import { LevenshteinService } from "./levenshtein/levenshtein.service";

@NgModule({})
export class ServicesModule {
    static forRoot() {
        return {
            ngModule: ServicesModule,
            providers: [
                BlogPostService,
                LevenshteinService
            ]
        };
    }
}

export {
    BlogPostService,
    LevenshteinService
}