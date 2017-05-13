import { Component, OnInit, ViewChild, ElementRef, Input } from "@angular/core";
import * as Chart from "chart.js";

@Component({
    selector: "github-chart",
    templateUrl: "./github-chart.html",
    styleUrls: [ "./github-chart.scss" ]
})
export class GitHubChartComponent {

    dataValues: number[];
    @Input() title: string;
    @Input() labels: any[];
    @Input() tickCallback: (value: any, index: any) => string;
    @Input() chartType: "bar" | "line" | "pie";
    @Input() colors: string | string[];
    @Input() canvasWidth: string;
    @Input() canvasHeight: string;
    @ViewChild("canvas") canvas: ElementRef;
    ctx: CanvasRenderingContext2D;
    options: Chart.ChartOptions;

    @Input() set data(dataValues: number[]) {
        if (!dataValues || !dataValues.length) { return; }
        this.dataValues = dataValues;
        this.tickCallback = this.tickCallback || this.defaultTickCallback;
        this.colors = this.colors || "rgb(244, 28, 84)";
        this.chartType = this.chartType || "bar";
        if (this.dataValues.length !== this.labels.length) {
            throw Error("(Chart component) Data and labels arrays must be the same length");
        }
        this.ctx = this.canvas.nativeElement.getContext("2d");
        this.makeChart();
    }

    private makeChart() {

        this.options = {
            title: {
                display: !!this.title,
                text: this.title,
                position: "bottom"
            },
            tooltips: {
                bodyFontSize: 9
            },
            legend: { display: false },
            scales: {
                xAxes: [ {
                    ticks: {
                        callback: this.tickCallback
                    }
                } ]
            }
        };
        if (this.chartType === "pie") { delete this.options.scales; }
        new Chart(this.ctx, {
            type: this.chartType,
            data: {
                labels: this.labels,
                datasets: [
                    {
                        backgroundColor: this.colors,
                        borderWidth: 0,
                        data: this.dataValues
                    }
                ]
            },
            options: this.options
        });
    }

    private defaultTickCallback = (value: any) => { return value; };
}