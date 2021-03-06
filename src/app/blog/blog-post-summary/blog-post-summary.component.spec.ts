import { NO_ERRORS_SCHEMA } from "@angular/core";
import {
    async,
    TestBed
} from "@angular/core/testing";

import { BlogPostSummaryComponent } from "./blog-post-summary.component";
import { HighlightPipe } from "../../pipes/highlight/highlight.pipe";

describe("blog post summary component", () => {
    let fixture;
    let component;
    let post;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ BlogPostSummaryComponent, HighlightPipe ],
            schemas: [ NO_ERRORS_SCHEMA ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        post = { id: "1", date: new Date("3/1/2017"), title: "Title", synopsis: "synopsis" };
        fixture = TestBed.createComponent(BlogPostSummaryComponent);
        component = fixture.componentInstance;
        component.post = post;

        fixture.detectChanges();
    });

    it("should be initialized", () => {
        expect(fixture).toBeDefined();
        expect(component).toBeDefined();
    });

    describe("postDetail", () => {
        it("should return a route to the blog post detail", () => {
            expect(component.postDetail()).toBe("/blog/1");
        });
    });
});