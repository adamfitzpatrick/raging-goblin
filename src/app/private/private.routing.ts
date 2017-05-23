import { Routes } from "@angular/router";
import { PrivateComponent } from "./private.component";

export const routes: Routes = [
    { path: "", children: [{ path: "", component: PrivateComponent }]}
];