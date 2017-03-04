import { AfterContentInit, ElementRef, HostListener, Directive } from "@angular/core";
import * as THREE from "three";
export const ThreeWrapper = { THREE };

@Directive({
    selector: "ocean-background"
})
export class OceanBackgroundComponent implements AfterContentInit {
    static MAX_RANGE = 3;
    static MAX_INCREMENT = 0.02;
    static WIDTH = 1000;
    static HEIGHT = 500;
    static X_SEGMENTS = 80;
    static Y_SEGMENTS = 80;
    static MATERIAL_COLOR = 0x888888;
    static CAMERA_POSITION = new ThreeWrapper.THREE.Vector3(0, 125, 300);
    static CAMERA_LOOKAT = new ThreeWrapper.THREE.Vector3(0, 0, 150);
    static LIGHT_INTENSITY = 0.7;
    static REVERSE_THRESHOLD = 0.99;

    private static parametricSurfaceFunction(u: number, v: number): THREE.Vector3 {
        u = (u - 0.5) * OceanBackgroundComponent.WIDTH;
        v = (v - 0.5) * OceanBackgroundComponent.HEIGHT;
        const height = Math.random() * OceanBackgroundComponent.MAX_RANGE;
        return new ThreeWrapper.THREE.Vector3(u, v, height);
    }

    mesh: THREE.Mesh;
    lights: THREE.PointLight[];
    geometry: THREE.Geometry;
    renderer: THREE.Renderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    vertexCreepDirections: number[] = [];

    constructor(private element: ElementRef) {}

    ngAfterContentInit(): void {
        this.setRenderer();
        this.setScene();
        this.setCamera();
        this.setLights();
        this.createMesh();

        this.renderer.render(this.scene, this.camera);

        this.animate();
    }

    @HostListener("window:resize", ["$event"])
    onResize(): void {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    };

    animate = () => {
        requestAnimationFrame(this.animate);

        this.geometry.vertices.forEach(this.adjustVertex);
        this.geometry.computeFaceNormals();
        this.geometry.computeVertexNormals();
        this.geometry.normalsNeedUpdate = true;
        this.geometry.verticesNeedUpdate = true;

        this.renderer.render(this.scene, this.camera);
    };

    adjustVertex = (vertex: THREE.Vector3, index: number): void => {
        if (
            Math.abs(vertex.z) > OceanBackgroundComponent.MAX_RANGE ||
            Math.random() > OceanBackgroundComponent.REVERSE_THRESHOLD
        ) { this.vertexCreepDirections[index] *= -1; }
        const increment = Math.random() * OceanBackgroundComponent.MAX_INCREMENT;
        const height = vertex.z += this.vertexCreepDirections[index] * increment;
        vertex.set(vertex.x, vertex.y, height);
    };

    private setRenderer() {
        this.renderer = new ThreeWrapper.THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.element.nativeElement.appendChild(this.renderer.domElement);
    }

    private setScene() {
        this.scene = new ThreeWrapper.THREE.Scene();
    }

    private setCamera() {
        this.camera = new ThreeWrapper.THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
        this.camera.position.set(
            OceanBackgroundComponent.CAMERA_POSITION.x, OceanBackgroundComponent.CAMERA_POSITION.y, OceanBackgroundComponent.CAMERA_POSITION.z
        );
        this.camera.lookAt(OceanBackgroundComponent.CAMERA_LOOKAT);
    }

    private setLights() {
        this.lights = [];
        this.lights.push(new ThreeWrapper.THREE.PointLight(0xffffff, OceanBackgroundComponent.LIGHT_INTENSITY));
        this.lights.push(new ThreeWrapper.THREE.PointLight(0xffffff, OceanBackgroundComponent.LIGHT_INTENSITY));
        this.lights.push(new ThreeWrapper.THREE.PointLight(0xffffff, OceanBackgroundComponent.LIGHT_INTENSITY));
        this.lights[0].position.set(-1000, 1000, 0);
        this.lights[ 1 ].position.set(0, 1000, 0);
        this.lights[ 2 ].position.set(1000, 1000, 0);
        this.lights.forEach(light => this.scene.add(light));
    }

    private createMesh() {
        this.geometry = new ThreeWrapper.THREE.ParametricGeometry(
            OceanBackgroundComponent.parametricSurfaceFunction, OceanBackgroundComponent.X_SEGMENTS, OceanBackgroundComponent.Y_SEGMENTS
        );
        this.initializeVectorCreep();
        const material = new ThreeWrapper.THREE.MeshPhongMaterial({
            color: OceanBackgroundComponent.MATERIAL_COLOR,
            side: ThreeWrapper.THREE.DoubleSide,
            shading: ThreeWrapper.THREE.FlatShading
        });
        this.mesh = new ThreeWrapper.THREE.Mesh(this.geometry, material);
        this.mesh.rotation.x = -1 * Math.PI / 2;
        this.scene.add(this.mesh);
    }

    private initializeVectorCreep(): void {
        this.geometry.vertices.forEach((vertex, index) => {
            this.vertexCreepDirections[index] = Math.sign(Math.random() - 0.5);
        });
    }
}
