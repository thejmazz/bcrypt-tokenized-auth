'use strict';

angular.module('angularRestfulAuth')

.service('Session', function() {
    this.create = function (token) {
        this.token = token;
    }
    this.destroy = function() {
        this.token = null;
    }
    this.getToken = function() {
        return this.token;
    }
})

.factory('AuthService', ['$http', '$localStorage', 'Session', function($http, $localStorage, Session) {
    var authService = {};
    var baseUrl = 'http://localhost:9001'

    authService.save = function(data) {
        return $http.post(baseUrl + '/signup', data).then(function(res) {
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
        return !!Session.token || $localStorage.token;
    }

    authService.currentUser = function() {
        //return Session.getToken();
        return Session.token;
    }

    authService.logout = function(callback) {
        Session.destroy();
        callback(Session.token);
    };

    return authService;
}])

.factory('UserDataService', ['$http', '$q', 'Session', 'AuthService', function($http, $q, Session, AuthService) {
    var userDataService = {};
    var baseUrl = 'http://localhost:9001';

    userDataService.getUserInfo = function() {
        var req = {
            method: 'GET',
            url: baseUrl + '/me',
            headers: {
                Authorization: 'Bearer ' + AuthService.currentUser()
            }
        };

        var response = {};
        var defer = $q.defer();

        $http(req).success(function(data, status, headers, config) { 
            response = {
                success: true,
                userData: data
            };
            defer.resolve(data);
        }).error(function(data, status, headers, config) {
            response =  {
                success: false,
                userData: null
            };
            defer.resolve(data);
        });

        return defer.promise;
    };

    return userDataService;
}])
