'use strict';

var app = angular.module("messApp");

app.service("loginService", function($http) {
  this.success;
    this.userLogin = function(loginInfo) {
        $http.post("/users/authenticate",loginInfo).then(res=>{
          this.success = true;
        },err=>{
          this.success = false;
        });
    };

});

app.service("registerService", function($http) {
    this.registerUser = function(user) {
      console.log(user);
        $http.post("/users/register",user).then(res=>{
          this.registered = true;
        },err=>{
          this.registered = false;
        });
    };


});

app.service("messageService", function($http) {

});

app.service("profileService", function($http) {

});