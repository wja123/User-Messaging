'use strict';

var app = angular.module("messApp");

app.controller("loginCtrl", function($scope, $state, loginService) {
    $scope.loginFail = false;
    $scope.login = function(userInfo) {
        loginService.userLogin(userInfo);
    }

    $scope.$watch(function() {
        return loginService.success;
    }, function(cur, prev) {
        $scope.loginFail = cur;
    });
    console.log($scope.loginFail);
});

app.controller("registerCtrl", function($scope, $state, registerService) {
    $scope.registError;
    $scope.register = function(userInfo) {
      registerService.registerUser(userInfo);

    };

});

app.controller("profileCtrl", function($scope, $state, loginService) {

});

app.controller("messagesCtrl", function($scope, $state, loginService) {

});