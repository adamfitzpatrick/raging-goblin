import {Post} from "../models/post.model";
import {MediaService} from "../common/media/media.service";
import {WindowWidthRange} from "../common/media/media.service";

export class PostCardController {
    post: Post;

    /* @ngInject */
    constructor(private mediaService: MediaService) {}

    getCoverStyle(): Object {
        if (this.mediaService.getWidthRange() === WindowWidthRange.OBSOLETE) { return {}; }
        return this.post && { "background-image": `url(${this.post.cover})` };
    }
}
