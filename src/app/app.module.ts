import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { WebGlModule } from "./web-gl/web-gl.module";
import { NavigationModule } from "./navigation/navigation.module";
import { AboutComponent } from "./about/about.component";
import { AppRoutingModule } from "./app-routing/app-routing.module";
import { BlogModule } from "./blog/blog.module";
import { ProjectsModule } from "./projects/projects.module";
import { HttpModule } from "@angular/http";

@NgModule({
    imports: [
        BrowserModule,
        WebGlModule,
        NavigationModule,
        BlogModule,
        ProjectsModule,
        AppRoutingModule,
        HttpModule
    ],
    declarations: [
        AppComponent,
        AboutComponent
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule {}