import { NgModule }      from "@angular/core";

import { OceanBackgroundComponent }  from "./ocean-background/ocean-background.component";
import { BrowserModule } from "@angular/platform-browser";
import { WebGlComponent } from "./web-gl.component";

@NgModule({
    imports: [ BrowserModule ],
    declarations: [
        WebGlComponent,
        OceanBackgroundComponent
    ],
    exports: [ WebGlComponent ]
})
export class WebGlModule {}