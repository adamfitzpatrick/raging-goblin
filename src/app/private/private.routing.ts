import { Routes } from "@angular/router";
import { PrivateComponent } from "./private.component";
import { ComposeBlogComponent } from "./compose-blog/compose-blog.component";

export const routes: Routes = [
    {
        path: "",
        component: PrivateComponent,
        children: [
            { path: "", redirectTo: "compose-blog", pathMatch: "full" },
            { path: "compose-blog", component: ComposeBlogComponent }
        ]
    }
];