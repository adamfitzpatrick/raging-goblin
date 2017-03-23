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

    beforeEach(async(() => {
        posts = [
            { id: 1, date: new Date(), title: "Post 1", synopsis: "Post 1 synopsis" }
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
        expect(component.posts).toBeDefined();
    });
});