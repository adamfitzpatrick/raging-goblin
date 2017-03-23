import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { BlogComponent } from "./blog.component";
import { BlogPostSummaryComponent } from "./blog-post-summary/blog-post-summary.component";
import { ServicesModule } from "../services/services.module";
import { NgFor } from "@angular/common";

@NgModule({
    imports: [
        BrowserModule,
        ServicesModule.forRoot(),
        RouterModule
    ],
    declarations: [
        BlogComponent,
        BlogPostSummaryComponent
    ],
    exports: [ BlogComponent ]
})
export class BlogModule {}