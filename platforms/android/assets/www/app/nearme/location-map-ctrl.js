(function () {
    'use strict';

    angular.module('SplitDealApp').controller('LocationMapCtrl', ['$stateParams', 'splitDealApi', LocationMapCtrl]);

    function LocationMapCtrl($stateParams, splitDealApi) {

        var vm = this;
        vm.locationId = $stateParams.id;
        //console.log("Location Id= ", vm.locationId);
        vm.map = {
            center: {
                latitude: 38.897677,
                longitude: -77.036530
            },
            zoom: 12
        };

        vm.marker = {};


        splitDealApi.getMyListing().then(function (data) {
            //console.log("Location for watch",data.Result);
            //lodash
            vm.data = _.find(data.Result, {Id: vm.locationId});
            //console.log("Location for watch 2",vm.data);
            vm.marker = {
                latitude: vm.data.Location.latitude,
                longitude: vm.data.Location.longitude,
                options: {
                    title: 'This is marker with specific lat long',
                    animation:google.maps.Animation.BOUNCE
                },
                showWindow: true
            };

            vm.map.center.latitude = vm.data.Location.latitude;
            vm.map.center.longitude = vm.data.Location.longitude;
        });

        vm.locationClicked = function(marker){
          window.location = "geo:" + marker.latitude + "," + marker.longitude +";u=35";
        };

    };

})();