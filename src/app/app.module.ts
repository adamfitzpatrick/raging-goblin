import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { WebGlModule } from "./web-gl/web-gl.module";
import { NavigationModule } from "./navigation/navigation.module";
import { TopicsComponent } from "./topics/topics.component";
import { ProjectsComponent } from "./projects/projects.component";
import { AboutComponent } from "./about/about.component";
import { AppRoutingModule } from "./app-routing/app-routing.module";
import { BlogModule } from "./blog/blog.module";

@NgModule({
    imports: [
        BrowserModule,
        WebGlModule,
        NavigationModule,
        BlogModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        TopicsComponent,
        ProjectsComponent,
        AboutComponent
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule {}