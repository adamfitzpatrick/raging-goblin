export function initConfig(app: angular.IModule) {
    app.config(function ($httpProvider: angular.IHttpProvider,
                         $locationProvider: angular.ILocationProvider) {
        $httpProvider.interceptors.push(($q: angular.IQService, ORIGIN: string) => {
            return {
                "request": function (config) {
                    if (/^\//.test(config.url)) {
                        config.url = `${ORIGIN}${config.url}`;
                    }
                    return config;
                }
            };
        });

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    });
}
