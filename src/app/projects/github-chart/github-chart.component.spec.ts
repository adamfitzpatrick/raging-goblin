import { async, TestBed } from "@angular/core/testing";
import { GitHubChartComponent } from "./github-chart.component";
import { NO_ERRORS_SCHEMA } from "@angular/core";

describe("GitHubChartComponent", () => {
    let data;
    let labels;
    let color;
    let fixture;
    let component;

    beforeEach(async(() => {
        data = [ 1, 2, 3 ];
        labels = [ "a", "b", "c" ];
        color = "color";
        TestBed.configureTestingModule({
            declarations: [ GitHubChartComponent ],
            schemas: [ NO_ERRORS_SCHEMA ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GitHubChartComponent);
        component = fixture.componentInstance;
        component.labels = labels;
        component.color = color;
        component.tickCallback = () => {};
        component.chartType = "bar";

        fixture.detectChanges();
    });

    it("should be initialized", () => {
        fixture.detectChanges();
        expect(fixture).toBeDefined();
        expect(component).toBeDefined();
    });

    describe("set data", () => {
        it("should return if called with no data", () => {
            delete component.dataValues;
            component.data = void 0;
            expect(component.dataValues).toBeUndefined();
            component.data = [];
            expect(component.dataValues).toBeUndefined();
        });

        it("should not throw an error if data and labels are the same length", () => {
            expect(() => component.data = data).not.toThrow();
        });

        it("should throw an error if data and labels are not the same length", () => {
            component.labels = [ "a" ];
            expect(() => component.data = data)
                .toThrow(new Error("(Chart component) Data and labels arrays must be the same length"));
        });

        it("should utilize the default callback if one is not provided", () => {
            delete component.tickCallback;
            component.data = data;
            expect(component.tickCallback("value")).toBe("value");
        });

        it("should use the default chart type if none if provided", () => {
            delete component.chartType;
            component.data = data;
            expect(component.chartType).toBe("bar");
        });

        it("should not specify scale options for pie charts", () => {
            component.chartType = "pie";
            component.data = data;
            expect(component.options.scales).not.toBeDefined();
        });
    });
});