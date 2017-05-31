import "./polyfills.browser";
import "!style-loader!css-loader!sass-loader!./global-styles/global.scss";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { AppModule } from "./app/app.module";

document.addEventListener("DOMContentLoaded", () => {
    platformBrowserDynamic().bootstrapModule(AppModule);
});