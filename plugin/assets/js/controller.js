var ToDoApp = angular.module('todoApp', []);

ToDoApp.controller('ToDoListController', function ($scope) {
  $scope.todos = [
    {'title': '1. Nexus S',
     'content': 'Fast just got faster with Nexus S.'},
    {'title': '2. Motorola XOOM™ with Wi-Fi',
     'content': 'The Next, Next Generation tablet.'},
    {'title': '3. MOTOROLA XOOM™',
     'content': 'The Next, Next Generation tablet.'}
  ];
});