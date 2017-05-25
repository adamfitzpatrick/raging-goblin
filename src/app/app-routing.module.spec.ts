import { ROUTES, AppRoutingModule } from "./app-routing.module";

describe("AppRoutingModule", () => {
    it("should be defined", () => {
        let module = new AppRoutingModule();
        expect(module).toBeDefined();
    });

    it("should return a promise for projects route", () => {
        const route = ROUTES.filter(route => route.path === "projects")[0];
        expect((route.loadChildren as Function)()).toEqual(jasmine.any(Promise));
    });

    it("should return a promise for private route", () => {
        const route = ROUTES.filter(route => route.path === "private")[0];
        expect((route.loadChildren as Function)()).toEqual(jasmine.any(Promise));
    });
});