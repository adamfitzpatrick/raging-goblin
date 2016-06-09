import {stepService} from "./step-service.ts";
import {StepType} from "./step-service";
import {StepMethod} from "./step-service";

function stepDecoratorFactory(type: StepType, pattern: RegExp) {
    return function (target: any, propertyName: string) {
        let method = <StepMethod> target[propertyName];
        stepService.addStep({ type: type, pattern: pattern, method: method });
    }
}

export function Given(pattern: RegExp) {
    return stepDecoratorFactory("Given", pattern);
}

export function Then(pattern: RegExp) {
    return stepDecoratorFactory("Then", pattern);
}

export function When(pattern: RegExp) {
    return stepDecoratorFactory("When", pattern);
}