import { NO_ERRORS_SCHEMA } from "@angular/core";
import {
    async,
    TestBed
} from "@angular/core/testing";

import { BlogSearchComponent } from "./blog-search.component";
import { LevenshteinService } from "../../services/levenshtein/levenshtein.service";

describe("blog search component", () => {
    let fixture;
    let levenshteinService;
    let component;
    let posts;
    let postsMatches;

    beforeEach(async(() => {
        levenshteinService = jasmine.createSpyObj("levenshteinService", [ "searchObject" ]);
        TestBed.configureTestingModule({
            declarations: [ BlogSearchComponent ],
            providers: [{ provide: LevenshteinService, useValue: levenshteinService }],
            schemas: [ NO_ERRORS_SCHEMA ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        posts = [
            { title: "Post 1", synopsis: "Post one description", content: "Lots and lots of post content" },
            { title: "Post 2", synopsis: "Post two descriptor", content: "More fascinating content" },
            { title: "Post 3", synopsis: "Post three descriptor", content: "Even more fascinating content" }
        ];

        fixture = TestBed.createComponent(BlogSearchComponent);
        component = fixture.componentInstance;
        component.posts = posts;

        fixture.detectChanges();
    });

    it("should be initialized", () => {
        expect(fixture).toBeDefined();
        expect(component).toBeDefined();
    });

    describe("searchPosts", () => {
        it("should emit search event with posts and match information sorted by quality", () => {
            const match1 = { distance: 0, target: posts[0] };
            const match2 = { distance: 2, target: posts[1] };
            const match3 = { distance: 1, target: posts[2] };
            levenshteinService.searchObject.and.returnValues(match1, match2, match3);
            component.onSearch.subscribe(matches => {
                expect(matches.length).toBe(2);
                expect(matches[0].target).toEqual(posts[0]);
                expect(matches[1].target).toEqual(posts[2]);
                component.onSearch.unsubscribe();
            });
            component.searchPosts("post");
        });

        it("should emit search event with no payload if search string is empty", () => {
            component.onSearch.subscribe(matches => {
                expect(matches).toBeUndefined();
                component.onSearch.unsubscribe();
            });
            component.searchPosts();
        });
    });
});