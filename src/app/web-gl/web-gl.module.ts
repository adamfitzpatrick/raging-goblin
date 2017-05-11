import { NgModule }      from "@angular/core";

import { OceanBackgroundDirective }  from "./ocean-background/ocean-background.directive";
import { BrowserModule } from "@angular/platform-browser";
import { WebGlComponent } from "./web-gl.component";
import { ThreeService } from "./three/three.service";

@NgModule({
    imports: [ BrowserModule ],
    declarations: [
        WebGlComponent,
        OceanBackgroundDirective
    ],
    providers: [ ThreeService ],
    exports: [ WebGlComponent ]
})
export class WebGlModule {}