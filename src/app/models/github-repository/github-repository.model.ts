import { MONTHS } from "../post/post.model";

export interface LanguageData {
    languages: string[];
    lines: number[];
    colors: string[];
}

export interface GitHubLanguageData { [language: string]: number; }

export const GitHubLanguageColors = {
    JavaScript: "#065f73",
    TypeScript: "#021b21",
    HTML: "#555",
    CSS: "#f41c54",
    Cucumber: "#00aab5",
    Gherkin: "#00aab5",
    Java: "#032c36",
    Other: "#999"
};

export interface GitHubReadme {
    type: string;
    encoding: string;
    size: number;
    name: string;
    path: string;
    content: string;
}

export interface GitHubStats {
    days: number[];
    total: number;
    week: number;
}

export interface GitHubResponse {
    id: number;
    name: string;
    full_name: string;
    html_url: string;
    npm?: string;
    description: string;
    topics: string[];
    updated_at: string;
    clone_url: string;
    languages_url: string;
    stats: GitHubStats[];
}

export class GitHubRepository implements GitHubResponse {
    id: number;
    name: string;
    full_name: string;
    html_url: string;
    npm?: string;
    description: string;
    topics: string[];
    updated_at: string;
    clone_url: string;
    languages_url: string;
    stats: GitHubStats[];

    constructor(repository: GitHubResponse) {
        this.id = repository.id;
        this.name = repository.name;
        this.full_name = repository.full_name;
        this.html_url = repository.html_url;
        this.npm = repository.npm;
        this.description = repository.description;
        this.languages_url = repository.languages_url;
        this.updated_at = repository.updated_at;
        this.clone_url = repository.clone_url;
        this.topics = repository.topics;
        this.stats = repository.stats;
    }

    get fullName(): string { return this.full_name; }

    get updatedAt(): Date { return new Date(this.updated_at); }

    get htmlUrl(): string { return this.html_url; }

    get cloneUrl(): string { return this.clone_url; }

    get languagesUrl(): string { return this.languages_url; }

    get friendlyUpdateString(): string {
        const days = Math.floor((new Date().getTime() - this.updatedAt.getTime()) / 1000 / 86400);
        if (days === 0) {
            return "today";
        } else if (days < 7) {
            return `${days} days ago`;
        } else if (days === 7) {
            return "a week ago";
        } else {
            return `${this.properCase(MONTHS[this.updatedAt.getMonth()])} ${this.updatedAt.getDate()}, ${this.updatedAt.getFullYear()}`;
        }
    }

    private properCase(str: string): string {
        return `${str.slice(0, 1).toUpperCase()}${str.slice(1, str.length).toLowerCase()}`;
    }
}