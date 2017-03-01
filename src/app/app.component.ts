import { Component } from "@angular/core";

@Component({
    selector: "app-root",
    template: `
        <header></header>
        <router-outlet></router-outlet>
        <web-gl></web-gl>
    `
})
export class AppComponent {}
