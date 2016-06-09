import {Given} from "../support/cucumber-decorators";
import {Then} from "../support/cucumber-decorators";

const chai = require("chai");
chai.use(require("chai-as-promised"));

let expect = chai.expect;

export class LandingSteps {

    @Given(/^I go to the landing page$/)
    goToLanding(next) {
        browser.get("http://localhost:7001/");
        next();
    }

    @Then(/^I should see the header$/)
    seeTheHeader(next) {
        expect(element(by.tagName("header")).isPresent()).to.eventually.equal(true);
        next();
    }
}