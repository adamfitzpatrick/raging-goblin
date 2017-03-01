import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { WebGlModule } from "./web-gl/web-gl.module";
import { HeaderComponent } from "./header/header.component";
import { BlogComponent } from "./blog/blog.component";
import { ROUTES } from "./app.routes";

@NgModule({
    imports: [
        RouterModule.forRoot(ROUTES),
        BrowserModule,
        WebGlModule
    ],
    declarations: [
        AppComponent,
        HeaderComponent,
        BlogComponent
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule {}