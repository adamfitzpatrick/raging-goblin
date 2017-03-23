import { ServicesModule } from "./services.module";

describe("services module", () => {

    it("should be newable", () => {
        expect(new ServicesModule()).toBeDefined();
    });

    describe("forRoot", () => {
        it("should return module and providers", () => {
            const services = ServicesModule.forRoot();
            expect(services.ngModule).toBeDefined();
            expect(services.providers).toBeDefined();
        });
    });
});