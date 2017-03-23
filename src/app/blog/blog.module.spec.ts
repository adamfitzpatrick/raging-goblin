import { BlogModule } from "./blog.module";

describe("blog module", () => {
    it("should be defined", () => {
        expect(new BlogModule()).toBeDefined();
    });
});