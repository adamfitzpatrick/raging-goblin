import { NavBarModule } from "./nav-bar.module";

describe("nav bar module", () => {
    it("should be defined", () => {
        let module = new NavBarModule();
        expect(module).toBeDefined();
    });
});