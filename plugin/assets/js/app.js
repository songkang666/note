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
                name: "categories.detail",
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
                name: "createNote",
                url: "/createNote/:id",
                templateUrl: "view/createNote.html",
                resolve: {
                    Service: "localService",
                    getCategory: function(Service, $q, $stateParams) {
                        if("none" === $stateParams.id) {
                            var deferred = $q.defer();
                            console.log("yyy");
                            deferred.resolve({
                                status: 200,
                                data: {
                                    id: null,
                                    title: null
                                }
                            });
                            return deferred.promise;
                        } else {
                            return Service.queryCategory($stateParams.id);
                        }
                    }
                },
                controller: "createNoteController"
            })
            .state({
                name: "note",
                url: "/note/:id",
                templateUrl: "view/note.html",
                resolve: {
                    Service: "localService",
                    getNote: function(Service, $stateParams) {
                        return Service.queryNote($stateParams.id);
                    }
                },
                controller: "noteController"
            });
    }]);