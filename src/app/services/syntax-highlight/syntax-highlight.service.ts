import * as hljs from "highlight.js";

export class SyntaxHighlightService {
    hljs = hljs;

    highlight() {
        const blocks = document.getElementsByClassName("syntax-highlightable");
        for (let k = 0; k < blocks.length; k++) {
            this.highlightBlock(blocks[k]);
        }
    }

    private highlightBlock(block: Element) {
        hljs.highlightBlock(block);
    }
}