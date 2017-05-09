import { ProjectsModule } from "./projects.module";

describe("projects module", () => {
    it("should be defined", () => {
        expect(new ProjectsModule()).toBeDefined();
    });
});