import { AppModule } from "./app.module";

describe("App module", () => {
    it("should be defined", () => {
        let module = new AppModule();
        expect(module).toBeDefined();
    });
});