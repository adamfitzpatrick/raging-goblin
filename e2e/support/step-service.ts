import StepDefinitions = cucumber.StepDefinitions;
import StepDefinitionCode = cucumber.StepDefinitionCode;

export type StepType = "Given" | "Then" | "When";

export interface StepDescriptor {
    name?: string;
    type: StepType;
    pattern: RegExp;
    method: StepDefinitionCode;
}

class StepService {
    cucumber: StepDefinitions;
    queuedSteps: StepDescriptor[] = [];

    registerCucumber(cucumber: StepDefinitions): void {
        this.cucumber = cucumber;
        this.queuedSteps.forEach(this.registerStep);
    }

    addStep(step: StepDescriptor): void {
        if (!this.cucumber) {
            this.queuedSteps.push(step);
            return;
        }
        this.registerStep(step);
    }

    private registerStep = (step: StepDescriptor): void => {
        this.cucumber[step.type](step.pattern, step.method);
    }
}

export var stepService = new StepService();