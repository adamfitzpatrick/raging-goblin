import {Goblin} from "../common/driver.e2e.spec.ts";

describe('raging goblin landing page', function() {
    let goblin;

    beforeAll(() => {
        goblin = new Goblin();
    });

    it('should show the header', function() {
        goblin.go("");
        expect(element(by.tagName("header")).isPresent()).toBe(true);
        /*browser.get('https://angularjs.org');

        element(by.model('todoList.todoText')).sendKeys('write first protractor test');
        element(by.css('[value="add"]')).click();

        var todoList = element.all(by.repeater('todo in todoList.todos'));
        expect(todoList.count()).toEqual(3);
        expect(todoList.get(2).getText()).toEqual('write first protractor test');

        // You wrote your first test, cross it off the list
        todoList.get(2).element(by.css('input')).click();
        var completedAmount = element.all(by.css('.done-true'));
        expect(completedAmount.count()).toEqual(2);*/
    });
});