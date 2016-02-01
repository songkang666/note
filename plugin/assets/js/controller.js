angular.module("noteApp")
    .controller("categoriesController", ["$scope", "$state", function($scope, $state) {
        $scope.title = $state.current.data.title;
        $state.go("categories.all");
    }])
    .controller("categoriesAllController", ["$scope", "$state", "Service", "getAllCategories", function($scope, $state, Service, getAllCategories) {
        $scope.allCategories = getAllCategories.data;
        $scope.raw = {};

        $scope.showCategory = function(category) {
            Service.queryCategory(category.id).then(function(res) {
                $scope.showCreate = false;
                $scope.selectedCategory = res.data;
            }, function(res) {
            });
        }
        $scope.createCategory = function(event) {
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
        $scope.createNote = function() {
            var rawNote = {
                title: "无标题笔记",
                content: ""
            }
            Service.addNote(rawNote, $scope.selectedCategory.id).then(function(res) {
                $state.go("note", {categoryID: $scope.selectedCategory.id, noteID: res.data.id});
            }, function(res) {
            });
        }
        $scope.showNote = function(note) {
            $state.go("note", {categoryID: $scope.selectedCategory.id, noteID: note.id});
        }
    }])
    .controller("categoryController", ["$scope", "$state", "Service", "getCategory", function($scope, $state, Service, getCategory) {
        $scope.category = getCategory.data;
        $scope.createNote = function() {
            var rawNote = {
                title: "无标题笔记",
                content: ""
            }
            Service.addNote(rawNote, $scope.category.id).then(function(res) {
                $state.go("note", {categoryID: $scope.category.id, noteID: res.data.id});
            }, function(res) {
            });
        }
        $scope.showNote = function(note) {
            $state.go("note", {categoryID: $scope.category.id, noteID: note.id});
        }
    }])
    .controller("noteController", ["$scope", "$state", "Service", "getCategory", "getNote", function($scope, $state, Service, getCategory, getNote) {
        $scope.category = getCategory.data;
        $scope.note = getNote.data;
        // $scope.createNote = function() {
        //     var rawNote = {
        //         title: "无标题笔记",
        //         content: ""
        //     }
        //     Service.addNote(rawNote, $scope.category.id).then(function(res) {
        //         $state.go("note", {categoryID: $scope.category.id, noteID: res.data.id});
        //     }, function(res) {
        //     });
        // }
        // $scope.showNote = function(note) {
        //     $state.go("note", {categoryID: $scope.category.id, noteID: note.id});
        // }
    }]);