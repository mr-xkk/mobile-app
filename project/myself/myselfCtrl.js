angular.module("myapp")
    .controller("myselfCtrl",function ($scope) {
        $scope.account = null;
        $scope.pass = null;
        $scope.rightAcc = 'xk123456';
        $scope.rightPass = 123456;
        $scope.subMit = function (acc,p) {
            console.log(acc);
            console.log(p);
            if(acc==$scope.rightAcc&&p==$scope.rightPass){
                console.log('right,welcome');
            }else {
                console.log('错误');
            }
        }
    });