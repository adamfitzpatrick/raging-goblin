const MONTHS = [
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
    static searchFields = [ "title", "synopsis", "content", "dateString" ];

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

    get dateString(): string {
        return `${MONTHS[this.date.getMonth()]} ${this.date.getDate()}, ${this.date.getFullYear()}`;
    }
}