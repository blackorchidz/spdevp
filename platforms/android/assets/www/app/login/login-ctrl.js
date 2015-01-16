(function () {
    'use strict';

    angular
        .module('SplitDealApp')
        .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['$state', 'commonStuff'];

    function LoginCtrl($state, commonStuff) {
        var vm = this;

        vm.userLogin = userLogin;

        function userLogin() {
            console.log("userLogin Called");
            $state.go('tab.watchlist');
            commonStuff.bottomToastLong("Welcome !!");
        };
    }
})();