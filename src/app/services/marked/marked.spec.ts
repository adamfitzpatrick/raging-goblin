import { MarkedService } from "./marked";

describe("MarkedService", () => {
    let service;

    beforeEach(() => { service = new MarkedService(); });

    describe("mark", () => {
        it("should render markdown tokens into html", () => {
            expect(service.mark("__test__")).toBe("<p><strong>test</strong></p>\n");
        });
    });
});