(function () {
    'use strict';
    angular
        .module('SplitDealApp')
        .controller('MyAlertCtrl', MyAlertCtrl);

    MyAlertCtrl.$inject = ['$scope', '$cordovaGeolocation'];

    function MyAlertCtrl($scope, $cordovaGeolocation) {

        var vm = this;
        vm.getLocation = getLocation;


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
        };
    }

})();