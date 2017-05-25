import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { routes } from "./private.routing";
import { RouterModule } from "@angular/router";
import { PrivateComponent } from "./private.component";
import { ComposeBlogComponent } from "./compose-blog/compose-blog.component";
import { FormsModule } from "@angular/forms";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        PrivateComponent,
        ComposeBlogComponent
    ]
})
export class PrivateModule {}