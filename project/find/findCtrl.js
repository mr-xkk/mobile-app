angular.module("myapp")
    .controller("findCtrl",function dataController($scope, $ionicSideMenuDelegate) {
            $scope.toggleLeft = function () {
                $ionicSideMenuDelegate.toggleLeft();
            };
        }
    );
