import {angular} from "../app";
import "angular-mocks";
import {LandingController} from "./landing.controller";
/*
describe("landing component", () => {
    beforeEach(angular.mock.module("App"));

    let $injector;

    beforeEach(angular.mock.inject((_$injector_) => {
        $injector = _$injector_;
    }));

    it("should compile correctly", () => {
        let $compile = $injector.get("$compile");
        let $rootScope = $injector.get("$rootScope");
        let element = $compile("<landing></landing>")($rootScope);
        $rootScope.$apply();
        expect(element.html()).toContain("landing");
    });

    describe("controller", () => {
        let controller;

        beforeEach(() => {
            controller = new LandingController();
        });
    });
});
*/