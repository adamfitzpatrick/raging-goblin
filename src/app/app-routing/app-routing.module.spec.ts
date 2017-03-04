import { AppRoutingModule } from "./app-routing.module";

describe("nav bar module", () => {
    it("should be defined", () => {
        let module = new AppRoutingModule();
        expect(module).toBeDefined();
    });
});