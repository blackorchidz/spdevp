(function () {
    'use strict';
    angular
        .module('SplitDealApp')
        .controller('WatchListCtrl', WatchListCtrl);
    WatchListCtrl.$inject = ['$state', 'splitDealApi', '$cordovaBarcodeScanner', '$scope'];

    function WatchListCtrl($state, splitDealApi, $cordovaBarcodeScanner, $scope) {
        var vm = this;
        vm.scanResult;
        vm.myListings;
        vm.watchlist;
        vm.scan = scan;
        vm.setItemId = setItemId;
        vm.loadList = loadList;

        loadList(false);

        //pull to refresh
        function loadList(forceRefresh) {
            splitDealApi.getWatchlist(forceRefresh).then(function (data) {
                vm.watchlist = data.Result;
            }).finally(function () {
                $scope.$broadcast('scroll.refreshComplete');
            });

            splitDealApi.getMyListing(forceRefresh).then(function (data) {
                vm.myListings = data.Result;
            }).finally(function(){
                $scope.$broadcast('scroll.refreshComplete');
            });
        }

        function scan() {
            $cordovaBarcodeScanner.scan()
                .then(function (result) {
                    //alert(result.text);
                    vm.scanResult = result;
                }, function (err) {
                    var scanResult = 'SCAN ERROR (see console)';
                    console.error(err);
                });
        };

        function setItemId(itemId) {
            splitDealApi.setItemId(itemId);
            $state.go('tab.watch-list-details');
            console.log("Item Id", itemId);
        };
    }
})();