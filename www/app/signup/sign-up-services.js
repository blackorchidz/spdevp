(function () {
    'use strict';
    angular
        .module('SplitDealApp')
        .factory('signUpApi', signUpApi);

    signUpApi.$inject = ['$http', '$q'];

    function signUpApi($http, $q) {

        var defer = $q.defer();

        var signUpDetails = {
            doSignUp: doSignUp
        }
        return signUpDetails;

        function doSignUp(signUpData) {
            $http.post('http://api.everlive.com/v1/IMregDJC77R1b1yM/Users', signUpData)
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