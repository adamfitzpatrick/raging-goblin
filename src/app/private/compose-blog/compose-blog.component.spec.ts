import { async, TestBed, fakeAsync, tick } from "@angular/core/testing";
import { ComposeBlogComponent } from "./compose-blog.component";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { SyntaxHighlightService } from "../../services/syntax-highlight/syntax-highlight.service";

describe("ComposeBlogComponent", () => {
    let fixture;
    let component;
    let syntaxHighlightService;

    beforeEach(async(() => {
        syntaxHighlightService = { highlight: jasmine.createSpy("highlight") };
        TestBed.configureTestingModule({
            declarations: [ ComposeBlogComponent ],
            providers: [{ provide: SyntaxHighlightService, useValue: syntaxHighlightService }],
            schemas: [ NO_ERRORS_SCHEMA ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ComposeBlogComponent);
        component = fixture.componentInstance;
    });

    it("should be initialized", () => {
        expect(fixture).toBeDefined();
        expect(component).toBeDefined();
    });

    describe("setCompose", () => {
        it("should set the value of compose and not call syntax highlighter service when compose is true", () => {
            component.compose = false;
            component.setCompose(true);
            expect(component.compose).toBe(true);
            expect(component.syntaxHighlightService.highlight).not.toHaveBeenCalled();
        });

        it("should call syntax highlighter service when compose is false", fakeAsync(() => {
            component.setCompose(false);
            expect(component.compose).toBe(false);
            tick();
            expect(component.syntaxHighlightService.highlight).toHaveBeenCalled();
        }));
    });

    describe("onComposerBlur", () => {
        it("should update the blog contents for preview", () => {
            const $event = { target: { value: "blog content" }};
            component.onComposerBlur($event);
            expect(component.blogContent).toEqual("blog content");
        });
    });

    describe("blogPreview", () => {
        it("should return blog content split by yaml array separators", () => {
            component.blogContent = "blog content\n- >\nmore content";
            expect(component.blogPreview).toEqual([ "blog content\n", "\nmore content" ]);
        });
    });
});