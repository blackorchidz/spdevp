(function () {
    'use strict';
    angular
        .module("SplitDealApp")
        .controller("SalePostCtrl", SalePostCtrl);

    SalePostCtrl.$inject = ['$ionicPopup', 'salePostDataApi'];

    function SalePostCtrl($ionicPopup, salePostDataApi) {
        var vm = this;
        vm.saveSalePostData = saveSalePostData;

        function saveSalePostData(SalePost) {
            salePostDataApi.createSalePost(SalePost);
            //console.log("saveSalePostData=", SalePost);
        }
    }
})();