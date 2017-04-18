import { PipeTransform, Pipe } from "@angular/core";

@Pipe({ name: "highlight" })
export class HighlightPipe implements PipeTransform {

    transform(value: string, matchString: string): string {
        if (!matchString) { return value; }
        const pattern = new RegExp(`(${this.escapeRegExp(matchString)})`, "ig");
        return value.replace(pattern, `<span class="highlight">$1</span>`);
    }

    private escapeRegExp(str) {
        return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    }
}