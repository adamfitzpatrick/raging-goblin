import { Component } from "@angular/core";

@Component({
    selector: "app-root",
    template: `
        <header></header>
        <main>
            <router-outlet></router-outlet>
        </main>
        <web-gl></web-gl>
    `
})
export class AppComponent {}
