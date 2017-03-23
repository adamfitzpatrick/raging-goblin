import { Post } from "./post.model";

describe("Post", () => {
    let postObj;
    let post;

    beforeEach(() => {
        postObj = {
            id: 1,
            date: "1/1/17",
            title: "Title",
            synopsis: "synopsis",
            content: "content"
        };
        post = new Post(postObj as Post);
    });

    it("should convert a string date into a Date object", () => {
        expect(post.date instanceof Date).toBe(true);
    });
});