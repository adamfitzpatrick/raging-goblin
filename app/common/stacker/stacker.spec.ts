import {angular} from "../../app";
import "angular-mocks";
import {StackerController} from "./stacker.controller";

describe("stacker", () => {
    beforeEach(angular.mock.module("App"));

    let $injector;
    let $rootScope;

    beforeEach(angular.mock.inject((_$injector_) => {
        $injector = _$injector_;
    }));

    it("should compile without error", () => {
        let $compile = $injector.get("$compile");
        $rootScope = $injector.get("$rootScope");
        let element = $compile("<stacker>Stacker</stacker>")($rootScope);
        $rootScope.$apply();
        expect(element.html()).toContain("Stacker");
    });

    describe("controller", () => {
        let controller;
        let items;
        let $element;

        beforeEach(() => {
            items = [
                [{ offsetWidth: 100, offsetHeight: 300, offsetTop: 100 }],
                [{ offsetWidth: 100, offsetHeight: 100, offsetTop: 100 }],
                [{ offsetWidth: 100, offsetHeight: 200, offsetTop: 100 }],
                [{ offsetWidth: 100, offsetHeight: 300, offsetTop: 300 }],
            ];
            items = items.map((item, index) => {
                let hydrated;
                hydrated = [item[0]];
                hydrated.addClass = jasmine.createSpy(`addClass${index}`);
                hydrated.css = jasmine.createSpy(`css${index}`);
                return hydrated;
            });
            $element = [{ offsetTop: 100, offsetWidth: 350 }];

            spyOn($rootScope, "$watch");
            spyOn($rootScope, "$apply");
            let $window = $injector.get("$window");

            controller = new StackerController($element, $rootScope, $window);
        });

        describe("addItem", () => {
            beforeEach(() => {
                controller.items = [items[0]];
            });

            it("should push to items", () => {
                controller.addItem(items[1]);
            });

            it("should start watching item heights on the first item if itemCount isn't specified",
            () => {
                delete controller.columns;
                controller.items = [];
                controller.addItem(items[0]);
                expect($rootScope.$watch).toHaveBeenCalled();
            });

            it(`should start watching item heights when all items have been added when itemCount is
            specified`, () => {
                controller.itemCount = 2;
                controller.addItem(items[1]);
                expect($rootScope.$watch).toHaveBeenCalled();
            });

            it(`should not start watching item heights if all items have not been added and
            itemCount is specified`, () => {
                controller.itemCount = 3;
                controller.addItem(items[1]);
                expect($rootScope.$watch).not.toHaveBeenCalled();
            });
        });

        describe("arrangeContents", () => {
            it("should arrange the contents to fill shortest column and update columns array", () => {
                controller.items = items;
                controller.arrangeContents();
                expect(items[3].css).toHaveBeenCalledWith("top", "100px");
                expect(items[3].css).toHaveBeenCalledWith("left", "100px");
            });
        });

        describe("window resize", () => {
            it("should start the digest cycle", () => {
                let evt = new Event('resize');
                window.dispatchEvent(evt);
                expect($rootScope.$apply).toHaveBeenCalled();
            });
        });
    });
});