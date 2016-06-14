export function initFilters(app: angular.IModule) {
    app.filter("ellipsis", ellipsis);
}

export function ellipsis() {
    return (input: string, length) => {
        return `${input.slice(0, length)}...`;
    };
}
