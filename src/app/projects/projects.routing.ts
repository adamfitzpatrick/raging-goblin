import { Routes } from "@angular/router";
import { ProjectsComponent } from "./projects.component";

export const routes: Routes = [
    { path: "", children: [{ path: "", component: ProjectsComponent }] }
];