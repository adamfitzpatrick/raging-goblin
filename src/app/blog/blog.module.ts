import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { BlogComponent } from "./blog.component";
import { BlogPostSummaryComponent } from "./blog-post-summary/blog-post-summary.component";
import { ServicesModule } from "../services/services.module";
import { NgFor } from "@angular/common";
import { BlogSearchComponent } from "./blog-search/blog-search.component";
import { HighlightPipe } from "../pipes/highlight/highlight.pipe";

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
        HighlightPipe
    ],
    exports: [ BlogComponent ]
})
export class BlogModule {}