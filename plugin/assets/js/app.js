angular.module("noteApp", ["ui.router"])
    .config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider.state("index", {
            url: '/',
            templateUrl: "view/index.html",
            controller: "indexController"
        });
    }]);