(function () {
    'use strict';
    angular
        .module('SplitDealApp')
        .factory('loginApi', loginApi);

    loginApi.$inject = ['$http', '$q'];

    function loginApi($http, $q) {

        var defer = $q.defer();

        var usersDetails = {
            doLogin: doLogin
        }
        return usersDetails;

        function doLogin() {
            $http.get('http://api.everlive.com/v1/IMregDJC77R1b1yM/Users')
                .success(function (response) {
                    defer.resolve(response);
                })
                .error(function (error, status) {
                    defer.reject(error);
                })
            return defer.promise;
        }
    }
})();