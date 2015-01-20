(function () {
    'use strict';

    angular
        .module('SplitDealApp')
        .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['$state', 'commonStuff', 'splitDealApi', 'OpenFB', '$location','loginApi'];

    function LoginCtrl($state, commonStuff, splitDealApi, OpenFB, $location, loginApi) {
        var userDetails = "";
        var userName = "";
        var userPassword = "";
        var vm = this;
        vm.oauthResult;
        vm.facebookLogin = facebookLogin;
        vm.checkUserLogin = checkUserLogin;

        splitDealApi.getLoginDetails().then(function (data) {
            userDetails = data.Result;
        });

        function facebookLogin() {

        }

        function checkUserLogin(User) {
            console.log("userLogin Called =", User);

            // userName = User.uname;
            //userPassword = User.upassword;
            $state.go('tab.watchlist');
            //commonStuff.bottomToastLong("Welcome !!");
//            if (userName == userDetails.Username && userPassword == userDetails.Password) {
//                console.log("User Name= ", userName);
//                $state.go('tab.watchlist');
//               commonStuff.bottomToastLong("Welcome !!");
//            } else {
//                alert("Invalid Username or password");
//            }
        };
    }
})();