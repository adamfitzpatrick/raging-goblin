import { async, TestBed } from "@angular/core/testing";
import { OceanBackgroundDirective } from "./ocean-background.directive";
import { ThreeService } from "../three/three.service";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { By } from "@angular/platform-browser";
import { WebGlComponent } from "../web-gl.component";

describe("OceanBackgroundDirective", () => {
    let fixture;
    let component;
    let directiveElement;
    let directive;
    let threeService;

    beforeEach(async(() => {

        threeService = jasmine.createSpyObj("threeService", [
            "WebGLRenderer",
            "Vector3",
            "Scene",
            "PerspectiveCamera",
            "PointLight",
            "ParametricGeometry",
            "MeshPhongMaterial",
            "Mesh",
            "isWebGLAvailable"
        ]);
        threeService.isWebGLAvailable.and.returnValue(true);
        threeService.WebGLRenderer.and.returnValue({
            domElement:  document.createElement("a"),
            setSize: jasmine.createSpy("WebGLRenderer.setSize"),
            render: jasmine.createSpy("WebGLRenderer.render")
        });
        threeService.Vector3.and.returnValue({
            x: 0,
            y: 1,
            z: 2,
            set: jasmine.createSpy("Vector3.set")
        });
        threeService.Scene.and.returnValue({ add: jasmine.createSpy("Scene.add") });
        threeService.PerspectiveCamera.and.returnValue({
            lookAt: jasmine.createSpy("PerspectiveCamera.lookat"),
            position: threeService.Vector3(),
            updateProjectionMatrix: jasmine.createSpy("PerspectiveCamera.updateProjectionMatrix")
        });
        threeService.PointLight.and.returnValue({ position: threeService.Vector3() });
        threeService.ParametricGeometry.and.returnValue({
            vertices: [ threeService.Vector3() ],
            computeFaceNormals: jasmine.createSpy("ParametricGeometry.computeFaceNormals"),
            computeVertexNormals: jasmine.createSpy("ParametricGeometry.computeVertexNormals")
        });
        threeService.Mesh.and.returnValue({ rotation: { x: 0 }});

        TestBed.configureTestingModule({
            declarations: [ WebGlComponent, OceanBackgroundDirective ],
            providers: [{ provide: ThreeService, useValue: threeService }],
            schemas: [ NO_ERRORS_SCHEMA ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(WebGlComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
        directiveElement = fixture.debugElement.query(By.directive(OceanBackgroundDirective));
        directive = directiveElement.injector.get(OceanBackgroundDirective);
    });

    it("should be initialized", () => {
        expect(fixture).toBeDefined();
        expect(component).toBeDefined();
        expect(threeService.WebGLRenderer().render).toHaveBeenCalled();
    });

    describe("onResize", () => {
        it("it should reset render size with current window dimensions", () => {
            directive.onResize();
            expect(threeService.WebGLRenderer().setSize).toHaveBeenCalledWith(window.innerWidth, window.innerHeight);
        });
    });

    describe("adjustVertex", () => {
        let vector;

        beforeEach(() => {
            vector = threeService.Vector3();
            directive.vertexCreepDirections = [ 1 ];
        });

        it("should increment a vertex height by a random amount", () => {
            directive.adjustVertex(vector, 0);
            const vectorComponents = vector.set.calls.mostRecent().args;
            expect(vectorComponents[2] >= 0).toBe(true);
            expect(directive.vertexCreepDirections[ 0 ]).toBe(1);
        });

        it("should reverse direction if height is beyond the maximum", () => {
            vector.z = 5;
            directive.adjustVertex(vector, 0);
            expect(directive.vertexCreepDirections[ 0 ]).toBe(-1);
        });
    });

    describe("parametricSurfaceFunction", () => {
        it("should return a random height for every point on the mesh", () => {
            expect(directive.parametricSurfaceFunction(0, 0).z).toEqual(jasmine.any(Number));
        });
    });
});
