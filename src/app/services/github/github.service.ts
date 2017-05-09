import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs";
import "rxjs/add/operator/map";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/catch";
import {
    GitHubRepository, GitHubResponse, GitHubLanguageData,
    GitHubStats, GitHubReadme
} from "../../models/github-repository/github-repository.model";
import { Body } from "@angular/http/src/body";
import { ApiUrlsService } from "../api-urls/api-urls.service";

@Injectable()
export class GitHubService {

    constructor(private http: Http, private apiUrlsService: ApiUrlsService) {}

    static catchErrors(error: Body): Observable<any> {
        return Observable.throw(error && error.json());
    }

    getRepos(username?: string): Observable<GitHubRepository[]> {
        username = username || "adamfitzpatrick";
        const url = this.apiUrlsService.getUrl("githubRepos", { username });
        const headers = new Headers({ Accept: "application/vnd.github.mercy-preview+json" });
        return this.http.get(url, new RequestOptions({ headers }))
            .map(response => {
                return response.json().map((repo: GitHubResponse) => new GitHubRepository(repo));
            })
            .catch(GitHubService.catchErrors);
    }

    getRepoLanguages(repository: GitHubRepository): Observable<GitHubLanguageData> {
        return this.http.get(repository.languagesUrl)
            .map(response => response.json())
            .catch(GitHubService.catchErrors);
    }

    getRepoStats(repository: GitHubRepository): Observable<GitHubStats[]> {
        const url = this.apiUrlsService.getUrl("githubStats", { fullname: repository.fullName });
        return this.http.get(url)
            .map(response => response.json())
            .catch(GitHubService.catchErrors);
    }

    getRepoReadme(repository: GitHubRepository): Observable<GitHubReadme> {
        const url = this.apiUrlsService.getUrl("githubReadme", { fullname: repository.fullName });
        return this.http.get(url)
            .map(response => {
                const data = response.json();
                data.content = atob(data.content);
                return data;
            })
            .catch(GitHubService.catchErrors);
    }
}