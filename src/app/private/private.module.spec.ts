import { PrivateModule } from "./private.module";

describe("PrivateModule", () => {
    it("should be instantiated", () => {
        expect(new PrivateModule()).toBeDefined();
    });
});