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
            })
            .state({
                name: "category",
                parent: "categories",
                url: "/:id",
                templateUrl: "view/category.html",
                resolve: {
                    Service: "localService",
                    getCategory: function(Service, $stateParams) {
                        return Service.queryCategory($stateParams.id);
                    }
                },
                controller: "categoryController"
            })
            .state({
                name: "note",
                url: "/category/:categoryID/note/:noteID",
                templateUrl: "view/note.html",
                resolve: {
                    Service: "localService",
                    getCategory: function(Service, $stateParams) {
                        return Service.queryCategory($stateParams.categoryID);
                    },
                    getNote: function(Service, $stateParams) {
                        return Service.queryNote($stateParams.noteID);
                    }
                },
                controller: "noteController"
            });
    }]);