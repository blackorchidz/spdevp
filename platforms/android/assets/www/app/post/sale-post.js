(function () {
    'use strict';
    angular
        .module("SplitDealApp")
        .controller("SalePostCtrl", SalePostCtrl);

    SalePostCtrl.$inject = ['$state', 'salePostDataApi', 'commonStuff'];

    function SalePostCtrl($state, salePostDataApi, commonStuff) {
        var vm = this;
        vm.saveSalePostData = saveSalePostData;

        function saveSalePostData(SalePost) {
            salePostDataApi.createSalePost(SalePost);
            commonStuff.bottomToastLong("Post saved successfully !");
            $state.go('share-post');
        }
    }
})();