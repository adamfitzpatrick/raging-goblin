import { NO_ERRORS_SCHEMA } from "@angular/core";
import {
    async,
    TestBed
} from "@angular/core/testing";

import { WebGlComponent } from "./web-gl.component";
import { ThreeService } from "./three/three.service";

describe("App", () => {
    let component;
    let fixture;
    let threeService;

    // async beforeEach
    beforeEach(async(() => {
        threeService = { isWebGLAvailable: jasmine.createSpy("isWebGLAvailable") };
        threeService.isWebGLAvailable.and.returnValue(true);
        TestBed.configureTestingModule({
            declarations: [ WebGlComponent ],
            providers: [{ provide: ThreeService, useValue: threeService }],
            schemas: [ NO_ERRORS_SCHEMA ]
        })
            .compileComponents(); // compile template and css
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(WebGlComponent);
        component    = fixture.componentInstance;

        fixture.detectChanges(); // trigger initial data binding
    });

    it("should be initialized", () => {
        expect(fixture).toBeDefined();
        expect(component).toBeDefined();
    });

    it("should implement webgl when it is available", () => {
        expect(component.active).toBe(true);
    });

    it("should not implement webgl when it is not available", () => {
        threeService.isWebGLAvailable.and.returnValue(false);
        component.ngOnInit();
        expect(component.active).toBe(false)
    });
});