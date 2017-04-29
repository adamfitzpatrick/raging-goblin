import { Component } from "@angular/core";

@Component({
    selector: "app-root",
    template: `
        <top-nav></top-nav>
        <main>
            <router-outlet></router-outlet>
        </main>
        <bottom-nav></bottom-nav>
        <web-gl></web-gl>
    `
})
export class AppComponent {}
