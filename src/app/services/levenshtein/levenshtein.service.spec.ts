import { LevenshteinService } from "./levenshtein.service";

describe("levenshtein service", () => {
    let service;

    beforeEach(() => {
        service = new LevenshteinService();
    });

    describe("getDistance", () => {
        it("should return the levenshtein distance between two strings", () => {
            expect(service.getDistance("mitten", "kitten")).toBe(1);
            expect(service.getDistance("book", "back")).toBe(2);
            expect(service.getDistance("wifflewaffler", "woofwaddling")).toBe(9);
        });
    });

    describe("findBestSubstring", () => {
        it("should find the substring which minimizes the levenshtein distance to the provided search string", () => {
            const str = "I am the very model of a modern major general";
            expect(service.findBestSubstring("modal", str)).toEqual({ match: "model", distance: 1, index: 14 });
        });
    });

    describe("searchObject", () => {
        let target;
        let searchFields;
        let expected;

        beforeEach(() => {
            target = {
                title: "Modern Major Generals",
                synopsis: "I am the very model of a modern major general",
                content: "I have information vegetable animal & mineral."
            };
            searchFields = [ "title", "synopsis", "content" ];
            expected = {
                match: "miner",
                distance: 1,
                field: "content",
                index: 38,
                target
            };
        });

        it("should return the best match found in the object's search fields", () => {
            expect(service.searchObject("minerl", target, searchFields)).toEqual(expected);
        });

        it("should not choke on an object with an undefined search field", () => {
            searchFields.push("tagString");
            expect(service.searchObject("minerl", target, searchFields)).toEqual(expected);
        });
    });
});