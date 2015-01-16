(function () {
    'use strict';
    angular
        .module("SplitDealApp")
        .factory("salePostDataApi", salePostDataApi);
    salePostDataApi.$inject = ['$http', '$q' ];

    function salePostDataApi($http, $q) {
        var defer = $q.defer();

        function createSalePost(postData) {
            $http.post('http://api.everlive.com/v1/IMregDJC77R1b1yM/SalePosts', postData)
                .success(function (response) {
                    defer.resolve(response);
                })
                .error(function (error, status) {
                    defer.reject(error);
                })
            return defer.promise;
        }

        return{
            createSalePost: createSalePost
        };
    }

})();