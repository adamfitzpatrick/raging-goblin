import {angular} from "../../app";
import "angular-mocks";
import {LogoController} from "./logo.controller";

describe("logo directive", () => {
    beforeEach(angular.mock.module("App"));

    let $injector;

    beforeEach(angular.mock.inject((_$injector_) => {
        $injector = _$injector_;
    }));

    it("compiles without error", () => {
        let $compile = $injector.get("$compile");
        let $rootScope = $injector.get("$rootScope");
        let element = $compile("<logo size='large'></logo>")($rootScope);
        expect(element.html()).toContain("logo_svg");
    });

    describe("controller", () => {
        let controller;

        beforeEach(() => {
            controller = new LogoController();
        });

        describe("getClasses", () => {
            it("should return class for size", () => {
                controller.size = "large";
                expect(controller.getClasses()).toEqual("logo--large");
            });
        });

        describe("getStyles", () => {
            it("should return a style object for the logo", () => {
                controller.width = "1px";
                expect(controller.getStyles()).toEqual({ width: "1px" });
            });
        });
    });
});