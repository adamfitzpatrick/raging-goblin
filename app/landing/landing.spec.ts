import {angular} from "../app";
import "angular-mocks";
import {LandingController} from "./landing.controller";

describe("landing component", () => {
    beforeEach(angular.mock.module("App"));

    let $injector;
    let $timeout;
    let postsService;
    let posts;

    let dateOffsetter = (days) => {
        let date = new Date();
        date.setDate(date.getDate() - days);
        return date;
    };

    beforeEach(angular.mock.module(($provide) => {
        postsService = jasmine.createSpy("postsService");
        $provide.value("postsService", postsService)
    }));


    beforeEach(angular.mock.inject((_$injector_) => {
        posts = [{
            id: 1,
            featured: false,
            title: "Post 1",
            date: dateOffsetter(0)
        }, {
            id: 2,
            featured: true,
            title: "Post 2",
            date: dateOffsetter(2)
        }, {
            id: 3,
            featured: false,
            title: "Post 3",
            date: dateOffsetter(1)
        }, {
            id: 4,
            featured: false,
            title: "Post 4",
            date: dateOffsetter(1)
        }, {
            id: 5,
            featured: false,
            title: "Post 5",
            date: dateOffsetter(4)
        }, {
            id: 6,
            featured: false,
            title: "Post 6",
            date: dateOffsetter(3)
        }, {
            id: 7,
            featured: false,
            title: "Post 7",
            date: dateOffsetter(4)
        }, {
            id: 8,
            featured: false,
            title: "Post 8",
            date: dateOffsetter(6)
        }, {
            id: 9,
            featured: false,
            title: "Post 9",
            date: dateOffsetter(5)
        }];
        $injector = _$injector_;
        let $q = $injector.get("$q");
        $timeout = $injector.get("$timeout");
        postsService.and.returnValue($q.when(posts));
    }));

    it("should compile correctly", () => {
        let $compile = $injector.get("$compile");
        let $rootScope = $injector.get("$rootScope");
        let element = $compile("<landing></landing>")($rootScope);
        $rootScope.$digest();
        expect(element.html()).toContain("landing");
    });

    describe("controller", () => {
        let controller;
        let mediaService;

        beforeEach(() => {
            mediaService = $injector.get("mediaService");
            spyOn(mediaService, "getWidthRange").and.returnValues(0);

            controller = new LandingController(postsService, mediaService);
            $timeout.flush();
        });

        it("should load posts", () => {
            expect(controller.posts).toEqual(posts);
            expect(controller.featuredPost).toEqual(posts[1]);
            expect(controller.nonFeaturePosts)
                .toEqual([posts[0], posts[2], posts[3], posts[5], posts[4], posts[6], posts[8], posts[7]]);
        });

        describe("setTopPosts", () => {
            it("should set the four most recent non-feature posts for standard screens", () => {
                controller.setTopPosts();
                expect(controller.topPosts).toEqual([posts[0], posts[2], posts[3], posts[5]]);
                expect(controller.otherPosts).toEqual([posts[4], posts[6], posts[8], posts[7]]);
            });

            it("should set the two most recent non-feature posts for narrow screens", () => {
                mediaService.getWidthRange.and.returnValue(1);
                controller.setTopPosts();
                expect(controller.topPosts).toEqual([posts[0], posts[2]]);
                expect(controller.otherPosts)
                    .toEqual([posts[3], posts[5], posts[4], posts[6], posts[8], posts[7]]);
            });

            it("should set nothing for mobile device screens", () => {
                mediaService.getWidthRange.and.returnValue(2);
                controller.setTopPosts();
                expect(controller.topPosts).toEqual([]);
                expect(controller.otherPosts).toEqual(controller.nonFeaturePosts);
            });
        });
    });
});