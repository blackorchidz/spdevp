//Register, Inject, Function Pattern
(function () {
    'use strict';

    angular
        .module('SplitDealApp')
        .factory('splitDealApi', splitDealApi);

    splitDealApi.$inject = ['$http', '$q', '$ionicLoading', 'DSCacheFactory'];

    function splitDealApi($http, $q, $ionicLoading, DSCacheFactory) {

        var currentItemId;

        self.myWatchlistCache = DSCacheFactory.get("myWatchlistCache");
        self.myListingCache = DSCacheFactory.get("myListingCache");

        self.myWatchlistCache.setOptions({
            onExpire: function (key, value) {
                getWatchlist().then(function () {
                    console.log("Watchlist cache was automatically refreshed");
                }, function () {
                    console.log("Error in putting expired items back into the cache", new Date());
                    self.myWatchlistCache.put(key, value);
                });
            }
        });

        self.myListingCache.setOptions({
            onExpire: function (key, value) {
                getMyListing().then(function () {
                    console.log("my Listing cache was automatically refreshed");
                }, function () {
                    console.log("Error getting data, Putting expired items back into cache", new Date());
                    self.myListingCache.put(key, value);
                });
            }
        });

        var serviceDetails = {
            getWatchlist: getWatchlist,
            getMyListing: getMyListing,
            setItemId: setItemId,
            getLoginDetails: getLoginDetails
        };
        return serviceDetails;

        function setItemId(itemId) {
            currentItemId = itemId;
        }

        //get list of items on my Listing
        function getMyListing() {
            var deferred = $q.defer(),
                cachekey = "myListing",
                myListingData = self.myListingCache.get(cachekey);

            if (myListingData) {
                console.log("Found data inside cache", myListingData);
                deferred.resolve(myListingData);
            } else {
                $http.get("http://api.everlive.com/v1/IMregDJC77R1b1yM/MyListing/")
                    .success(function (data) {
                        console.log("my Listing data is called via http");
                        self.myListingCache.put(cachekey, data);
                        deferred.resolve(data);
                    })
                    .error(function (error, status) {
                        //alert("please try again no internet");
                        console.log("Error via making http calls");
                        deferred.reject(error, status);
                    });
            }
            return deferred.promise;
        }

        function getWatchlist() {
            var deferred = $q.defer(),
                cacheKey = "watchlist",
                myWatchlistData = self.myWatchlistCache.get(cacheKey);
            if (myWatchlistData) {
                console.log("Found data inside cache", myWatchlistData);
                deferred.resolve(myWatchlistData);
            } else {
                $http.get("http://api.everlive.com/v1/IMregDJC77R1b1yM/Watchlist/")
                    .success(function (response) {
                        console.log("my Watchlist data is called via http");
                        self.myWatchlistCache.put(cacheKey, response);
                        deferred.resolve(response);
                    })
                    .error(function (error, status) {
                        //alert("please try again no internet");
                        console.log("Error via making http calls Watchlist ");
                        deferred.reject(error, status);
                    });
            }
            return deferred.promise;
        }

        //get all users data
        function getLoginDetails() {
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