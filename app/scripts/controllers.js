'use strict';

/* Controllers */

angular.module('angularRestfulAuth')

.controller('AppCtrl', ['$scope', '$localStorage', function($scope, $localStorage) {
    
    if ($localStorage.user) {
        $scope.currentUser = $localStorage.user;
    } else $scope.currentUser = {
        _id: null,
        email: null,
        password: null,
        token: null
    };

    $scope.setCurrentUser = function(user) {
        if (!user) {
            $scope.currentUser = {
                _id: null,
                email: null,
                password: null,
                token: null
            };
        } else {
            $scope.currentUser = {
                _id: user._id,
                email: user.email,
                password: user.password,
                token: user.token
            }
        }
    }   
}])
    
.controller('HomeCtrl', ['$scope', '$location', '$localStorage', 'AuthService', function($scope, $location, $localStorage, AuthService) {
    
    $scope.$watch( AuthService.isAuthenticated, function(isAuthenticated) {
        $scope.token = isAuthenticated;
    });

    $scope.signin = function() {
        var formData = {
            email: $scope.email,
            password: $scope.password
        };

        var stayLogged = $scope.stayLogged;

        AuthService.login(formData).then(function(res) {
            if (res.data.type === true) {
                $scope.setCurrentUser(res.data.data); 
                if (stayLogged) {
                    $localStorage.token = res.data.data.token;
                    $localStorage.user = res.data.data;
                    $localStorage.$save();
                } else {
                    delete $localStorage.token;
                    delete $localStorage.user;
                    $localStorage.$save(); 
                }
                $location.path('/me');
            } else {
                alert('invalid password');
            }
        });    
    };

    $scope.signup = function() {
        var formData = {
            email: $scope.email,
            password: $scope.password
        }

        AuthService.save(formData).then(function(res) {
            $scope.setCurrentUser(res.data.data);
            $location.path('/me');
        })
    };

    $scope.logout = function() {
        AuthService.logout(function(token){
            if (!token) {
                // Session successfully ended
                $scope.setCurrentUser(null);
                delete $localStorage.token;
                delete $localStorage.user;
                $localStorage.$save();
            }
        });
    }; 
}]);
