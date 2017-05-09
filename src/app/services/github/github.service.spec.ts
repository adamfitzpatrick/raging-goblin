import { GitHubService } from "./github.service";
import { TestBed, inject } from "@angular/core/testing";
import { HttpModule, XHRBackend, Response, ResponseOptions, BaseRequestOptions, Http } from "@angular/http";
import { MockBackend } from "@angular/http/testing";
import { GitHubRepository } from "../../models/github-repository/github-repository.model";
import { ApiUrlsService } from "../api-urls/api-urls.service";

describe("GitHubService", () => {
    let mockRepoResponse;
    let mockLanguageResponse;
    let mockStats;
    let mockReadme;

    beforeEach(() => {
        mockRepoResponse = [{
            name: "repo",
            full_name: "user/repo",
            html_url: "html_url",
            description: "description",
            npm: "npm_url",
            updated_at: new Date().toISOString(),
            clone_url: "clone_url",
            languages_url: "languages_url",
            topics: ["demo"]
        }, {
            name: "other-repo",
            full_name: "user/other-repo",
            html_url: "html_url_2",
            description: "description_2",
            npm: "npm_url_2",
            updated_at: new Date().toISOString(),
            clone_url: "clone_url_2",
            languages_url: "languages_url_2",
            topics: []
        }];
        mockLanguageResponse = [
            { javascript: 1000 },
            { typescript: 2000 }
        ];
        mockStats = [
            { total: 0, weeks: [], days: [ 0, 0, 0, 0, 0, 0, 0 ]},
        ];
        mockReadme = {
            content: btoa("readme")
        };
        TestBed.configureTestingModule({
            imports: [ HttpModule ],
            providers: [
                ApiUrlsService,
                GitHubService,
                MockBackend,
                BaseRequestOptions,
                {
                    provide: Http,
                    deps: [MockBackend, BaseRequestOptions],
                    useFactory: (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
                        return new Http(backend, defaultOptions);
                    }
                }
            ]
        });
    });

    const mockSubscribe = (mockBackend, body, error?) => {
        if (error) {
            mockBackend.connections.subscribe(connection => {
                connection.mockError(new Response(new ResponseOptions({
                    body: JSON.stringify(body)
                })));
            });
        } else {
            mockBackend.connections.subscribe(connection => {
                connection.mockRespond(new Response(new ResponseOptions({
                    body: JSON.stringify(body)
                })));
            });
        }
    };

    describe("getRepo", () => {
        it("should obtain repos for a specific user",
            inject([ GitHubService, MockBackend ], (gitHubService, mockBackend) => {
            mockSubscribe(mockBackend, mockRepoResponse);
            gitHubService.getRepos("adamfitz77hob").subscribe(repos => {
                expect(repos).toEqual(mockRepoResponse.map(repo => new GitHubRepository(repo)));
                expect(mockBackend.connectionsArray[0].request.url)
                    .toBe("https://api.github.com/users/adamfitz77hob/repos");
            });
        }));

        it("should obtain a repos for the default user",
            inject([ GitHubService, MockBackend ], (gitHubService, mockBackend) => {
            mockSubscribe(mockBackend, mockRepoResponse);
            gitHubService.getRepos().subscribe(repos => {
                expect(repos).toEqual(mockRepoResponse.map(repo => new GitHubRepository(repo)));
                expect(mockBackend.connectionsArray[0].request.url)
                    .toBe("https://api.github.com/users/adamfitzpatrick/repos");
            });
        }));

        it("should pass on an error message if there was a server error",
            inject([ GitHubService, MockBackend ], (gitHubService, mockBackend) => {
            mockSubscribe(mockBackend, { error: "error" }, true);
            gitHubService.getRepos().subscribe(() => {}, error => {
                expect(error).toEqual({ error: "error" });
            });
        }));
    });

    describe("getRepoLanguages", () => {
        it("should get language data for a repo",
            inject([ GitHubService, MockBackend ], (gitHubService, mockBackend) => {
            mockSubscribe(mockBackend, mockLanguageResponse);
            gitHubService.getRepoLanguages(mockRepoResponse[0]).subscribe(languages => {
                expect(languages).toEqual(mockLanguageResponse);
            });
        }));
    });

    describe("getRepoStats", () => {
        it("should get repo commit statistics",
            inject([ GitHubService, MockBackend ], (gitHubService, mockBackend) => {
            mockSubscribe(mockBackend, mockStats);
            gitHubService.getRepoStats(new GitHubRepository(mockRepoResponse[0])).subscribe(stats => {
                expect(stats).toEqual(mockStats);
                expect(mockBackend.connectionsArray[0].request.url)
                    .toBe("https://api.github.com/repos/user/repo/stats/commit_activity");
            });
        }));
    });

    describe("getRepoReadme", () => {
        it("should get the repo's root README.md file",
            inject([ GitHubService, MockBackend ], (gitHubService, mockBackend) => {
            mockSubscribe(mockBackend, mockReadme);
            gitHubService.getRepoReadme(new GitHubRepository(mockRepoResponse[0])).subscribe(readme => {
                expect(readme.content).toEqual("readme");
                expect(mockBackend.connectionsArray[0].request.url)
                    .toBe("https://api.github.com/repos/user/repo/readme");
            });
        }));
    })
});