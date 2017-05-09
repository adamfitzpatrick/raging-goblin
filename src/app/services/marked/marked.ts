import { Injectable } from "@angular/core";
import * as marked from "marked";

@Injectable()
export class MarkedService {

    mark(markdown: string): string { return marked(markdown); }
}