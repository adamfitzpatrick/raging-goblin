export const MONTHS = [
    "JANUARY",
    "FEBRUARY",
    "MARCH",
    "APRIL",
    "MAY",
    "JUNE",
    "JULY",
    "AUGUST",
    "SEPTEMBER",
    "OCTOBER",
    "NOVEMBER",
    "DECEMBER"
];

export class Post {
    static searchFields = [ "title", "synopsis", "dateString" ];

    id: string;
    date: Date;
    title: string;
    synopsis: string;
    content: string[];
    tags: string[];

    constructor(post: Post) {
        this.id = post.id;
        this.date = new Date(post.date);
        this.title = post.title;
        this.synopsis = post.synopsis;
        this.content = post.content;
        this.tags = post.tags;
    }

    get dateString(): string {
        return `${MONTHS[this.date.getMonth()]} ${this.date.getDate()}, ${this.date.getFullYear()}`;
    }
}