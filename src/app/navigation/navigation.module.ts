import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { TopNavComponent } from "./top-nav/top-nav.component";
import { LinksComponent } from "./links/links.component";
import { RouterModule } from "@angular/router";
import { BottomNavComponent } from "./bottom-nav/bottom-nav.component";

@NgModule({
    imports: [
        BrowserModule,
        RouterModule
    ],
    declarations: [
        TopNavComponent,
        BottomNavComponent,
        LinksComponent
    ],
    exports: [
        TopNavComponent,
        BottomNavComponent
    ]
})
export class NavigationModule {}