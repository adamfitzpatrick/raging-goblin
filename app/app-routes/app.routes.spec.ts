import {angular} from "../app";
import "angular-mocks";

describe("routes", () => {
    let $provide;

    beforeEach(angular.mock.module("App", (_$provide_) => {
        $provide = _$provide_;
    }));

    let $injector;
    let $route;
    let $q;
    let $timeout;
    let postsService;

    beforeEach(angular.mock.inject((_$injector_) => {
        $injector = _$injector_;
        $route = $injector.get("$route");
        $q = $injector.get("$q");
        $timeout = $injector.get("$timeout");

        postsService = jasmine.createSpy("postsService");
        $provide.value("postsService", postsService);
    }));
});