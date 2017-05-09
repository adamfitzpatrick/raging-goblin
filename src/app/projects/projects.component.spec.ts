import { NO_ERRORS_SCHEMA } from "@angular/core";
import {
    async,
    TestBed
} from "@angular/core/testing";

import { ProjectsComponent } from "./projects.component";
import { GitHubService } from "../services/github/github.service";
import { GitHubRepository, GitHubResponse } from "../models/github-repository/github-repository.model";

describe("projects component", () => {
    let projects;
    let subscriberCallback;
    let gitHubService;
    let fixture;
    let component;

    beforeEach(async(() => {
        projects = [{
            id: 1,
            name: "raging-goblin",
            html_url: "https://github.com/adamfitzpatrick/raging-goblin",
            description: `An elegantly written and carefully composed blog regarding the hottest and most scintillating
                topics in web development, math and science.`,
            updated_at: new Date(),
            topics: ["featured"]
        } as any as GitHubResponse, {
            id: 2,
            name: "non-demo",
            html_url: "https://github.com/adamfitzpatrick/non-demo",
            description: `boring`,
            updated_at: new Date(),
            topics: []
        } as any as GitHubResponse].map(repo => new GitHubRepository(repo));
        gitHubService = jasmine.createSpyObj("gitHubService", [ "getRepos"  ]);
        gitHubService.getRepos.and.returnValue({ subscribe: (callback) => { callback(projects); } });

        TestBed.configureTestingModule({
            declarations: [ ProjectsComponent ],
            providers: [{ provide: GitHubService, useValue: gitHubService }],
            schemas: [ NO_ERRORS_SCHEMA ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProjectsComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it("should be initialized", () => {
        expect(fixture).toBeDefined();
        expect(component).toBeDefined();
        expect(component.projects).toEqual([ projects[0] ]);
    });
});