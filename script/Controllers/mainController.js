app.controller('MainController',['$scope','$http',function($scope, $http){
    var scope = $scope;
    scope.users = [];
    $http.get('../data.json').success(function(data){
        scope.users = data;
    });
}]);