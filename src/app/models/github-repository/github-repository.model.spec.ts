import { GitHubRepository, GitHubResponse, GitHubStats } from "./github-repository.model";
import { fakeAsync, tick } from "@angular/core/testing";

describe("GitHubRepository", () => {
    let dateString;
    let repo;

    beforeEach(() => {
        dateString = "2017-02-05T06:23:34Z";
        repo = new GitHubRepository({
            id: 1,
            name: "repo",
            full_name: "user/repo",
            html_url: "html_url",
            description: "description",
            npm: "npm_url",
            updated_at: dateString,
            clone_url: "clone_url",
            languages_url: "languages_url",
            topics: [],
            stats: []
        } as GitHubResponse);
    });

    describe("fullName", () => {
        it("should return the full repo name", () => {
            expect(repo.fullName).toBe("user/repo");
        });
    });

    describe("updatedAt", () => {
        it("should return a date for the last repository update", () => {
            expect(repo.updatedAt).toEqual(new Date(dateString));
        });
    });

    describe("htmlUrl", () => {
        it("should return a url for the repo website", () => {
            expect(repo.htmlUrl).toEqual("html_url");
        });
    });

    describe("cloneUrl", () => {
        it("should return a url for cloning the repo", () => {
            expect(repo.cloneUrl).toBe("clone_url");
        });
    });

    describe("languagesUrl", () => {
        it("should return a url for repo language data", () => {
            expect(repo.languagesUrl).toBe("languages_url");
        });
    });

    describe("friendlyUpdateString", () => {
        let updated;

        beforeEach(() => updated = new Date());

        it("should return today if the repo was updated today", () => {
            repo.updated_at = updated.toISOString();
            expect(repo.friendlyUpdateString).toBe("today");
        });

        it("should return the number of days since the update if the repo was updated in the last 7 days", () => {
            updated.setTime(new Date().getTime() - 1000 * 86400 * 3);
            repo.updated_at = updated.toISOString();
            expect(repo.friendlyUpdateString).toBe("3 days ago");
        });

        it("should return a week ago if the repo was updated a week ago", () => {
            updated.setTime(new Date().getTime() - 1000 * 86400 * 7);
            repo.updated_at = updated.toISOString();
            expect(repo.friendlyUpdateString).toBe("a week ago");
        });

        it("should return the date if the repo was updated longer than 1 week ago", () => {
            repo.updated_at = new Date("1/1/17").toISOString();
            expect(repo.friendlyUpdateString).toBe("January 1, 2017");
        });
    });
});