import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { AppModule } from "./app.module";

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => platformBrowserDynamic().bootstrapModule(AppModule), 3000);
});