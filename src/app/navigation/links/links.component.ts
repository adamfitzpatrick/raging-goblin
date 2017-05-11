import { Component, Input } from "@angular/core";

@Component({
    selector: "links",
    templateUrl: "./links.html",
    styleUrls: [ "./links.scss" ]
})
export class LinksComponent {
    @Input()
    dark: boolean;
}