describe("post-card component", () => {
    beforeEach(angular.mock.module("App"));

    let $injector;

    beforeEach(angular.mock.inject((_$injector_) => {
        $injector = _$injector_;
    }));

    it("should compile without error", () => {
        let $compile = $injector.get("$compile");
        let $rootScope = $injector.get("$rootScope");
        let element = $compile("<post-card></post-card>")($rootScope);
        expect(element.html()).toContain("post-card");
    });
});