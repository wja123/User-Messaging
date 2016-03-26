'use strict';

var app = angular.module("messApp", ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state("login", {
            url: "/",
            templateUrl: "../partials/login.html",
            controller: "loginCtrl"
        })
        .state("register", {
            url: "/register",
            templateUrl: "../partials/register.html",
            controller: "registerCtrl"
        })
        .state("messages", {
            url: "/messages",
            templateUrl: "../partials/messages.html",
            controller: "messageCtrl"
        })
        .state("profile", {
            url: "/profile",
            templateUrl: "../partials/profile.html",
            controller: "profileCtrl"
        })

        $urlRouterProvider.otherwise("/");
});