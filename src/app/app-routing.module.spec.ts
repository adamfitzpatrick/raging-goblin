import { ROUTES, AppRoutingModule } from "./app-routing.module";

describe("nav bar module", () => {
    it("should be defined", () => {
        let module = new AppRoutingModule();
        expect(module).toBeDefined();
    });

    it("should return a promise for projects route", () => {
        expect((ROUTES[3].loadChildren as Function)()).toEqual(jasmine.any(Promise));
    });
});