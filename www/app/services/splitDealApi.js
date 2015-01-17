//Register, Inject, Function Pattern
(function () {
    'use strict';

    angular
        .module('SplitDealApp')
        .factory('splitDealApi', splitDealApi);

    splitDealApi.$inject = ['$http', '$q', '$ionicLoading', 'DSCacheFactory'];

    function splitDealApi($http, $q, $ionicLoading, DSCacheFactory) {

        var currentItemId;

        self.myWatchListCache = DSCacheFactory.get("myWatchListCache");

        self.myWatchListCache.setOptions({
            onExpire: function (key, value) {
                getMyListing().then(function () {
                    console.log("my watch list cache was automatically refreshed");
                }, function () {
                    console.log("Error getting data, Putting expired items back into the cache", new Date());
                    self.myWatchListCache.put(key, value);
                });
            }
        });

        var serviceDetails = {
            getWatchlist: getWatchlist,
            getMyListing: getMyListing,
            setItemId: setItemId,
            getUsersData: getUsersData
        };
        return serviceDetails;

        function setItemId(itemId) {
            currentItemId = itemId;
        }

        //get list of items on my Listing
        function getMyListing() {
            var deferred = $q.defer(),
                cachekey = "watchlist",
                myWatchlistData = self.myWatchListCache.get(cachekey);

            if (myWatchlistData) {
                console.log("Found data inside cache", myWatchlistData);
                deferred.resolve(myWatchlistData);
            } else {

                $http.get("http://api.everlive.com/v1/IMregDJC77R1b1yM/MyListing/")
                    .success(function (data) {
                        console.log("watchlist data is called via http");
                        self.myWatchListCache.put(cachekey, data);
                        deferred.resolve(data);

                    })
                    .error(function () {
                        alert("please try again no internet");
                        console.log("Error via making http calls");
                        deferred.reject();
                    });
            }
            return deferred.promise;
        }

        function getWatchlist() {
            var deferred = $q.defer();
            $http.get("http://api.everlive.com/v1/IMregDJC77R1b1yM/Watchlist/")
                .success(function (response) {
                    deferred.resolve(response);
                })
                .error(function (error, status) {
                    console.log("Error via making http calls Watchlist ");
                    deferred.reject(error,status);
                })
            return deferred.promise;
        }

        //get all users data
        function getUsersData() {
            var deferred = $q.defer();
            $http.get("http://api.everlive.com/v1/IMregDJC77R1b1yM/Users/")
                .success(function (data) {
                    deferred.resolve(data);
                    console.log(data);
                })
                .error(function () {
                    console.log("Error via making http calls");
                    deferred.reject();
                });
            return deferred.promise;
        }
    }
})();