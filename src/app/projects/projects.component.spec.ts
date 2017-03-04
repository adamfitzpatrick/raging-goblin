import { NO_ERRORS_SCHEMA } from "@angular/core";
import {
    async,
    TestBed
} from "@angular/core/testing";

import { ProjectsComponent } from "./projects.component";

describe("projects component", () => {
    let fixture;
    let component;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ ProjectsComponent ],
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
    });
});