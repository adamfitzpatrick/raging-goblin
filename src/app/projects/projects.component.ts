import { Component, OnInit } from "@angular/core";
import { GitHubRepository, LanguageData } from "../models/github-repository/github-repository.model";
import { GitHubService } from "../services/github/github.service";

@Component({
    selector: "projects",
    template: require("./projects.html"),
    styles: [ require("./projects.scss") ]
})
export class ProjectsComponent implements OnInit {
    projects: GitHubRepository[];

    constructor(private gitHubService: GitHubService) {}

    ngOnInit(): void {
        this.projects = [];
        this.gitHubService.getRepos().subscribe(repos => {
            this.projects = repos.filter(repo => repo.topics && repo.topics.indexOf("featured") !== -1);
        });
    }
}