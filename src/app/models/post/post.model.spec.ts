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
            content: ["<p></p>"],
            tags: ["one", "two"]
        };
        post = new Post(postObj as Post);
    });

    it("should convert a string date into a Date object", () => {
        expect(post.date instanceof Date).toBe(true);
    });

    describe("dateString", () => {
        it("should return a properly formatted string representation of post date", () => {
            expect(post.dateString).toBe("JANUARY 1, 2017");
        });
    });

    describe("tagString", () => {
        it("should return a comma separated list of tags", () => {
            expect(post.tagString).toBe("one, two");
        });
    });
});