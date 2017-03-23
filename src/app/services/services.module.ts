import { NgModule } from "@angular/core";
import { BlogPostService } from "./blog-post/blog-post.service";

@NgModule({})
export class ServicesModule {
    static forRoot() {
        return {
            ngModule: ServicesModule,
            providers: [ BlogPostService ]
        };
    }
}

export {
    BlogPostService
}