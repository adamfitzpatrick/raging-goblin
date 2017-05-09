import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { ProjectsComponent } from "./projects.component";
import { ProjectSummaryComponent } from "./project-summary/project-summary.component";
import { ServicesModule } from "../services/services.module";
import { GitHubChartComponent } from "./github-chart/github-chart.component";

@NgModule({
    imports: [
        BrowserModule,
        ServicesModule.forRoot(),
    ],
    declarations: [
        ProjectsComponent,
        ProjectSummaryComponent,
        GitHubChartComponent
    ]
})
export class ProjectsModule {}