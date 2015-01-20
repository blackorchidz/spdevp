(function () {
    'use strict';
    angular
        .module('SplitDealApp')
        .controller('SignUpCtrl', SignUpCtrl);
    SignUpCtrl.$inject = ['signUpApi', 'commonStuff'];

    function SignUpCtrl(signUpApi, commonStuff) {
        var vm = this;
        vm.signUp = signUp;

        function signUp(signUpData) {
            //console.log("sign up is called");
            signUpApi.doSignUp(signUpData).then(function () {
                //commonStuff.bottomToastLong("Thank You, Please verify your email-id !");
                console.log("Sign Up Form Details =", signUpData);
            });

        }
    }
})();