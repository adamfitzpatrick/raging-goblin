import { ApiUrlsService } from "./api-urls.service";

describe("ApiUrlsService", () => {
    let service;

    beforeEach(() => {
        service = new ApiUrlsService();
    });

    describe("getUrl", () => {
        it("should return the requested url", () => {
            expect(service.getUrl("githubRepos")).toBe("https://api.github.com/users/:username/repos");
        });

        it("should return a parameterized url", () => {
            expect(service.getUrl("githubRepos", { username: "adamfitzpatrick" }))
                .toBe("https://api.github.com/users/adamfitzpatrick/repos");
        });
    });
});