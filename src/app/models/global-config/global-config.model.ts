export interface ApiUrl { [url: string]: string; }

export type ApiUrlKey = "githubRepos" | "githubStats" | "githubReadme";

export interface GlobalConfig {
    origin: string;
    apiUrls: ApiUrl;
}