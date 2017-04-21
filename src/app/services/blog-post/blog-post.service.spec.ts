import { BlogPostService } from "./blog-post.service";
import { Post } from "../../models/post/post.model";

describe("blog post service", () => {
    let service;

    beforeEach(() => {
        service = new BlogPostService();
    });

    describe("get", () => {
        it("should get all posts when not provided an id argument", () => {
            expect(service.get() instanceof Array).toBe(true);
        });

        it("should get one post when passed an id argument", () => {
            expect(service.get("1") instanceof Post).toBe(true);
        });
    });
});