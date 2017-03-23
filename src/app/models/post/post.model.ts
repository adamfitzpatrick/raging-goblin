export class Post {
    id: number;
    date: Date;
    title: string;
    synopsis: string;
    content: string;

    constructor(post: Post) {
        this.id = post.id;
        this.date = new Date(post.date);
        this.title = post.title;
        this.synopsis = post.synopsis;
        this.content = post.content;
    }
}