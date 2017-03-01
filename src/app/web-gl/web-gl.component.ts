import { Component } from "@angular/core";

@Component({
    selector: "<web-gl></web-gl>",
    styles: [ require("./web-gl.scss") ],
    template: `
        <ocean-background class="background"></ocean-background>
    `
})
export class WebGlComponent {}
