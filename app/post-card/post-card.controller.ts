import {Post} from "../models/post.model";
import {MediaService} from "../common/media/media.service";
import {WindowWidthRange} from "../common/media/media.service";

export class PostCardController {
    post: Post;
    positioned: string;

    /* @ngInject */
    constructor(private mediaService: MediaService) {}

    getCoverStyle(): Object {
        if (this.mediaService.getWidthRange() === WindowWidthRange.OBSOLETE) { return {}; }
        return this.post && { "background-image": `url(${this.post.cover})` };
    }

    isPositioned(): boolean { return typeof this.positioned === "string"; }
}
