import { NO_ERRORS_SCHEMA } from "@angular/core";
import {
    async,
    TestBed
} from "@angular/core/testing";

import { BlogPostSummaryComponent } from "./blog-post-summary.component";

describe("blog post summary component", () => {
    let fixture;
    let component;
    let post;

    beforeEach(async(() => {
        post = { id: 1, date: new Date("3/1/2017"), title: "Title", synopsis: "synopsis" };
        TestBed.configureTestingModule({
            declarations: [ BlogPostSummaryComponent ],
            schemas: [ NO_ERRORS_SCHEMA ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BlogPostSummaryComponent);
        component = fixture.componentInstance;
        component.post = post;

        fixture.detectChanges();
    });

    it("should be initialized", () => {
        expect(fixture).toBeDefined();
        expect(component).toBeDefined();
    });

    describe("getDateString", () => {
        it("should return a date string with capitalized month", () => {
            expect(component.getDateString()).toBe("MARCH 1, 2017");
        });
    });
});