angular.module("noteApp")
    .controller("indexController", ["$scope", "localService", function($scope, Service) {
        (function init() {
            Service.queryAllCategories().then(function(res) {
                $scope.allCategories = res.data;
            }, function(res) {
                // todo
                console.log("load failure.");
            });
        })();

        $scope.raw = {};
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
    }]);