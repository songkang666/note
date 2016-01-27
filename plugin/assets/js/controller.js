angular.module("noteApp")
    .controller("indexController", ["$scope", "localService", function($scope, Service) {
        Service.queryAllNotes().then(function(res) {
            $scope.notes = res.data;
        }, function(res) {
        });
    }]);