import { Component } from "@angular/core";

@Component({
    selector: "app-root",
    template: `
        <nav-bar></nav-bar>
        <main>
            <router-outlet></router-outlet>
        </main>
        <web-gl></web-gl>
    `
})
export class AppComponent {}
