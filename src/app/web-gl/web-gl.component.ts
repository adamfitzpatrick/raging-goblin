import { Component, OnInit } from "@angular/core";
import { ThreeService } from "./three/three.service";

@Component({
    selector: "<web-gl></web-gl>",
    styleUrls: [ "./web-gl.scss" ],
    template: `
        <ocean-background class="background" *ngIf="active"></ocean-background>
    `
})
export class WebGlComponent implements OnInit {
    active: boolean;

    constructor(private threeService: ThreeService) {}

    ngOnInit(): void {
        this.active = this.threeService.isWebGLAvailable();
    }
}
