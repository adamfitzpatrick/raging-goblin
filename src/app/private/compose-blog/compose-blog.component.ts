import { Component } from "@angular/core";
import { SyntaxHighlightService } from "../../services/syntax-highlight/syntax-highlight.service";

@Component({
    selector: "compose-blog",
    templateUrl: "./compose-blog.html",
    styleUrls: [ "./compose-blog.scss" ]
})
export class ComposeBlogComponent {
    compose: boolean = true;
    blogContent: string;

    constructor(private syntaxHighlightService: SyntaxHighlightService) {}

    setCompose(value: boolean): void {
        this.compose = value;
        if (!value) { setTimeout(() => this.syntaxHighlightService.highlight(), 0); }
    }

    onComposerBlur(event: FocusEvent) {
        this.blogContent = (event.target as HTMLTextAreaElement).value;
    }

    get blogPreview(): string[] { return this.blogContent.split("- >"); }
}