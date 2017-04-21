import { HighlightPipe } from "./highlight.pipe";

describe("highlight pipe", () => {
    let highlight;

    beforeEach(() => {
        highlight = new HighlightPipe();
    });

    describe("transform", () => {
        it("should not modify the value if there is no match string", () => {
            expect(highlight.transform("tester")).toBe("tester");
        });

        it("should wrap all matching strings in the highlight CSS class", () => {
            expect(highlight.transform("this is a testing string", "tes"))
                .toBe(`this is a <span class="highlight">tes</span>ting string`);
        });

        it("should properly escape any reserved regex strings", () => {
            expect(highlight.transform("tester$", "$")).toBe(`tester<span class="highlight">$</span>`);
        });
    });
});