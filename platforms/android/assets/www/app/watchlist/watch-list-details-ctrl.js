(function () {
    'use strict';
    angular
        .module('SplitDealApp')
        .controller('WatchListDetailCtrl',WatchListDetailCtrl);

    WatchListDetailCtrl.$inject = ['$stateParams', '$state', 'splitDealApi','$cordovaGeolocation','$scope'];

    function WatchListDetailCtrl($stateParams, $state, splitDealApi,$cordovaGeolocation,$scope) {

        var vm = this;

        vm.itemId = $stateParams.id;
        vm.gotoRefine = gotoRefine ;
        vm.getLocation = getLocation;

        splitDealApi.getMyWatchList().then(function (data) {

            vm.itemDetail = _(data.Result).chain()
                .find({'Id': vm.itemId})
                .pick('ItemDescription', 'Location', 'ItemName', 'ModifiedAt')
                .value();
        })

        function getLocation() {
            console.log('geolocation is called');
            $cordovaGeolocation
                .getCurrentPosition({timeout: 10000, enableHighAccuracy: false})
                .then(function (position) {
                    console.log("position found");
                    $scope.position = position;
                    // long = position.coords.longitude
                    // lat = position.coords.latitude
                }, function (err) {
                    console.log("unable to find location");
                    $scope.errorMsg = "Error : " + err.message;
                });
        }

        function gotoRefine() {
            $state.go('refine');
        }


    }

})();