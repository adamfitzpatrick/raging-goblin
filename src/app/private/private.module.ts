import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { routes } from "./private.routing";
import { RouterModule } from "@angular/router";
import { PrivateComponent } from "./private.component";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        PrivateComponent
    ]
})
export class PrivateModule {}