import { OceanBackgroundComponent, ThreeWrapper } from "./ocean-background.component";
import * as THREE from "three";

// Note that this component relies heavily on the WebGl service which is not available in PhantomJs.
// As such, testing is done using conventional class instantiation, which allows the ThreeJs module to be mocked.
describe("OceanBackgroundComponent", () => {
    let component;
    let elementRef;
    let threejs;
    let threejsSpies = {
        renderer: {
            setSize: jasmine.createSpy("renderer.setSize"),
            render: jasmine.createSpy("renderer.render")
        },
        camera: {
            updateProjectionMatrix: jasmine.createSpy("camera.updateProjectionMatrix")
        },
        scene: { add: jasmine.createSpy("scene.add") },
        geometry: {
            vertices: [ { set: jasmine.createSpy("geometry.vertices.array.set") } ],
            computeFaceNormals: jasmine.createSpy("geometry.computeFaceNormals"),
            computeVertexNormals: jasmine.createSpy("geometry.computeVertexNormals"),
            zValue: new THREE.Vector3(0, 0, 0)
        }
    };

    beforeAll(() => {
        elementRef = { nativeElement: { appendChild: jasmine.createSpy("elementRef.nativeElement.appendChild") } };

        threejs = {};

        threejs.WebGLRenderer = function () {
            this.setSize = threejsSpies.renderer.setSize;
            this.render = threejsSpies.renderer.render;
            this.domElement = "renderer.domElement";
        };
        threejs.Scene = function () {
            this.add = threejsSpies.scene.add
        };
        threejs.PerspectiveCamera = function () {
            this.position = {
                set: jasmine.createSpy("camera.position.set")
            };
            this.updateProjectionMatrix = threejsSpies.camera.updateProjectionMatrix;
            this.lookAt = jasmine.createSpy("camera.lookAt");
        };
        threejs.PointLight = function () {
            this.position = {
                set: jasmine.createSpy("light.position.set")
            };
        };
        threejs.ParametricGeometry = function (generatorFunction) {
            this.vertices = threejsSpies.geometry.vertices;
            this.computeFaceNormals = threejsSpies.geometry.computeFaceNormals;
            this.computeVertexNormals = threejsSpies.geometry.computeVertexNormals;
            threejsSpies.geometry.zValue = generatorFunction(0, 0);
        };
        threejs.MeshPhongMaterial = function () {};
        threejs.Mesh = function () {
            this.rotation = {
                x: jasmine.createSpy("mesh.rotation.x")
            };
        };
        threejs.Vector3 = THREE.Vector3;
        ThreeWrapper.THREE = threejs;
    });

    beforeEach(() => {
        component = new OceanBackgroundComponent(elementRef);
    });

    describe("ngAfterContentInit", () => {
        it("should configure the WebGl background element", () => {
            component.ngAfterContentInit();
            expect(component.renderer).toBeDefined();
            expect(component.scene).toBeDefined();
            expect(component.camera).toBeDefined();
            expect(threejsSpies.renderer.render).toHaveBeenCalledWith(component.scene, component.camera);
        });

        it("should obtain geometry z values from the parametricSurfaceFunction", () => {
            spyOn(Math, "random").and.returnValue(1);
            spyOn(component, "animate");
            component.ngAfterContentInit();
            const expected = new THREE.Vector3(
                -0.5 * OceanBackgroundComponent.WIDTH,
                -0.5 * OceanBackgroundComponent.HEIGHT,
                OceanBackgroundComponent.MAX_RANGE
            );
            expect(threejsSpies.geometry.zValue).toEqual(expected);
        });
    });

    describe("onResize", () => {
        it("should resize the view based on a new window size", () => {
            component.ngAfterContentInit();
            component.onResize();
            expect(threejsSpies.camera.updateProjectionMatrix).toHaveBeenCalled();
            expect(threejsSpies.renderer.setSize).toHaveBeenCalled();
        });
    });

    describe("adjustVertex", () => {
        let vertex;

        beforeEach(() => {
            vertex = new THREE.Vector3(0, 0, 1);
            component.vertexCreepDirections = [ 1 ];
        });

        it("should reverse the vertex creep direction if the z magnitude is at or above the maximum", () => {
            vertex.z = OceanBackgroundComponent.MAX_RANGE + 1;
            component.adjustVertex(vertex, 0);
            expect(component.vertexCreepDirections).toEqual([ -1 ]);
        });

        it("should reverse the vertex creep direction randomly", () => {
            spyOn(Math, "random").and.returnValue(1);
            component.adjustVertex(vertex, 0);
            expect(component.vertexCreepDirections).toEqual([ -1 ]);
        });

        it("should adjust the vertex z value by a random increment", () => {
            spyOn(Math, "random").and.returnValue(0.5);
            component.adjustVertex(vertex, 0);
            expect(vertex).toEqual(new THREE.Vector3(0, 0, 1 + 0.5 * OceanBackgroundComponent.MAX_INCREMENT));
        });
    });
});