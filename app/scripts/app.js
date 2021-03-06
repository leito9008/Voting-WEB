"use strict";

/**
 * @ngdoc overview
 * @name webApp
 * @description
 * # webApp
 *
 * Main module of the application.
 */

(function () {
    angular
        .module("webApp", [
                "ngAnimate",
                "ngCookies",
                "ngResource",
                "ngRoute",
                "ngSanitize",
                "ngTouch",
                "ngMaterial",
                "firebase",
                "LocalStorageModule",
                "webApp.factories",
                "webApp.controllers",
                "webApp.filters",
                "webApp.directives"
        ])
        .config(config)
        .constant('FirebaseUrl', 'https://voting-web.firebaseio.com/');


    // Módulo de factories
    angular.module("webApp.factories", []);

    // Módulo de controllers
    angular.module("webApp.controllers", []);

    // Módulo de filtros
    angular.module("webApp.filters", []);

    // Módulo de directivas
    // Link con ejemplos de uso piola: http://www.sitepoint.com/practical-guide-angularjs-directives/
    angular.module("webApp.directives", []);

    /**
     * Configuración de las rutas de la aplicación
     * @param {ngRoute} $routeProvider el router de angular
     */
    function config($routeProvider, localStorageServiceProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "views/main.html",
                controller: "PostsController",
                controllerAs: "main"
            })
            .otherwise({
                redirectTo: "/"
            });

        //local storage
        localStorageServiceProvider.setPrefix('webAppStorage');
    }

}());
