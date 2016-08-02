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
            controller.$onInit();
        });

        it("should set dimensions to override size when size and width are on prototype", () => {
            LogoController.prototype.size = "large";
            LogoController.prototype.width = "100px";
            controller = new LogoController();
            controller.$onInit();
            expect(controller.width).toBe("100px");
        });

        it("should use prototype size when width is not on prototype", () => {
            LogoController.prototype.size = "large";
            delete LogoController.prototype.width;
            controller = new LogoController();
            controller.$onInit();
            expect(controller.width).toBe("200px");
        });

        describe("getStyles", () => {
            it("should return a style object for the logo", () => {
                controller.width = "1px";
                expect(controller.getStyles()).toEqual({ width: "1px" });
            });
        });
    });
});