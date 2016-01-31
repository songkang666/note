angular.module("noteApp")
    .controller("categoriesController", ["$scope", "$state", function($scope, $state) {
        $scope.title = $state.current.data.title;
        $state.go("categories.all");
    }])
    .controller("categoriesAllController", ["$scope", "$state", "Service", "getAllCategories", function($scope, $state, Service, getAllCategories) {
        $scope.allCategories = getAllCategories.data;
        $scope.raw = {};

        $scope.show = function(category) {
            $state.go("categories.detail", {id: category.id});
            // todo go to category
        }
        $scope.create = function(event) {
            var keyCode = event.keyCode;
            var title = $scope.raw.title;
            if(13 === keyCode) {
                if("string" === typeof title && title.length > 0) {
                    Service.addCategory(title).then(function(res) {
                        $scope.raw.title = '';
                        $scope.allCategories.entries.push(res.data);
                        $scope.allCategories.count += 1;
                    }, function(res) {
                        // todo
                        console.log("create category error.");
                    });
                }
                return;
            }
        }
    }])
    .controller("categoryController", ["$scope", "$state", "Service", "getCategory", function($scope, $state, Service, getCategory) {
        $scope.category = getCategory.data;
    }])
    .controller("createNoteController", ["$scope", "$state", "Service", "getCategory", function($scope, $state, Service, getCategory) {
        $scope.category = getCategory.data;
    }])
    .controller("noteController", ["$scope", "$state", "Service", function($scope, $state, Service) {
    }]);