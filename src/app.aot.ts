import "./polyfills.browser";
import "!style-loader!css-loader!sass-loader!./global-styles/global.scss";
import { platformBrowser } from "@angular/platform-browser";
import { AppModuleNgFactory } from "../aot/src/app/app.module.ngfactory";
import { enableProdMode } from "@angular/core";

document.addEventListener("DOMContentLoaded", () => {
    enableProdMode();
    platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
});