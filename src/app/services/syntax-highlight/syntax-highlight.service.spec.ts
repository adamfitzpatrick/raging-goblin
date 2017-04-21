import { SyntaxHighlightService } from "./syntax-highlight.service";

describe("syntaxHighlightService", () => {
    let service;

    beforeEach(() => {
        service = new SyntaxHighlightService();
        spyOn(service.hljs, "highlightBlock");
        spyOn(document, "getElementsByClassName").and.returnValue([0, 1]);
    });

    describe("highlight", () => {
        it("should add syntax highlighting to all highlightable blocks on page", () => {
            service.highlight();
            expect(service.hljs.highlightBlock.calls.count()).toBe(2);
        });
    });
});