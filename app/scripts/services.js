'use strict';

angular.module('angularRestfulAuth')

.service('Session', function() {
    this.create = function (token) {
        this.token = token;
    }
    this.destroy = function() {
        this.token = null;
    }
})

.factory('AuthService', ['$http', 'Session', function($http, Session) {
    var authService = {};
    var baseUrl = 'http://localhost:9001'

    authService.save = function(data) {
        return $http.post(baseUrl + '/signin', data).then(function(res) {
            if (res.type === false) {
                alert(res);
            }
            
            Session.create(res.data.data.token);
            return res;
        });
    }


    authService.login = function(credentials) {
        return $http.post(baseUrl + '/authenticate', credentials).then(function(res){
            Session.create(res.data.data.token);
            return res;
        });
    }

    authService.isAuthenticated = function() {
        return !!Session.token;
    }

    authService.currentUser = function() {
        return Session.token;
    }

    authService.logout = function(callback) {
        Session.destroy();
        callback(Session.token);
    };

    return authService;
}])
