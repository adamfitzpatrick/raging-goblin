import {Post} from "../models/post.model";
import {MediaService} from "../common/media/media.service";
import {WindowWidthRange} from "../common/media/media.service";
import {PostsService} from "../common/posts/posts.service";

export class LandingController {
    posts: Post[];
    featuredPost: Post;
    nonFeaturePosts: Post[];
    topPosts: Post[];
    otherPosts: Post[];

    /* @ngInject */
    constructor(postsService: PostsService, private mediaService: MediaService) {
        postsService().then(this.loadPosts);
    }

    setTopPosts(): void {
        let widthRange = this.mediaService.getWidthRange();
        if (widthRange === WindowWidthRange.LARGE) {
            this.topPosts = this.nonFeaturePosts.slice(0, 4);
        } else if (widthRange === WindowWidthRange.SMALL) {
            this.topPosts = this.nonFeaturePosts.slice(0, 2);
        } else {
            this.topPosts = [];
        }
        this.otherPosts = this.nonFeaturePosts.filter((post: Post) => {
            return !this.topPosts.some((topPost: Post) => topPost.id === post.id);
        });
    }

    private loadPosts = (posts: Post[]): void => {
        this.posts = posts;
        this.featuredPost = this.posts.filter((post: Post) => post.featured)[0];
        this.nonFeaturePosts = this.posts.filter((post: Post) => !post.featured)
            .sort(this.dateSort);
    };

    private dateSort = (a: Post, b: Post) => {
        if (a.date < b.date) { return 1; }
        if (a.date > b.date) { return -1; }
        return 0;
    }
}
