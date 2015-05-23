'use strict';

angular.module('angularRestfulAuth', ['ngStorage', 'ngRoute', 'angular-loading-bar'])
    .config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {

        $routeProvider.
        when('/', {
            templateUrl: 'partials/home.html',
            controller: 'HomeCtrl'
        }).
        when('/signin', {
            templateUrl: 'partials/signin.html',
            controller: 'HomeCtrl'
        }).
        when('/signup', {
            templateUrl: 'partials/signup.html',
            controller: 'HomeCtrl'
        }).
        when('/me', {
            templateUrl: 'partials/me.html',
            controller: 'HomeCtrl'
        }).
        otherwise({
            redirectTo: '/'
        }); 
    }]);
