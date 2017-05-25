import { async, TestBed } from "@angular/core/testing";
import { PrivateComponent } from "./private.component";
import { NO_ERRORS_SCHEMA } from "@angular/core";

describe("PrivateComponent", () => {
    let fixture;
    let component;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ PrivateComponent ],
            schemas: [ NO_ERRORS_SCHEMA ]
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PrivateComponent);
        component = fixture.componentInstance;
    });

    it("should be initialized", () => {
        expect(fixture).toBeDefined();
        expect(component).toBeDefined();
    });
});