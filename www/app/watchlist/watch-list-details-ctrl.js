(function () {
    'use strict';
    angular
        .module('SplitDealApp')
        .controller('WatchListDetailCtrl', WatchListDetailCtrl);

    WatchListDetailCtrl.$inject = ['$stateParams', '$state', 'splitDealApi', '$cordovaGeolocation', '$scope', '$ionicPopup'];

    function WatchListDetailCtrl($stateParams, $state, splitDealApi, $cordovaGeolocation, $scope, $ionicPopup) {

        var vm = this;
        vm.following = false;
        vm.itemId = $stateParams.id;
        vm.gotoRefine = gotoRefine;
        vm.getLocation = getLocation;
        vm.toggleFollow = toggleFollow;


        splitDealApi.getMyListing().then(function (data) {
            vm.itemDetail = _(data.Result).chain()
                .find({'Id': vm.itemId})
                .pick('Description', 'Title', 'Keyword', 'ModifiedAt')
                .value();
        })

        function toggleFollow() {
            if (vm.following) {
                var confirmPopup = $ionicPopup.confirm({
                    title: 'Unfollow?',
                    template: 'Are you sure you want to unfollow?'
                });
                confirmPopup.then(function (res) {
                    if (res) {
                        vm.following = !vm.following;
                    }
                });
            } else {
                vm.following = !vm.following;
            }

            //vm.following = !vm.following;
        }

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