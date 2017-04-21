import { async, TestBed } from "@angular/core/testing";
import { BlogPostDetail } from "./blog-post-detail.component";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { BlogPostService } from "../../services/blog-post/blog-post.service";
import { SyntaxHighlightService } from "../../services/syntax-highlight/syntax-highlight.service";

describe("BlogPostDetail", () => {
    let component;
    let fixture;
    let blogPostService;
    let syntaxHighlightService;
    let post;

    beforeEach(async(() => {
        post = {
            id: "1",
            date: new Date(),
            title: "Test Post",
            synopsis: "Some short description of the post suitable for including at the top of the page.",
            content: [{
                type: "p",
                value: "<h1>This is a test.</h1>"
            }, {
                type: "code",
                language: "typescript",
                value: "var foo = 32;"
            }]
        };
        blogPostService = jasmine.createSpyObj("blogPostService", [ "get" ]);
        blogPostService.get.and.returnValue(post);
        syntaxHighlightService = jasmine.createSpyObj("syntaxHighlightService", [ "highlight" ]);

        TestBed.configureTestingModule({
            declarations: [ BlogPostDetail ],
            providers: [
                { provide: BlogPostService, useValue: blogPostService },
                { provide: SyntaxHighlightService, useValue: syntaxHighlightService }
            ],
            schemas: [ NO_ERRORS_SCHEMA ]
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BlogPostDetail);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should be initialized", () => {
        expect(fixture).toBeDefined();
        expect(component).toBeDefined();
        expect(blogPostService.get).toHaveBeenCalledWith("1");
        expect(component.post).toEqual(post);
    });

    it("should highlight all code syntax", () => {
        expect(syntaxHighlightService.highlight).toHaveBeenCalled();
    });
});