export interface WebpackRequire extends NodeRequire {
    context(dir: string, includeSubdirs: boolean, matchFiles: RegExp) : any;
}