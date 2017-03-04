import { Component, Input } from "@angular/core";

@Component({
    selector: "links",
    template: require("./links.html"),
    styles: [ require("./links.scss") ]
})
export class LinksComponent {
    @Input()
    dark: boolean;
}