export function initRoutes(app: angular.IModule): void {
    app.config(($routeProvider: angular.route.IRouteProvider) => {
        $routeProvider.when("/", { template: "<posts></posts>"});
    });
}
