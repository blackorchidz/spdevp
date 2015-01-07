(function () {
    'use strict';
    angular.module('SplitDealApp')
        .controller('BarcodeScannerCtrl',
        ['$scope', '$cordovaBarcodeScanner', '$cordovaOauth', BarcodeScannerCtrl]);

    function BarcodeScannerCtrl($scope, $cordovaBarcodeScanner, $cordovaOauth) {
        var vm = this;

        //barcode scanner
        $scope.scan = function () {
            $cordovaBarcodeScanner.scan()
                .then(function (result) {
                    //alert(result.text);
                    $scope.scanResult = result;
                }, function (err) {
                    var scanResult = 'SCAN ERROR (see console)';
                    console.error(err);
                });
        };


        //oauth
        $scope.googleLogin = function () {
            $cordovaOauth.google("526535717592-1s7la39v2m54p5s5fb4kpq2at9d8fg8o.apps.googleusercontent.com",
                ["https://www.googleapis.com/auth/urlshortener", "https://www.googleapis.com/auth/userinfo.email"])
                .then(function (result) {
                $scope.oauthResult = result;
            }, function (error) {
                $scope.oauthResult = "OAUTH ERROR (see console)";
                console.log(error);
            });
        };

    };
})();
