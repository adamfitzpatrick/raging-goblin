import { Component, OnInit } from "@angular/core";
import { GitHubRepository } from "../models/github-repository/github-repository.model";
import { GitHubService } from "../services/github/github.service";

@Component({
    selector: "projects",
    templateUrl: "./projects.html",
    styleUrls: [ "./projects.scss" ]
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