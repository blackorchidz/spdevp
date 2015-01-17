(function () {
    'use strict';

    angular
        .module('SplitDealApp')
        .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['$state', 'commonStuff', 'splitDealApi'];

    function LoginCtrl($state, commonStuff, splitDealApi) {
        var userDetails = "";
        var userName = "";
        var userPassword = "";
        var vm = this;

        vm.checkUserLogin = checkUserLogin;

        splitDealApi.getLoginDetails().then(function (data) {
            userDetails = data.Result;
        });

        function checkUserLogin(User) {
            console.log("userLogin Called =", User);

           // userName = User.uname;
            //userPassword = User.upassword;
            $state.go('tab.watchlist');
//            if (userName == userDetails.Username && userPassword == userDetails.Password) {
//                console.log("User Name= ", userName);
//                $state.go('tab.watchlist');
//                //commonStuff.bottomToastLong("Welcome !!");
//            } else {
//                alert("Invalid Username or password");
//            }
        };
    }
})();