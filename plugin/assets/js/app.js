angular.module("noteApp", ["ui.router", "ngLodash"])
    .config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/categories');
        $stateProvider
            .state({
                name: "categories",
                url: '/categories',
                templateUrl: "view/categories.html",
                data: {
                    title: "我的笔记"
                },
                controller: "categoriesController"
            })
            .state({
                name: "categories.all",
                url: "/all",
                templateUrl: "view/categories.all.html",
                resolve: {
                    Service: "localService",
                    getAllCategories: function(Service) {
                        return Service.queryAllCategories();
                    }
                },
                controller: "categoriesAllController"
            });
            // .state("category.add", {
            //     url: "/add"
            // });
    }]);