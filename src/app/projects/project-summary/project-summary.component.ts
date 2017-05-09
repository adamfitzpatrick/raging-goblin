import { Component, Input, OnInit } from "@angular/core";
import {
    GitHubRepository, GitHubLanguageData, LanguageData, GitHubLanguageColors
} from "../../models/github-repository/github-repository.model";
import { GitHubService } from "../../services/github/github.service";
import { MarkedService } from "../../services/marked/marked";

const BIT_SEARCH_PATTERN = /<!--- bit --->\n([\s\S]+)\n<!--- \/bit --->/;

@Component({
    selector: "project-summary",
    template: require("./project-summary.html"),
    styles: [ require("./project-summary.scss") ]
})
export class ProjectSummaryComponent implements OnInit {
    @Input() project: GitHubRepository;
    excerpt: string;
    languageData: LanguageData = { languages: [], lines: [], colors: [] };

    constructor(
        private gitHubService: GitHubService,
        private markedService: MarkedService
    ) {}

    ngOnInit(): void {
        this.fetchReadme(this.project);
        this.fetchLanguages(this.project);
    }

    getTopics(): string[] {
        return this.project && this.project.topics.filter(topic => topic !== "featured");
    }

    private fetchReadme = (repository: GitHubRepository): void => {
        this.gitHubService.getRepoReadme(repository).subscribe(readme => {
            const search = BIT_SEARCH_PATTERN.exec(readme.content);
            this.excerpt = search && search.length && this.markedService.mark(search[1]);
        });
    };

    private fetchLanguages = (repository: GitHubRepository): void => {
        this.gitHubService.getRepoLanguages(repository).subscribe(this.processLanguages);
    }

    private processLanguages = (languages: GitHubLanguageData): void => {
        this.languageData = Object.keys(languages)
            .reduce((languageData: LanguageData, key: string): LanguageData => {
            languageData.languages.push(key);
            languageData.lines.push(languages[key]);
            languageData.colors.push(GitHubLanguageColors[key] || GitHubLanguageColors.Other);
            return languageData;
        }, { languages: [], lines: [], colors: [] });
    }
}