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

    describe("isWebGlAvailable", () => {
        let createElementSpy;
        const windowWebGL = "WebGLRenderingContext";

        beforeEach(() => {
            createElementSpy = spyOn(document, "createElement");
        });

        it("should return false if window.WebGLRenderingContext doesn't exist", () => {
            const renderingContext = window[ windowWebGL ];
            delete window[ windowWebGL ];
            expect(service.isWebGLAvailable()).toBe(false);
            window[ windowWebGL ] = renderingContext;
        });

        it("should return false if neither webgl nor experimental-webgl canvas context is not available", () => {
            expect(service.isWebGLAvailable()).toBe(false);
        });

        it("should return false if an error is thrown", () => {
            createElementSpy.and.throwError("error");
            expect(service.isWebGLAvailable()).toBe(false);
        });

        it("should return true if WebGLRenderingContext exists and webgl context is available", () => {
            window[windowWebGL] = window[windowWebGL] || {}; // Doesn't exist in phantomjs
            createElementSpy.and.returnValue({ getContext: (context) => context === "webgl" ? {} : void 0 });
            expect(service.isWebGLAvailable()).toBe(true);
        });

        it("should return true if WebGLRenderingContext exists and experimental-webgl context is available", () => {
            window[windowWebGL] = window[windowWebGL] || {}; // Doesn't exist in phantomjs
            createElementSpy.and.returnValue({ getContext: (context) => context === "experimental-webgl" ? {} : void 0 });
            expect(service.isWebGLAvailable()).toBe(true);
        });
    });
});