import { NO_ERRORS_SCHEMA } from "@angular/core";
import {
    async,
    TestBed
} from "@angular/core/testing";

import { AppComponent } from "./app.component";

describe("App", () => {
    let component;
    let fixture;

    // async beforeEach
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ AppComponent ],
            schemas: [ NO_ERRORS_SCHEMA ]
        })
            .compileComponents(); // compile template and css
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        component    = fixture.componentInstance;

        fixture.detectChanges(); // trigger initial data binding
    });

    it("should be initialized", () => {
        expect(fixture).toBeDefined();
        expect(component).toBeDefined();
    });
});