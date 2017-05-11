import { ThreeService } from "./three.service";
import * as THREE from "three";
describe("ThreeService", () => {
    let service;

    beforeEach(() => {
        service = new ThreeService();
    });

    it("should be defined & feature the Three renderer", () => {
        expect(service).toBeDefined();
        expect(service.WebGLRenderer).toEqual(THREE.WebGLRenderer);
    });
});