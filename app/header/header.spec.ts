import {angular} from "../app";
import "angular-mocks";
import {HeaderController} from "./header.controller";

describe("header component", () => {
    beforeEach(angular.mock.module("App"));

    let $injector;

    beforeEach(angular.mock.inject((_$injector_) => {
        $injector = _$injector_;
    }));

    it("should compile without error", () => {
        let $compile = $injector.get("$compile");
        let $rootScope = $injector.get("$rootScope");
        let element = $compile("<header></header>")($rootScope);
        $rootScope.$apply();
        expect(element.html()).toContain("header");
    });

    describe("controller", () => {
        let controller;

        beforeEach(() => {
            controller = new HeaderController();
        });

        describe("toggleDrawer", () => {
            it("should toggle the value of isDrawerOpen", () => {
                expect(controller.isDrawerOpen).toBe(false);
                controller.toggleDrawer();
                expect(controller.isDrawerOpen).toBe(true);
                controller.toggleDrawer();
                expect(controller.isDrawerOpen).toBe(false);
            });
        });

        describe("getDrawerOpenClass", () => {
            it("should return empty string if drawer is closed", () => {
                expect(controller.getDrawerOpenClass()).toBe("");
            });

            it("should return dropdown--active if drawer is open", () => {
                controller.isDrawerOpen = true;
                expect(controller.getDrawerOpenClass()).toBe("dropdown--active");
            });
        });
    });
});