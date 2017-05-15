import { Injectable } from "@angular/core";
import { GlobalConfig, ApiUrlKey } from "../../models/global-config/global-config.model";

declare const CONFIG;

@Injectable()
export class ApiUrlsService {
    CONFIG: GlobalConfig = CONFIG;

    getUrl(key: ApiUrlKey, params: Object): string {
        const fullUrl = `${this.CONFIG.origin}${this.CONFIG.apiUrls[key]}`;
        if (!params) { return fullUrl; }
        return Object.keys(params).reduce((url: string, key: string) => {
            return this.replaceParameter(url, key, params[key]);
        }, fullUrl);
    }

    private replaceParameter(url: string, paramKey: string, parameter: string) {
        return url.replace(`:${paramKey}`, parameter);
    }
}