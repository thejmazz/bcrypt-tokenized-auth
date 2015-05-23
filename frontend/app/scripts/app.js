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

        /*$httpProvider.interceptors.push(['$q', '$location', '$localStorage', 'AuthService',
            function($q, $location, $localStorage, AuthService) {
                return {
                    'request': function(config) {
                        config.headers = config.headers || {};
                        if (AuthService.isAuthenticated()) {
                            config.headers.Authorization = 'Bearer ' + AuthService.currentUser();
                        } 
                        return config;
                    },
                    'responseError': function(response) {
                        if (response.status === 401 || response.status === 403) {
                            $location.path('/signin');
                        }
                        return $q.reject(response);
                    }
                };
            }
        ]);*/
    }]);
