import {angular} from "../../app";
import "angular-mocks";
import {mediaService} from "./media.service";

describe("media service", () => {
    beforeEach(angular.mock.module("App"));

    let $injector;
    let $window;
    let service;
    let $rootScope;

    beforeEach(angular.mock.inject((_$injector_) => {
        $injector = _$injector_;
        $window = $injector.get("$window");
        $window.innerHeight = 1000;
        $rootScope = $injector.get("$rootScope");
        service = mediaService($window, $rootScope);
    }));

    describe("getWidthRange", () => {
        it("should return the correct range for large screen widths", () => {
            $window.innerWidth = 1000;
            expect(service.getWidthRange()).toBe(0);
        });

        it("should return the correct range for small screen widths", () => {
            $window.innerWidth = 700;
            expect(service.getWidthRange()).toBe(1);
        });

        it("should return the correct range for handheld screen widths", () => {
            $window.innerWidth = 400;
            expect(service.getWidthRange()).toBe(2);
        });

        it("should return the correct range for obsolete screen widths", () => {
            $window.innerWidth = 300;
            expect(service.getWidthRange()).toBe(3);
        });
    });

    describe("getAspectRatioRange", () => {
        it("should return the correct range for wide screens", () => {
            $window.innerWidth = 2000;
            expect(service.getAspectRatioRange()).toBe(0);
        });

        it("should return the correct range for narrow screens", () => {
            $window.innerWidth = 1000;
            expect(service.getAspectRatioRange()).toBe(1);
        });
    });

    describe("addWatch", () => {
        it("should accept a function to execute on media changes", () => {
            spyOn($rootScope, "$watch");
            service.addWatch(angular.noop);
            expect($rootScope.$watch).toHaveBeenCalledWith(jasmine.any(Function), jasmine.any(Function));
        });
    });
});