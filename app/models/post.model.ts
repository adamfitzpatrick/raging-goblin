export interface Post {
    id: string;
    date: Date;
    featured: boolean;
    tags: string[];
    title: string;
    description: string;
    text: string;
    cover: string;
    height: number;
}