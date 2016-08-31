import {angular} from "../app";
import "angular-mocks";
import {PostCardController} from "./post-card.controller";
import {MediaService} from "../common/media/media.service";
import {WindowWidthRange} from "../common/media/media.service";

describe("post-card component", () => {
    beforeEach(angular.mock.module("App"));

    let $injector;
    let post;

    beforeEach(angular.mock.inject((_$injector_) => {
        $injector = _$injector_;
        post = {
            id: 1,
            date: new Date(),
            featured: true,
            title: "Post 1",
            description: "This is a very important post.",
            text: "This is the post content.",
            cover: "images/some-image.jpg"
        };
    }));

    it("should compile without error", () => {
        let $compile = $injector.get("$compile");
        let $rootScope = $injector.get("$rootScope");
        $rootScope.post = post;
        let element = $compile("<post-card post='post'></post-card>")($rootScope);
        expect(element.html()).toContain("post-card");
    });

    describe("controller", () => {
        let controller;
        let mediaService;

        beforeEach(() => {
            mediaService = $injector.get("mediaService");
            spyOn(mediaService, "getWidthRange").and.returnValue(WindowWidthRange.LARGE);
            controller = new PostCardController(mediaService);
            controller.post = post;
        });

        describe("getCoverStyle", () => {
            it("should return styling for the cover image", () => {
                expect(controller.getCoverStyle()).toEqual({
                    "background-image": "url(images/some-image.jpg)"
                });
            });

            it("should return no styling for obsolete devices", () => {
                mediaService.getWidthRange.and.returnValue(WindowWidthRange.OBSOLETE);
                expect(controller.getCoverStyle()).toEqual({});
            })
        });

        describe("isPositioned", () => {
            it("should return true if positioned is a string", () => {
                controller.positioned = "";
                expect(controller.isPositioned()).toBe(true);
            });

            it("should return false if positioned is undefined", () => {
                controller.positioned = void 0;
                expect(controller.isPositioned()).toBe(false);
            });
        });
    });
});