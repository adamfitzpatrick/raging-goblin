import { NgModule } from "@angular/core";
import { RouterModule, PreloadAllModules } from "@angular/router";

import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { WebGlModule } from "./web-gl/web-gl.module";
import { HeaderComponent } from "./header/header.component";
import { ROUTES } from "./app.routes";
import { LandingComponent } from "./landing/landing.component";

@NgModule({
    imports: [
        RouterModule.forRoot(ROUTES, { preloadingStrategy: PreloadAllModules }),
        BrowserModule,
        WebGlModule
    ],
    declarations: [
        AppComponent,
        HeaderComponent,
        LandingComponent
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule {}