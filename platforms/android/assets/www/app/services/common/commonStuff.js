(function () {
    'use strict';
    angular
        .module("SplitDealApp")
        .factory("commonStuff", commonStuff);

    commonStuff.$inject = ['$cordovaToast'];

    function commonStuff($cordovaToast) {

        var commons = {
            topToastLong: topToastLong,
            centerToastLong: centerToastLong,
            bottomToastLong: bottomToastLong
        };
        return commons;
        //////////////

        function topToastLong(message) {
            $cordovaToast.show(message, 'long', 'top')
                .then(function (success) {
                    console.log("center msg displayed");
                }, function (error) {
                    $scope.msg = error.message;
                });
        };

        function centerToastLong(message) {
            $cordovaToast.show(message, 'long', 'center')
                .then(function (success) {
                    console.log("center msg displayed");
                }, function (error) {
                    $scope.msg = error.message;
                });
        };

        function bottomToastLong(message) {
            $cordovaToast.show(message, 'long', 'bottom')
                .then(function (success) {
                    console.log("center msg displayed");
                }, function (error) {
                    $scope.msg = error.message;
                });
        };

    }//end of commonStuff
})();