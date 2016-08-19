import {angular} from "../../../app";
import "angular-mocks";
import {StackerItemController} from "./stacker-item.controller";

describe("stackerItem directive", () => {
    beforeEach(angular.mock.module("App"));

    let $injector;
    let stackerItemElement

    beforeEach(angular.mock.inject((_$injector_) => {
        $injector = _$injector_;
    }));

    it("should compile without error", () => {
        let $compile = $injector.get("$compile");
        let $rootScope = $injector.get("$rootScope");

        let parent = $compile("<stacker></stacker>")($rootScope);
        $rootScope.$apply();
        stackerItemElement = angular.element("<stacker-item>Stacker Piece</stacker-item>");
        parent.append(stackerItemElement);

        let element = $compile(stackerItemElement)($rootScope);
        $rootScope.$apply();

        expect(element.html()).toContain("Stacker Piece");
        expect(element.controller("stackerItem") instanceof StackerItemController).toBe(true);
    });

    describe("controller", () => {
        let controller;
        let stacker;

        beforeEach(() => {
            stacker = { addItem: jasmine.createSpy("addItem") };
            spyOn(stackerItemElement, "addClass");
            StackerItemController.prototype.stacker = stacker;
            controller = new StackerItemController(stackerItemElement);
            controller.$onInit();
        });

        it(`should add the stacker item to the parent controller and stacker__item to the element
        class list`, () => {
            expect(stacker.addItem).toHaveBeenCalledWith(stackerItemElement);
            expect(stackerItemElement.addClass).toHaveBeenCalledWith("stacker__item");
        });
    });
});