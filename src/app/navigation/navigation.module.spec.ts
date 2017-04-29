import { NavigationModule } from "./navigation.module";

describe("nav bar module", () => {
    it("should be defined", () => {
        let module = new NavigationModule();
        expect(module).toBeDefined();
    });
});