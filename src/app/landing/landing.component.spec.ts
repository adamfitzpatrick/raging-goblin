import { async, TestBed } from "@angular/core/testing";
import { LandingComponent } from "./landing.component";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
describe("LandingComponent", () => {
    let fixture;
    let component;
    let router;
    let route;

    beforeEach(async(() => {
        router = jasmine.createSpyObj("routerSpy", [ "navigate" ]);
        route = { snapshot: { queryParams: { direct: "projects" }}};
        TestBed.configureTestingModule({
            declarations: [ LandingComponent ],
            providers: [
                { provide: Router, useValue: router },
                { provide: ActivatedRoute, useFactory: () => route }
                ],
            schemas: [ NO_ERRORS_SCHEMA ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LandingComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it("should be initialized", () => {
        expect(fixture).toBeDefined();
        expect(component).toBeDefined();
    });

    describe("ngOnInit", () => {
        it("should redirect to the specific page when the page is valid", () => {
            expect(router.navigate).toHaveBeenCalledWith([ "/projects" ]);
        });

        it("should redirect to the blog page when the request is not valid", () => {
            route.snapshot.queryParams.direct = "404";
            component.ngOnInit();
            expect(router.navigate).toHaveBeenCalledWith([ "/blog" ]);
        });
    });
});