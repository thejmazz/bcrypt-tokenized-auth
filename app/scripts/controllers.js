'use strict';

/* Controllers */

angular.module('angularRestfulAuth')

.controller('AppCtrl', ['$scope', function($scope) {
    
    $scope.currentUser = {
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
    
.controller('HomeCtrl', ['$scope', '$location', 'AuthService', function($scope, $location, AuthService) {
    
    $scope.$watch( AuthService.isAuthenticated, function(isAuthenticated) {
        $scope.token = isAuthenticated;
    });

    $scope.signin = function() {
        var formData = {
            email: $scope.email,
            password: $scope.password
        };

        AuthService.login(formData).then(function(res) {
            if (res.data.type === true) {
                $scope.setCurrentUser(res.data.data); 
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
            }
        });
    }; 
}]);
