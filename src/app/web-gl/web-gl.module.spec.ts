import { WebGlModule } from "./web-gl.module";

describe("WebGl module", () => {
    it("should be defined", () => {
        let module = new WebGlModule();
        expect(module).toBeDefined();
    });
});