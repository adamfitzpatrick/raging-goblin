import { Routes, RouterModule } from "@angular/router";
import { BlogComponent } from "../blog/blog.component";
import { AboutComponent } from "../about/about.component";
import { ProjectsComponent } from "../projects/projects.component";
import { NgModule } from "@angular/core";
import { BlogPostDetail } from "../blog/blog-post-detail/blog-post-detail.component";

export const ROUTES: Routes = [
    { path: "blog", component: BlogComponent },
    { path: "blog/:blogId", component: BlogPostDetail },
    { path: "projects", component: ProjectsComponent },
    { path: "about", component: AboutComponent },
    { path: "",   redirectTo: "/blog", pathMatch: "full" },
    { path: "**", component: BlogComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(ROUTES)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}