import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { NavBarComponent } from "./nav-bar.component";
import { LinksComponent } from "./links/links.component";
import { RouterModule } from "@angular/router";

@NgModule({
    imports: [
        BrowserModule,
        RouterModule
    ],
    declarations: [
        NavBarComponent,
        LinksComponent
    ],
    exports: [ NavBarComponent ]
})
export class NavBarModule {}