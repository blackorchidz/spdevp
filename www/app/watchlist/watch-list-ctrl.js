(function () {
    'use strict';
    angular
        .module('SplitDealApp')
        .controller('WatchListCtrl', WatchListCtrl);
    WatchListCtrl.$inject = ['$state', 'splitDealApi', '$cordovaBarcodeScanner'];

    function WatchListCtrl($state, splitDealApi, $cordovaBarcodeScanner) {
        var vm = this;
        vm.scanResult;
        vm.myListings;
        vm.watchlist;
        vm.scan = scan;
        vm.setItemId = setItemId;

        splitDealApi.getWatchlist().then(function (data) {
            vm.watchlist = data.Result;
        });

        splitDealApi.getMyListing().then(function (data) {
            vm.myListings = data.Result;
        });



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