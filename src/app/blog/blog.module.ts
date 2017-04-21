import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { BlogComponent } from "./blog.component";
import { BlogPostSummaryComponent } from "./blog-post-summary/blog-post-summary.component";
import { ServicesModule } from "../services/services.module";
import { BlogSearchComponent } from "./blog-search/blog-search.component";
import { HighlightPipe } from "../pipes/highlight/highlight.pipe";
import { BlogPostDetail } from "./blog-post-detail/blog-post-detail.component";

@NgModule({
    imports: [
        BrowserModule,
        ServicesModule.forRoot(),
        RouterModule
    ],
    declarations: [
        BlogComponent,
        BlogPostSummaryComponent,
        BlogSearchComponent,
        BlogPostDetail,
        HighlightPipe
    ],
    exports: [ BlogComponent ]
})
export class BlogModule {}