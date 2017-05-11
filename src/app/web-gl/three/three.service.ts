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
}