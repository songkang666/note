angular.module("noteApp", ["ui.router", "ngLodash"])
    .config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider.state("category", {
            url: '/',
            templateUrl: "view/category.html",
            controller: "categoryController"
        });
    }]);