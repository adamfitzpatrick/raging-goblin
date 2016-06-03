import {angular} from "../../app";
import "angular-mocks";

describe("articlesService", () => {
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
        service = _$injector_.get("articlesService");
    }));

    it("should fetch a list of articles", () => {
        $httpBackend.expectGET(/\/articles\/$/).respond(expected);
        let actual;
        service().then((response) => actual = response);
        $httpBackend.flush();
        expect(angular.equals(actual, expected)).toBe(true);
    });
});