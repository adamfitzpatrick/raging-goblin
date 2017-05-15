export interface ApiUrl { [url: string]: string; }

export type ApiUrlKey = "githubRepos" | "githubStats" | "githubReadme" | "githubLanguages";

export interface GlobalConfig {
    origin: string;
    apiUrls: ApiUrl;
}