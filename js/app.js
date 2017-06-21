angular.module("myapp",["ionic",'ionic-toast']);
angular.module("myapp")
    .config(function($stateProvider,$urlRouterProvider,$ionicConfigProvider){
        /*隐藏后退按钮文字*/
        $ionicConfigProvider.backButton.text("");
        $ionicConfigProvider.backButton.previousTitleText("");
        /*处理手机兼容性*/
        $ionicConfigProvider.platform.ios.tabs.style('standard');
        $ionicConfigProvider.platform.ios.tabs.position('bottom');
        $ionicConfigProvider.platform.android.tabs.style('standard');
        $ionicConfigProvider.platform.android.tabs.position('bottom');

        $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
        $ionicConfigProvider.platform.android.navBar.alignTitle('center');

        $ionicConfigProvider.platform.ios.views.transition('ios');
        $ionicConfigProvider.platform.android.views.transition('android');
        /*配置路由*/
        $stateProvider
            .state(
                "start",{
                    url:"/start",
                    templateUrl:"project/start/start.html"
                })
            .state("tabs", {
                url: "/tabs",
                abstract:true,
                templateUrl: "project/tabs/tabs.html"
            })
            .state(
                "tabs.home", {
                    url: "/home",
                    cache:false,
                    views: {
                        "tabs-home": {
                            templateUrl: "project/home/home.html"
                        },controller:"homeCtrl"
                    }
                })
            .state(
                "tabs.sale", {
                    url: "/sale?:sales",
                    views: {
                        "tabs-home": {
                            templateUrl: "project/sale/sale.html"
                        },controller:"saleCtrl"
                    }
                })
            .state(
                "tabs.city", {
                    url: "/city?/:priceId",
                    views: {
                        "tabs-home": {
                            templateUrl: "project/city/city.html"
                        }, controller: "cityCtrl"
                    }
                })
            .state(
                "tabs.price", {
                    url: "/price?/:buyId",
                    views: {
                        "tabs-price": {
                            templateUrl: "project/price/price.html"
                        },controller:"priceCtrl"
                    }
                })
            .state(
                "tabs.search", {
                    url: "/search",
                    views: {
                        "tabs-price": {
                            templateUrl: "project/search/search.html"
                        },controller:"searchCtrl"
                    }
                })
            .state(
                "tabs.knockdown", {
                    url: "/knockdown",
                    views: {
                        "tabs-price": {
                            templateUrl: "project/knockdown/knockdown.html"
                        },controller:"knockdownCtrl"
                    }
                })
            .state(
                "tabs.fund", {
                    url: "/fund",
                    views: {
                        "tabs-price": {
                            templateUrl: "project/fund/fund.html"
                        }
                    }
                })
            .state(
                "tabs.container", {
                    url: "/container",
                    views: {
                        "tabs-price": {
                            templateUrl: "project/container/container.html"
                        },controller:'containerCtrl'
                    }
                })
            .state(
                "tabs.entrust", {
                    url: "/entrust",
                    views: {
                        "tabs-price": {
                            templateUrl: "project/entrust/entrust.html"
                        },controller:"entrustCtrl"
                    }
                })
            .state(
                "tabs.myself", {
                    url: "/myself",
                    views: {
                        "tabs-myself": {
                            templateUrl: "project/myself/myself.html"
                        },controller:"myselfCtrl"
                    }
                })
            .state(
                "tabs.collection", {
                    url: "/collection?:province",
                    views: {
                        "tabs-myself": {
                            templateUrl: "project/collection/collection.html"
                        }
                    }
                })
            .state(
                "tabs.find",{
                    url:"/find",
                    views:{
                        "tabs-find":{
                            templateUrl:"project/find/find.html",
                        },controller:"findCtrl"
                    }
                }
            )
        $urlRouterProvider.otherwise("/start");
    });


