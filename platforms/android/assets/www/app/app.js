angular
    .module('SplitDealApp',
    ['ionic', 'ngCordova', 'uiGmapgoogle-maps', 'angular-data.DSCacheFactory', 'openfb'])


    .run(function ($ionicPlatform, DSCacheFactory, $rootScope, OpenFB, $state) {

        OpenFB.init('1579426462286870');

        $ionicPlatform.ready(function () {
            $rootScope.sequentialBackButtonPresses = 0;
            $ionicPlatform.onHardwareBackButton(function () {
                event.preventDefault();
                event.stopPropagation();
                if ($rootScope.sequentialBackButtonPresses == 1) {
                    alert('Closing application');
                    $rootScope.sequentialBackButtonPresses = 0;
                } else {
                    alert('Press again to close application');
                    $rootScope.sequentialBackButtonPresses++;
                }
            });

            $rootScope.$on('$stateChangeStart', function (event, toState) {
                if (toState.name !== "tab.watchlist" &&
                    toState.name !== "app" && !$window.sessionStorage['fbtoken']) {
                    $state.go('tab.watchlist');
                    event.preventDefault();
                }
            });

            $rootScope.$on('OAuthException', function () {
                $state.go('tab.watchlist');
            });

            // Hide the accessory bar by default
            // (remove this to show the accessory bar above the keyboard for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }

            DSCacheFactory("myListingCache", {
                storageMode: "localStorage",
                maxAge: 7000,
                deleteOnExpire: "aggressive"
            });

            DSCacheFactory("myWatchlistCache", {
                storageMode: "localStorage",
                maxAge: 7000,
                deleteOnExpire: "aggressive"
            });

            DSCacheFactory("staticCache", {storageMode: "localStorage"});
        });
    })

    .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

        $ionicConfigProvider.views.transition('ios');
        $ionicConfigProvider.views.forwardCache(false);

        $ionicConfigProvider.navBar.positionPrimaryButtons('left');
        $ionicConfigProvider.navBar.positionSecondaryButtons('right');
        $ionicConfigProvider.navBar.alignTitle('center');

        // note that you can also chain configs
        $ionicConfigProvider.backButton.text('back').icon('ion-chevron-left');
        $ionicConfigProvider.tabs.position('bottom').style('standard');

        $stateProvider
            // setup an abstract state for the tabs directive
            .state('app', {
                url: '/app/login',
                templateUrl: 'app/login/login.html'
            })
            .state('signup', {
                url: '/app/signup',
                templateUrl: 'app/signup/signup.html'
            })
            .state('location-map', {
                url: '/app/location-map/:id',
                templateUrl: 'app/nearme/location-map.html'
            })
            .state('refine', {
                url: '/tab/watchlist/refine',
                templateUrl: 'app/refine/refine.html'
            })
            .state('custom-search', {
                url: '/tab/watchlist/custom-search',
                templateUrl: 'app/custom-search/custom-search.html'
            })
            .state('my-alert', {
                url: '/tab/watchlist/my-alert',
                templateUrl: 'app/my-alert/my-alert.html'
            })
            //tabs-routing
            // Each tab has its own nav history stack:
            .state('tab', {
                url: "/tab",
                abstract: true,
                templateUrl: "app/layout/tabs.html"
            })
            .state('tab.watchlist', {
                url: '/watchlist',
                views: {
                    'tab-watchlist': {
                        templateUrl: 'app/watchlist/watchlist.html'
                    }
                }
            })
            .state('tab.watch-list-details', {
                url: "/watchlist/:id",
                views: {
                    'tab-watchlist': {
                        templateUrl: "app/watchlist/watch-list-details.html"
                    }
                }
            })
            .state('tab.location-map', {
                url: "/watchlist/location/:id",
                views: {
                    'tab-watchlist': {
                        templateUrl: "app/nearme/location-map.html"
                    }
                }
            })
            .state('tab.post', {
                url: '/post',
                views: {
                    'tab-post': {
                        templateUrl: 'app/post/post.html'
                    }
                }
            })
            .state('select-store', {
                url: '/tab/post/select-store',
                templateUrl: 'app/post/select-store.html'
            })
            .state('sale-post', {
                url: '/tab/post/sale-post',
                templateUrl: 'app/post/sale-post.html'
            }).state('share-post', {
                url: '/tab/post/share-post',
                templateUrl: 'app/post/share-post.html'
            })


            .state('tab.nearme', {
                url: '/nearme',
                views: {
                    'tab-nearme': {
                        templateUrl: 'app/nearme/nearme.html'
                    }
                }
            })
            .state('tab.favourite', {
                url: '/favourite',
                views: {
                    'tab-favourite': {
                        templateUrl: 'app/favourite/favourite.html'
                    }
                }
            })
            .state('tab.settings', {
                url: '/settings',
                views: {
                    'tab-settings': {
                        templateUrl: 'app/settings/settings.html'
                    }
                }
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/login');
    });