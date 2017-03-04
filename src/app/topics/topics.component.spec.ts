import { NO_ERRORS_SCHEMA } from "@angular/core";
import {
    async,
    TestBed
} from "@angular/core/testing";

import { TopicsComponent } from "./topics.component";

describe("topics component", () => {
    let fixture;
    let component;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ TopicsComponent ],
            schemas: [ NO_ERRORS_SCHEMA ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TopicsComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it("should be initialized", () => {
        expect(fixture).toBeDefined();
        expect(component).toBeDefined();
    });
});