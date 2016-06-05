declare const CONFIG: { ORIGIN: string; };
let ORIGIN = CONFIG.ORIGIN;

export class Goblin {

    go(path: string): void {
        browser.get(`${ORIGIN}/${path}`);
    }
}