import {angular} from "../../app";
import "angular-mocks";

describe("postsService", () => {
    beforeEach(angular.mock.module("App"));

    let $httpBackend;
    let service;
    let expected;

    beforeEach(angular.mock.inject((_$injector_, _$httpBackend_) => {
        expected = [
            { id: "1", title: "Test 1" },
            { id: "2", title: "Test 2" }
        ];
        $httpBackend = _$httpBackend_;
        service = _$injector_.get("postsService");
    }));

    it("should fetch a list of posts", () => {
        $httpBackend.expectGET(/\/posts\/$/).respond(expected);
        service().then((response) => expect(response).toEqual(expected));
        $httpBackend.flush();
    });
});