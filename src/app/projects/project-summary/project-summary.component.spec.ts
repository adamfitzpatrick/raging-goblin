import { NO_ERRORS_SCHEMA } from "@angular/core";
import {
    async,
    TestBed
} from "@angular/core/testing";
import { ProjectSummaryComponent } from "./project-summary.component";
import { GitHubRepository, GitHubResponse } from "../../models/github-repository/github-repository.model";
import { GitHubService } from "../../services/github/github.service";
import { MarkedService } from "../../services/marked/marked";

describe("project-summary component", () => {
    let gitHubService;
    let githubReadme;
    let githubLanguages;
    let markedService;
    let fixture;
    let component;
    let project;

    beforeEach(async(() => {
        githubReadme = {
            content: "Header\n\n<!--- bit --->\nreadme __1__\n<!--- /bit --->\n\nreadme 2"
        };
        project = new GitHubRepository({
            name: "project",
            description: "description",
            updated_at: new Date().toISOString(),
            topics: [ "featured", "topic" ]
        } as any as GitHubResponse);
        githubLanguages = {
            JavaScript: 1000,
            TypeScript: 1000,
            Cucumber: 1000,
            FakeLanguage: 3
        };
        gitHubService = jasmine.createSpyObj("gitHubService", [ "getRepoReadme", "getRepoLanguages" ]);
        gitHubService.getRepoReadme.and.returnValue({ subscribe: (callback) => { callback(githubReadme); }});
        gitHubService.getRepoLanguages.and.returnValue({ subscribe: (callback) => { callback(githubLanguages); }});
        markedService = jasmine.createSpyObj("markedService", [ "mark" ]);
        markedService.mark.and.returnValue("marked readme");
        TestBed.configureTestingModule({
            declarations: [ ProjectSummaryComponent ],
            providers: [
                { provide: GitHubService, useValue: gitHubService },
                { provide: MarkedService, useValue: markedService }
            ],
            schemas: [ NO_ERRORS_SCHEMA ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProjectSummaryComponent);
        component = fixture.componentInstance;
        component.project = project;

        fixture.detectChanges();
    });

    it("should be initialized", () => {
        expect(fixture).toBeDefined();
        expect(component).toBeDefined();
    });

    it("should render the first paragraph of readme markdown into html", () => {
        expect(component.excerpt).toBe("marked readme");
        expect(markedService.mark).toHaveBeenCalledWith("readme __1__");
    });

    it("should map language data for charting", () => {
        expect(component.languageData).toEqual({
            languages: [ "JavaScript", "TypeScript", "Cucumber", "FakeLanguage" ],
            lines: [ 1000, 1000, 1000, 3 ],
            colors: [ "#065f73", "#021b21", "#00aab5", "#999" ]
        });
    });

    describe("getTopics", () => {
        it("should return all topics except 'featured'", () => {
            expect(component.getTopics()).toEqual([ "topic" ]);
        });
    });
});