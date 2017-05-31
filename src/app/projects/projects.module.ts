import { NgModule } from "@angular/core";
import { ProjectsComponent } from "./projects.component";
import { ProjectSummaryComponent } from "./project-summary/project-summary.component";
import { ServicesModule } from "../services/services.module";
import { GitHubChartComponent } from "./github-chart/github-chart.component";
import { RouterModule } from "@angular/router";
import { routes } from "./projects.routing";
import { CommonModule } from "@angular/common";

@NgModule({
    imports: [
        CommonModule,
        ServicesModule.forRoot(),
        RouterModule.forChild(routes)
    ],
    declarations: [
        ProjectsComponent,
        ProjectSummaryComponent,
        GitHubChartComponent
    ]
})
export class ProjectsModule {}