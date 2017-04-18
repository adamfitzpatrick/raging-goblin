import { NO_ERRORS_SCHEMA } from "@angular/core";
import {
    async,
    TestBed
} from "@angular/core/testing";

import { BlogComponent } from "./blog.component";
import { BlogPostService } from "../services/blog-post/blog-post.service";

describe("blog component", () => {
    let fixture;
    let component;
    let posts;
    let blogPostService;
    let searchResults;

    beforeEach(async(() => {
        posts = [
            { id: 1, title: "Post 1", synopsis: "Post 1 synopsis" },
            { id: 2, title: "Post 2", synopsis: "Post 2 synopsis" }
        ];
        blogPostService = jasmine.createSpyObj("blogPostService", [ "get" ]);
        blogPostService.get.and.returnValue(posts);
        TestBed.configureTestingModule({
            declarations: [ BlogComponent ],
            providers: [ { provide: BlogPostService, useValue: blogPostService } ],
            schemas: [ NO_ERRORS_SCHEMA ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BlogComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it("should be initialized", () => {
        expect(fixture).toBeDefined();
        expect(component).toBeDefined();
    });

    it("should have loaded blog posts", () => {
        expect(component.posts).toEqual(posts);
        searchResults = [
            { distance: 0, target: posts[0] },
            { distance: 0, target: posts[1] }
        ];
        expect(component.searchResults).toEqual(searchResults);
    });

    describe("filterPosts", () => {
        it("should set a list of filtered posts", () => {
            component.handleSearchResults([{ distance: 0, target: posts[0] }]);
            expect(component.searchResults).toEqual([{ distance: 0, target: posts[0] }]);
        });

        it("should reset filtered posts to the empty search results array", () => {
            component.searchResults = [{ distance: 0, target: posts[0] }];
            component.handleSearchResults();
            expect(component.searchResults).toEqual(searchResults);
        });
    });
});