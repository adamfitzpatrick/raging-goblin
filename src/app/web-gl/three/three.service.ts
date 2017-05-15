import { Injectable } from "@angular/core";
import {
    WebGLRenderer,
    Vector3,
    Scene,
    PerspectiveCamera,
    PointLight,
    ParametricGeometry,
    MeshPhongMaterial,
    Mesh,
    DoubleSide,
    FlatShading
} from "three";

const WindowWebGlRenderingContext = "WebGLRenderingContext";

@Injectable()
export class ThreeService {
    WebGLRenderer = WebGLRenderer;
    Vector3 = Vector3;
    Scene = Scene;
    PerspectiveCamera = PerspectiveCamera;
    PointLight = PointLight;
    ParametricGeometry = ParametricGeometry;
    MeshPhongMaterial = MeshPhongMaterial;
    Mesh = Mesh;
    DoubleSide = DoubleSide;
    FlatShading = FlatShading;

    isWebGLAvailable(): boolean {
        try {
            const canvas = document.createElement( "canvas" );
            return !!(window[WindowWebGlRenderingContext] && (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")));
        } catch ( e ) {
            return false;
        }
    }
}